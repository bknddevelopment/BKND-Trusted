# BKND Trusted - Deployment Configuration

## Overview

This repository is configured with a comprehensive GitHub Actions deployment pipeline that handles:
- CI/CD automation
- Blue-green deployments
- Static page generation (50,000+ pages)
- Database backups and migrations
- Monitoring and alerts
- Security scanning

## Quick Start

### Prerequisites
1. GitHub repository with proper permissions
2. Environment secrets configured (see Environment Setup)
3. Domain setup (bkndtrusted.com)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/[your-username]/BKND-Trusted.git
cd BKND-Trusted

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

## GitHub Actions Workflows

### 1. CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

**Triggers:**
- Push to main, staging, develop branches
- Pull requests to main, staging
- Manual workflow dispatch

**Jobs:**
- **Quality Gate**: Linting, type checking, tests, security audit
- **Build**: Creates production build with caching
- **Database Migrations**: Automatic migration deployment
- **Deploy Staging**: Deploys to staging environment
- **Deploy Production**: Blue-green deployment to production
- **Deploy GitHub Pages**: Static content deployment
- **Rollback**: Emergency rollback capability

### 2. PR Automation (`.github/workflows/pr-automation.yml`)

**Features:**
- Auto-labeling based on files changed
- PR size detection
- Conventional commit validation
- Auto-assign reviewers
- Merge conflict detection
- Welcome messages for new contributors
- Auto-merge Dependabot PRs

### 3. Static Page Generation (`.github/workflows/static-generation.yml`)

**Schedule:** Daily at 2 AM UTC

**Capabilities:**
- Generates 50,000+ static pages
- Batch processing with parallelization
- Incremental regeneration support
- CDN deployment
- Sitemap generation

### 4. Monitoring (`.github/workflows/monitoring.yml`)

**Schedule:** Every 5 minutes

**Monitors:**
- Uptime checks
- Performance metrics
- SSL certificate expiry
- Security headers
- Database health
- Error rates

### 5. Database Backup (`.github/workflows/database-backup.yml`)

**Schedule:**
- Daily backups at 3 AM UTC
- Weekly maintenance on Sundays

**Features:**
- Automated backups to S3
- Backup verification
- Retention management (30 days)
- Restore capability

## Environment Setup

### Required GitHub Secrets

```yaml
# Database
DATABASE_URL: PostgreSQL connection string

# AWS (for backups)
AWS_ACCESS_KEY_ID: AWS access key
AWS_SECRET_ACCESS_KEY: AWS secret key

# Deployment - Staging
STAGING_SERVER_HOST: Staging server IP/domain
STAGING_SERVER_USER: SSH user
STAGING_DEPLOY_KEY: SSH private key

# Deployment - Production
PROD_SERVER_HOST: Production server IP/domain
PROD_SERVER_USER: SSH user
PROD_DEPLOY_KEY: SSH private key

# Monitoring
SLACK_WEBHOOK: Slack webhook URL
SLACK_WEBHOOK_CRITICAL: Critical alerts webhook

# GitHub
GITHUB_TOKEN: GitHub personal access token
CODECOV_TOKEN: Codecov token

# Optional
SENTRY_DSN: Error tracking
NEW_RELIC_LICENSE_KEY: APM monitoring
DATADOG_API_KEY: Infrastructure monitoring
```

## Deployment Commands

### Local Development
```bash
npm run dev           # Start development server
npm run build         # Build production
npm run test          # Run tests
npm run lint          # Run linter
npm run typecheck     # Type checking
```

### Deployment
```bash
npm run deploy:staging      # Deploy to staging
npm run deploy:production   # Deploy to production
npm run deploy:rollback     # Rollback production
```

### Static Generation
```bash
npm run generate:static     # Generate static pages locally

# With environment variables
BATCH_SIZE=2000 TOTAL_PAGES=100000 npm run generate:static
```

### Database
```bash
npm run migrate:dev        # Development migrations
npm run migrate:deploy     # Production migrations
npm run db:seed           # Seed database
npm run db:reset          # Reset database
```

## Blue-Green Deployment Strategy

The production deployment uses blue-green strategy:

1. **Current State**: Traffic serves from GREEN environment
2. **Deploy**: New version deploys to BLUE environment
3. **Health Check**: Verify BLUE environment is healthy
4. **Switch**: Route traffic from GREEN to BLUE
5. **Monitor**: Watch metrics for issues
6. **Rollback**: Quick switch back to GREEN if needed

## Branch Protection Rules

Configure these in GitHub repository settings:

### Main Branch
- Require pull request reviews (2 approvals)
- Dismiss stale reviews
- Require review from CODEOWNERS
- Require status checks:
  - quality-gate
  - build
  - security-scan
- Require branches to be up to date
- Include administrators
- Restrict force pushes

### Staging Branch
- Require pull request reviews (1 approval)
- Require status checks:
  - quality-gate
  - build

## Custom Domain Setup

### GitHub Pages
1. Go to Settings → Pages
2. Add custom domain: bkndtrusted.com
3. Enable HTTPS

### DNS Configuration
```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     [your-username].github.io
```

### CloudFlare (Optional)
For CDN and DDoS protection:
1. Add site to CloudFlare
2. Update nameservers
3. Configure page rules
4. Set up caching

## Monitoring Dashboard

### Uptime Monitoring
- Production: https://bkndtrusted.com/api/health
- Staging: https://staging.bkndtrusted.com/api/health

### Performance Budgets
```json
{
  "LCP": 2.5s,
  "FID": 100ms,
  "CLS": 0.1,
  "Total Bundle": 1.5MB
}
```

### Alerts Configuration
- **Critical**: Production down, SSL expiry < 7 days
- **High**: Response time > 3s, Error rate > 1%
- **Medium**: Bundle size increase > 10%
- **Low**: Staging issues, dependency updates

## Security

### Security Headers
All responses include:
- Strict-Transport-Security
- X-Content-Type-Options
- X-Frame-Options
- Content-Security-Policy
- Referrer-Policy

### Dependency Management
- Dependabot enabled for automatic updates
- Security audits on every PR
- Trivy vulnerability scanning
- SAST with GitHub Super Linter

## Troubleshooting

### Deployment Fails
1. Check GitHub Actions logs
2. Verify secrets are configured
3. Check server connectivity
4. Review health check endpoints

### Static Generation Issues
1. Check available disk space
2. Verify API endpoints
3. Review batch size settings
4. Check memory limits

### Database Issues
1. Verify connection string
2. Check migration status
3. Review backup logs
4. Test restore procedure

## Performance Optimization

### Caching Strategy
- GitHub Actions cache for dependencies
- Build cache for faster deployments
- CDN cache for static assets
- Redis cache for API responses

### Incremental Static Regeneration
- Pages older than 7 days are regenerated
- Changed content triggers regeneration
- Background regeneration for better UX

## Cost Management

### GitHub Actions
- Free tier: 2,000 minutes/month
- Optimize with caching
- Use self-hosted runners for heavy workloads

### Storage
- GitHub Pages: 1GB limit
- Use CDN for large assets
- Compress images and static files

## Support

For issues or questions:
1. Check GitHub Issues
2. Review deployment logs
3. Contact: support@bkndtrusted.com

## License

Copyright © 2024 BKND Trusted. All rights reserved.