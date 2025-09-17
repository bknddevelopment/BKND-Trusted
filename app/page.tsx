import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-bg">
          <div className="container section relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-6 animate-fade-in">
                Enterprise Database Infrastructure
                <span className="block text-4xl md:text-5xl lg:text-6xl mt-2">
                  Built for Scale
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-slide-up animation-delay-200">
                Trusted by thousands of businesses nationwide for mission-critical
                database hosting, management, and optimization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in animation-delay-400">
                <button className="btn-primary px-8 py-4 text-lg">
                  Start Free Trial
                </button>
                <button className="btn-outline px-8 py-4 text-lg">
                  View Demo
                </button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 text-center">
                <div className="animate-fade-in animation-delay-600">
                  <div className="text-3xl font-bold text-bknd-600">99.99%</div>
                  <div className="text-sm text-gray-600">Uptime SLA</div>
                </div>
                <div className="animate-fade-in animation-delay-600">
                  <div className="text-3xl font-bold text-bknd-600">50,000+</div>
                  <div className="text-sm text-gray-600">Databases Managed</div>
                </div>
                <div className="animate-fade-in animation-delay-600">
                  <div className="text-3xl font-bold text-bknd-600">24/7</div>
                  <div className="text-sm text-gray-600">Expert Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-bknd-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-bknd-300 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Mission: <span className="gradient-text">Democratizing Database Infrastructure</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="card p-6">
              <div className="w-12 h-12 bg-bknd-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-bknd-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">PostgreSQL Excellence</h3>
              <p className="text-gray-600">
                Industry-leading PostgreSQL hosting with automatic backups, replication,
                and performance optimization built-in.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 bg-bknd-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-bknd-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">MongoDB at Scale</h3>
              <p className="text-gray-600">
                Fully managed MongoDB clusters with automatic sharding, replica sets,
                and seamless scaling for modern applications.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 bg-bknd-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-bknd-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Redis Performance</h3>
              <p className="text-gray-600">
                High-performance Redis instances with sub-millisecond latency,
                persistence options, and cluster support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="gradient-bg">
        <div className="container section">
          <h2 className="text-4xl font-bold text-center mb-12">
            Enterprise Features, Startup Friendly
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Automated Backups', desc: 'Every 6 hours with point-in-time recovery' },
              { title: 'Global CDN', desc: 'Lightning-fast data delivery worldwide' },
              { title: 'SOC 2 Compliant', desc: 'Enterprise-grade security and compliance' },
              { title: 'Auto-Scaling', desc: 'Handle traffic spikes automatically' },
              { title: 'SSL/TLS Encryption', desc: 'End-to-end encryption for all data' },
              { title: 'DDoS Protection', desc: 'Advanced threat mitigation' },
              { title: 'API Access', desc: 'Full REST and GraphQL APIs' },
              { title: 'White-Glove Migration', desc: 'Free migration assistance' },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="container section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Serving Businesses Nationwide
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            With data centers across the United States, we provide low-latency
            database solutions wherever your business operates.
          </p>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {[
              'California', 'Texas', 'Florida', 'New York', 'Illinois',
              'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'
            ].map((state) => (
              <Link
                key={state}
                href={`/${state.toLowerCase().replace(' ', '-')}`}
                className="text-bknd-600 hover:text-bknd-700 hover:underline font-medium"
              >
                {state}
              </Link>
            ))}
          </div>

          <Link href="/locations" className="inline-block mt-8 text-bknd-600 hover:text-bknd-700 hover:underline">
            View all 50,000+ supported locations →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bknd-900 text-white">
        <div className="container section text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Scale Your Database Infrastructure?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of companies that trust BKND for their critical data infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-bknd-900 px-8 py-4 rounded-md font-medium hover:bg-gray-100 transition">
              Start Free 14-Day Trial
            </button>
            <button className="border border-white px-8 py-4 rounded-md font-medium hover:bg-white/10 transition">
              Schedule a Demo
            </button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            No credit card required • Deploy in minutes • Cancel anytime
          </p>
        </div>
      </section>
    </main>
  )
}