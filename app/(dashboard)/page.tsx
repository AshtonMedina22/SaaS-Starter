import { Button } from '@/components/ui/button';
import { ArrowRight, QrCode, BarChart3, Rocket } from 'lucide-react';
import { LiveDemo } from './live-demo';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                🚀 Now Live - CloudGather Platform
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight sm:text-6xl md:text-7xl">
              Smart Portals.
              <span className="block text-blue-600">Real Insights.</span>
              <span className="block text-indigo-600">Scalable Growth.</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              CloudGather helps SMBs, event planners, and nonprofits turn every scan, click, and visit into measurable ROI.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/sign-up">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to grow
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed for modern businesses that want to measure, optimize, and scale their digital presence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl mb-6">
                🌐
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Branded Digital Portals
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Create stunning, branded digital experiences with NFC + QR access. Perfect for events, retail, and customer engagement.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white text-2xl mb-6">
                📊
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Real-time Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track user behavior, engagement metrics, and ROI with comprehensive dashboards. Make data-driven decisions instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 text-white text-2xl mb-6">
                🚀
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Simple & Affordable
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get started in minutes with plans starting at just $29/month. No complex setup, no hidden fees, just results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See CloudGather in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is live and ready. Here's a real-time connection to our backend infrastructure.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <LiveDemo />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your digital presence?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of businesses already using CloudGather to measure, optimize, and scale their growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/sign-up">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 rounded-full transition-all duration-200"
              >
                View Pricing
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              This site is coded by{' '}
              <span className="text-blue-400 font-medium">Ashton Medina</span>
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Copyright © 2025 All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
