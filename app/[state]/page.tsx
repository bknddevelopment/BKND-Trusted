import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface StatePageProps {
  params: {
    state: string
  }
}

// This function will generate static paths for all states
export async function generateStaticParams() {
  // In production, this would come from your database or API
  const states = [
    'california', 'texas', 'florida', 'new-york', 'pennsylvania',
    'illinois', 'ohio', 'georgia', 'north-carolina', 'michigan'
  ]

  return states.map((state) => ({
    state: state,
  }))
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const stateName = params.state
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `Database Solutions in ${stateName}`,
    description: `Enterprise database and backend infrastructure solutions in ${stateName}. PostgreSQL, MongoDB, Redis hosting with local support and 99.99% uptime.`,
    openGraph: {
      title: `BKND Trusted - ${stateName} Database Solutions`,
      description: `Find enterprise-grade database solutions in ${stateName}`,
    },
  }
}

export default function StatePage({ params }: StatePageProps) {
  const stateName = params.state
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <main className="min-h-screen">
      <div className="container section">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Database Solutions in {stateName}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Enterprise-grade database and backend infrastructure solutions
            serving businesses throughout {stateName}.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-2">PostgreSQL Hosting</h3>
              <p className="text-gray-600">
                Managed PostgreSQL databases with automated backups and high availability.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-2">MongoDB Solutions</h3>
              <p className="text-gray-600">
                Scalable NoSQL database solutions for modern applications.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-2">Redis Caching</h3>
              <p className="text-gray-600">
                High-performance in-memory data store for caching and real-time applications.
              </p>
            </div>
          </div>

          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-6">Popular Cities in {stateName}</h2>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {/* These would be dynamically generated based on the state */}
              <a href={`/${params.state}/example-county/example-city`}
                 className="text-bknd-600 hover:text-bknd-700 hover:underline">
                Example City
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}