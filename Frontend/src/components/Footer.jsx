import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-xl font-bold">MediCare</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                MediCare is a comprehensive healthcare management platform 
                providing quality medical services and easy appointment booking.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-xs">in</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-xs">yt</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Services</a></li>
                <li><a href="#" className="hover:text-white">Book Appointment</a></li>
                <li><a href="#" className="hover:text-white">Find Doctors</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Online Consultations</a></li>
                <li><a href="#" className="hover:text-white">Appointment Booking</a></li>
                <li><a href="#" className="hover:text-white">Medicine Search</a></li>
                <li><a href="#" className="hover:text-white">Health Records</a></li>
                <li><a href="#" className="hover:text-white">Emergency Services</a></li>
                <li><a href="#" className="hover:text-white">Lab Tests</a></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span>123 Healthcare Avenue, Mumbai, Maharashtra 400708</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📞</span>
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✉️</span>
                  <span>support@medicare.com</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🕐</span>
                  <span>24/7 Emergency Support</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025 MediCare. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
              <a href="#" className="hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
