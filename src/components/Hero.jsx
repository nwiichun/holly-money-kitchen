import React from 'react'
import { Phone, MapPin } from 'lucide-react'
import { restaurantInfo } from '../data/menuData'

const Hero = ({ onOrderClick, onReserveClick }) => {
  const handleCall = () => {
    window.location.href = `tel:${restaurantInfo.phone}`
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/905488789193`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center py-16 md:py-24">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Authentic Nigerian Dishes &<br className="hidden md:block" />
            <span className="text-amber-400">Intercontinental Favorites</span>
          </h1>

          {/* Tagline */}
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Experience premium fast-casual dining with authentic Nigerian delicacies, burgers, pizzas, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onOrderClick}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-smooth text-lg"
            >
              Order Online
            </button>
            <button
              onClick={onReserveClick}
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-smooth text-lg border border-amber-500"
            >
              Book a Table
            </button>
          </div>

          {/* Address & Contact */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
            <div className="flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-lg">
              <MapPin size={20} className="text-amber-400" />
              <span className="text-gray-200">{restaurantInfo.address}</span>
            </div>
            <button
              onClick={handleCall}
              className="flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-lg hover:bg-gray-700 transition-smooth"
            >
              <Phone size={20} className="text-amber-400" />
              <span className="text-gray-200">{restaurantInfo.phone}</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <a
              href={restaurantInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-amber-400 font-semibold rounded-lg transition-smooth"
            >
              Follow on Instagram
            </a>
            <button
              onClick={handleWhatsApp}
              className="px-6 py-2 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg transition-smooth"
            >
              WhatsApp
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gray-800 border border-amber-500 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🍜</div>
            <h3 className="text-white font-bold text-lg mb-2">Authentic Nigerian</h3>
            <p className="text-gray-300">Traditional recipes perfected with modern touch</p>
          </div>
          <div className="bg-gray-800 border border-amber-500 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🍔</div>
            <h3 className="text-white font-bold text-lg mb-2">Fast Casual</h3>
            <p className="text-gray-300">Quick service without compromising quality</p>
          </div>
          <div className="bg-gray-800 border border-amber-500 rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">⏰</div>
            <h3 className="text-white font-bold text-lg mb-2">Open Late</h3>
            <p className="text-gray-300">9:00 AM - 1:00 AM, 7 days a week</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
