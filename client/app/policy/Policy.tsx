import React from 'react'
import { Shield, Database, Cookie, Mail, Lock, Eye, FileText, Globe, Clock, Users } from 'lucide-react'

const Policy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      
      {/* Header */}
      <section className="py-16 px-4 text-center border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto">
          <Shield className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Last updated: April 18, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-10">
          
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At Learnify, we take your privacy seriously. This policy describes how we collect, use, 
              and protect your personal information when you use our platform.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Information We Collect
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong className="text-gray-800 dark:text-white">Account Information:</strong> Name, email address, password, profile picture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong className="text-gray-800 dark:text-white">Payment Information:</strong> Billing details, transaction history (we do not store full credit card details)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong className="text-gray-800 dark:text-white">Learning Data:</strong> Courses enrolled, progress tracking, quiz scores, certificates earned</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong className="text-gray-800 dark:text-white">Technical Data:</strong> IP address, browser type, device information, access times</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong className="text-gray-800 dark:text-white">Communication Data:</strong> Support tickets, feedback, course reviews</span>
              </li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              How We Use Your Information
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Provide and maintain your course access and learning progress</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Process your payments and issue certificates upon course completion</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Send important updates about your courses or platform changes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Improve our platform based on usage patterns and feedback</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Protect against fraud and unauthorized access to DRM-protected content</span>
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-600" />
              Data Security
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>All data encrypted using AES-256 encryption standards</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Secure HTTPS connections for all data transmission</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Regular security audits and vulnerability assessments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Two-factor authentication available for all accounts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Automated backups with 30-day retention policy</span>
              </li>
            </ul>
          </div>

          {/* Cookies & Tracking */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-blue-600" />
              Cookies & Tracking
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Essential cookies for platform functionality (login, cart, course access)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Preference cookies to remember your settings and dark mode preference</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Analytics cookies to improve user experience (anonymized data only)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>You can disable non-essential cookies in your browser settings</span>
              </li>
            </ul>
          </div>

          {/* Data Sharing */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Data Sharing
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>We never sell your personal data to third parties</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Payment processed via secure partners (Stripe, PayPal) - subject to their policies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Course progress shared with instructors for support purposes only</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Legal compliance when required by applicable laws</span>
              </li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Your Rights
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Access and download all your personal data anytime</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Request correction of inaccurate information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Request account deletion and data removal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Opt out of marketing communications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Lodge a complaint with data protection authorities</span>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              For privacy-related questions or requests:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>privacy@learnify.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Response within 48 hours</span>
              </li>
            </ul>
          </div>

          {/* Updates to Policy */}
          <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              We may update this Privacy Policy periodically. Continued use of Learnify constitutes acceptance of changes.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Policy