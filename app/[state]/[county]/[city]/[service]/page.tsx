import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface ServicePageProps {
  params: {
    state: string
    county: string
    city: string
    service: string
  }
}

const services = {
  'postgresql-hosting': {
    name: 'PostgreSQL Hosting',
    description: 'Enterprise-grade managed PostgreSQL databases',
    features: [
      'Automated backups every 6 hours',
      '99.99% uptime SLA',
      'Point-in-time recovery',
      'Read replicas for scaling',
      'SSL/TLS encryption',
      '24/7 monitoring and support'
    ]
  },
  'mongodb-hosting': {
    name: 'MongoDB Hosting',
    description: 'Scalable NoSQL database solutions',
    features: [
      'Automatic sharding',
      'Replica sets for high availability',
      'Real-time performance monitoring',
      'Flexible schema design',
      'Full-text search capabilities',
      'GridFS for large file storage'
    ]
  },
  'redis-hosting': {
    name: 'Redis Hosting',
    description: 'High-performance in-memory data store',
    features: [
      'Sub-millisecond latency',
      'Persistence options',
      'Pub/Sub messaging',
      'Lua scripting support',
      'Cluster mode for scaling',
      'Automatic failover'
    ]
  },
  'database-consulting': {
    name: 'Database Consulting',
    description: 'Expert database architecture and optimization',
    features: [
      'Performance audits',
      'Query optimization',
      'Schema design review',
      'Migration planning',
      'Disaster recovery planning',
      'Capacity planning'
    ]
  }
}

export async function generateStaticParams() {
  // In production, this would generate all possible combinations
  // For now, returning empty to allow dynamic generation
  return []
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = services[params.service as keyof typeof services]
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  const cityName = params.city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const stateName = params.state
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${service.name} in ${cityName}, ${stateName}`,
    description: `${service.description} for businesses in ${cityName}, ${stateName}. Local support with enterprise-grade reliability.`,
    openGraph: {
      title: `${service.name} - ${cityName}, ${stateName} | BKND Trusted`,
      description: `Get ${service.name.toLowerCase()} services in ${cityName}, ${stateName}`,
    },
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services[params.service as keyof typeof services]

  if (!service) {
    notFound()
  }

  const cityName = params.city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const countyName = params.county
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const stateName = params.state
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <main className="min-h-screen">
      <div className="gradient-bg py-20">
        <div className="container">
          <nav className="text-sm mb-4">
            <ol className="flex items-center space-x-2 text-gray-600">
              <li><a href="/" className="hover:text-bknd-600">Home</a></li>
              <li>/</li>
              <li><a href={`/${params.state}`} className="hover:text-bknd-600">{stateName}</a></li>
              <li>/</li>
              <li><a href={`/${params.state}/${params.county}`} className="hover:text-bknd-600">{countyName}</a></li>
              <li>/</li>
              <li><a href={`/${params.state}/${params.county}/${params.city}`} className="hover:text-bknd-600">{cityName}</a></li>
              <li>/</li>
              <li className="text-gray-900">{service.name}</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            {service.name} in {cityName}, {stateName}
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl">
            {service.description} tailored for businesses in {cityName}, {countyName} County, {stateName}.
            Get enterprise-grade database solutions with local support.
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold mb-6">Features & Benefits</h2>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 text-bknd-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-4">Get Started Today</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of businesses in {cityName} that trust BKND for their database infrastructure.
              </p>
              <button className="btn-primary px-8 py-3 text-lg w-full">
                Request a Demo
              </button>
              <p className="text-sm text-gray-500 mt-4 text-center">
                No credit card required • 14-day free trial
              </p>
            </div>

            <div className="mt-6 p-6 bg-bknd-50 rounded-lg">
              <h4 className="font-semibold mb-2">Local Presence</h4>
              <p className="text-sm text-gray-600">
                Our team provides dedicated support for businesses in {cityName} and
                surrounding areas in {countyName} County.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-16 pt-16 border-t">
          <h2 className="text-3xl font-bold mb-6">
            Why Choose BKND Trusted in {cityName}?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-semibold mb-2">Local Support</h3>
              <p className="text-gray-600">
                Dedicated support team familiar with {cityName} business needs and requirements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Compliance Ready</h3>
              <p className="text-gray-600">
                Meet {stateName} data residency and compliance requirements with ease.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
              <p className="text-gray-600">
                Average response time under 5 minutes for businesses in {countyName} County.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}