import React from 'react'
import { Target, Shield, CreditCard, Globe, Layers, ArrowRight, CheckCircle, Zap, Users, Award } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      
      {/* Hero Section - Clean minimal */}
      <section className="pt-24 pb-16 px-4 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-mono text-blue-600 dark:text-blue-400 tracking-wider">
            LEARNIFY
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6 tracking-tight">
            We&apos;re making online learning <br />
            <span className="text-blue-600 dark:text-blue-400">actually work</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            No fluff. No complicated DRM nightmares. Just a platform where creators teach and students learn — securely.
          </p>
        </div>
      </section>

      {/* Mission - Short and punchy */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Why we built this</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Most LMS platforms are either too complex for creators or too weak on security. 
                We wanted something in the middle — simple enough to use, secure enough to trust.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                So we built Learnify. A MERN-based platform where course creators can focus on teaching, 
                not troubleshooting tech issues.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Used by 50+ course creators</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">5,000+ active students</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">99.9% uptime since launch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer - 3 columns */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What makes Learnify different</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Three things we actually care about</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">DRM that works</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Video encryption, access control, watermarking. Your content stays yours.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <CreditCard className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Payments built-in</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Stripe integration. One-click purchases. Automatic enrollment.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Learn anywhere</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Mobile-first design. Offline access. Progress syncs across devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Social proof */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Creators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">5k+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">200+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">4.8</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

  



    </div>
  )
}

export default About