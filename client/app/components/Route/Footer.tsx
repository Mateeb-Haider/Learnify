import React from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  BookOpen,
  Users,
  Award,
  GraduationCap
} from 'lucide-react'
import Link from 'next/link'

type Props = {}

const Footer = (props: Props) => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/courses', text: 'Browse Courses', icon: <BookOpen className="w-4 h-4" /> },
    { href: '/instructors', text: 'Our Instructors', icon: <Users className="w-4 h-4" /> },
    { href: '/certificates', text: 'Certifications', icon: <Award className="w-4 h-4" /> },
    { href: '/about', text: 'About Us', icon: <GraduationCap className="w-4 h-4" /> },
  ]

  const supportLinks = [
    { href: '/help', text: 'Help Center' },
    { href: '/faq', text: 'FAQ' },
    { href: '/contact', text: 'Contact Us' },
    { href: '/privacy', text: 'Privacy Policy' },
    { href: '/terms', text: 'Terms of Service' },
  ]

  const socialLinks = [
    { href: '#', icon: <Facebook className="w-5 h-5" />, label: 'Facebook' },
    { href: '#', icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
    { href: '#', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
    { href: '#', icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
    { href: '#', icon: <Youtube className="w-5 h-5" />, label: 'YouTube' },
  ]

  return (
    <footer className="bg-white dark:bg-gray-900 pt-12 pb-8 border-t border-gray-200 dark:border-gray-800 font-Poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#37a39a] to-[#2d8b7f] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black dark:text-white">Learnify</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">LMS Platform</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Transform your career with our cutting-edge learning platform.
            </p>
            <div className="flex gap-3 text-black dark:text-white">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 hover:bg-[#37a39a] rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-black dark:text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-black dark:text-white text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-black dark:text-white text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#37a39a]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <a 
                    href="mailto:support@learnify.com" 
                    className="text-black dark:text-white hover:text-[#37a39a] transition-colors duration-300"
                  >
                    support@learnify.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#37a39a]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <a 
                    href="tel:+11234567890" 
                    className="text-black dark:text-white hover:text-[#37a39a] transition-colors duration-300"
                  >
                    + (923) 2358 49545
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#37a39a]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                  <p className="text-black dark:text-white">Lahore Cantt St, Tufail Road</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Learnify. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <Link
                href="/terms"
                className="hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <Link
                href="/cookies"
                className="hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer