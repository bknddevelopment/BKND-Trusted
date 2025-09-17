#!/bin/bash

# BKND Trusted Deployment Script
# This script handles blue-green deployments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-staging}
DEPLOY_TARGET=${2:-blue}
ROLLBACK=${3:-false}

# Function to print colored output
print_status() {
    echo -e "${BLUE}[DEPLOY]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check environment
if [[ "$ENVIRONMENT" != "production" && "$ENVIRONMENT" != "staging" ]]; then
    print_error "Invalid environment: $ENVIRONMENT"
    echo "Usage: ./deploy.sh [production|staging] [blue|green] [rollback]"
    exit 1
fi

print_status "Starting deployment to $ENVIRONMENT ($DEPLOY_TARGET environment)"

# Pre-deployment checks
pre_deployment_checks() {
    print_status "Running pre-deployment checks..."

    # Check Node.js version
    NODE_VERSION=$(node -v)
    print_status "Node.js version: $NODE_VERSION"

    # Check npm version
    NPM_VERSION=$(npm -v)
    print_status "npm version: $NPM_VERSION"

    # Run tests
    print_status "Running tests..."
    npm test -- --watchAll=false || {
        print_error "Tests failed! Aborting deployment."
        exit 1
    }

    # Check lint
    print_status "Running linter..."
    npm run lint || {
        print_error "Linting failed! Aborting deployment."
        exit 1
    }

    # Type check
    print_status "Running type check..."
    npm run typecheck || npx tsc --noEmit || {
        print_error "Type check failed! Aborting deployment."
        exit 1
    }

    print_success "Pre-deployment checks passed!"
}

# Build application
build_application() {
    print_status "Building application..."

    # Clean previous build
    rm -rf .next out

    # Install dependencies
    npm ci --production=false

    # Build
    NODE_ENV=production npm run build || {
        print_error "Build failed! Aborting deployment."
        exit 1
    }

    # Generate static pages if needed
    if [[ -f "scripts/generate-static.js" ]]; then
        print_status "Generating static pages..."
        node scripts/generate-static.js
    fi

    print_success "Build completed successfully!"
}

# Deploy to target environment
deploy_to_environment() {
    local target=$1
    print_status "Deploying to $target environment..."

    if [[ "$ENVIRONMENT" == "production" ]]; then
        DEPLOY_URL="https://${target}.bkndtrusted.com"
        SERVER_HOST=${PROD_SERVER_HOST}
        SERVER_USER=${PROD_SERVER_USER}
        SERVER_PATH="/var/www/${target}.bkndtrusted.com"
    else
        DEPLOY_URL="https://${target}.staging.bkndtrusted.com"
        SERVER_HOST=${STAGING_SERVER_HOST}
        SERVER_USER=${STAGING_SERVER_USER}
        SERVER_PATH="/var/www/${target}.staging.bkndtrusted.com"
    fi

    # Create deployment package
    print_status "Creating deployment package..."
    tar -czf deploy.tar.gz \
        .next \
        public \
        package.json \
        package-lock.json \
        next.config.js \
        $([ -d "out" ] && echo "out" || echo "")

    # Upload to server
    print_status "Uploading to server..."
    scp -o StrictHostKeyChecking=no deploy.tar.gz ${SERVER_USER}@${SERVER_HOST}:~/

    # Deploy on server
    print_status "Deploying on server..."
    ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} << EOF
        set -e

        # Create backup
        if [ -d "${SERVER_PATH}" ]; then
            cp -r ${SERVER_PATH} ${SERVER_PATH}.backup.\$(date +%Y%m%d_%H%M%S)
        fi

        # Create directory if not exists
        mkdir -p ${SERVER_PATH}

        # Extract deployment package
        tar -xzf ~/deploy.tar.gz -C ${SERVER_PATH}

        # Install production dependencies
        cd ${SERVER_PATH}
        npm ci --production

        # Run database migrations
        if [ -f "prisma/schema.prisma" ]; then
            npx prisma migrate deploy
        fi

        # Restart application
        pm2 reload bknd-trusted-${target} || pm2 start npm --name "bknd-trusted-${target}" -- start

        # Clean up
        rm ~/deploy.tar.gz
EOF

    print_success "Deployed to $target environment!"
}

# Health check
health_check() {
    local url=$1
    local max_attempts=30
    local attempt=0

    print_status "Running health check on $url..."

    while [ $attempt -lt $max_attempts ]; do
        if curl -f -s "$url/api/health" > /dev/null; then
            print_success "Health check passed!"
            return 0
        fi

        attempt=$((attempt + 1))
        echo -n "."
        sleep 2
    done

    print_error "Health check failed after $max_attempts attempts!"
    return 1
}

# Switch traffic
switch_traffic() {
    local from=$1
    local to=$2

    print_status "Switching traffic from $from to $to..."

    if [[ "$ENVIRONMENT" == "production" ]]; then
        # Update load balancer or DNS
        # This is environment-specific
        # Example for nginx:
        ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} << EOF
            sed -i "s/proxy_pass.*${from}/proxy_pass http:\/\/${to}/" /etc/nginx/sites-available/bkndtrusted
            nginx -t && nginx -s reload
EOF
    fi

    print_success "Traffic switched to $to environment!"
}

# Rollback
rollback() {
    print_warning "Starting rollback procedure..."

    local current=$1
    local previous=$2

    # Switch traffic back
    switch_traffic $current $previous

    # Verify rollback
    if health_check "https://${previous}.${ENVIRONMENT}.bkndtrusted.com"; then
        print_success "Rollback completed successfully!"
    else
        print_error "Rollback failed! Manual intervention required!"
        exit 1
    fi
}

# Performance test
performance_test() {
    local url=$1

    print_status "Running performance tests..."

    # Run Lighthouse
    if command -v lighthouse &> /dev/null; then
        lighthouse "$url" \
            --chrome-flags="--headless" \
            --output=json \
            --output-path=lighthouse-report.json \
            --budget-path=lighthouse-budget.json

        # Check if budget passed
        if [ $? -eq 0 ]; then
            print_success "Performance budget passed!"
        else
            print_warning "Performance budget exceeded!"
        fi
    fi
}

# Main deployment flow
main() {
    print_status "Deployment started at $(date)"

    # Handle rollback
    if [[ "$ROLLBACK" == "true" ]]; then
        rollback "blue" "green"
        exit 0
    fi

    # Pre-deployment checks
    pre_deployment_checks

    # Build application
    build_application

    # Determine target environment
    if [[ "$DEPLOY_TARGET" == "blue" ]]; then
        OLD_TARGET="green"
    else
        OLD_TARGET="blue"
    fi

    # Deploy to target
    deploy_to_environment $DEPLOY_TARGET

    # Health check new deployment
    DEPLOY_URL="https://${DEPLOY_TARGET}.${ENVIRONMENT}.bkndtrusted.com"
    if ! health_check $DEPLOY_URL; then
        print_error "New deployment failed health check!"
        exit 1
    fi

    # Performance test
    performance_test $DEPLOY_URL

    # Switch traffic (production only)
    if [[ "$ENVIRONMENT" == "production" ]]; then
        print_warning "Ready to switch traffic. Press Enter to continue or Ctrl+C to abort..."
        read

        switch_traffic $OLD_TARGET $DEPLOY_TARGET

        # Verify production
        if health_check "https://bkndtrusted.com"; then
            print_success "Production deployment successful!"
        else
            print_error "Production verification failed! Rolling back..."
            rollback $DEPLOY_TARGET $OLD_TARGET
            exit 1
        fi
    fi

    print_success "Deployment completed at $(date)"
}

# Run main function
main