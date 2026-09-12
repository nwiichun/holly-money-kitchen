import React, { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getRestaurantStatus } from '../utils/helpers'

const Navbar = ({ onCartClick, currentPage, onNavigate }) => {
  const { getCartCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = getCartCount()
  const status = getRestaurantStatus()
  const isOpen = status === 'Open Now'

  const navItems = [
    { label: 'Home', key: 'home' },
    { label: 'Menu', key: 'menu' },
    { label: 'Reserve Table', key: 'reserve' },
    { label: 'Admin', key: 'admin' }
  ]

  const handleNavClick = (key) => {
    onNavigate(key)
    setMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-amber-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">HM</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg">Holly Money</h1>
              <p className="text-amber-400 text-xs">Kitchen & Fries</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`px-4 py-2 rounded-lg transition-smooth ${
                  currentPage === item.key
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Status Badge */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              isOpen
                ? 'bg-green-900 text-green-200'
                : 'bg-red-900 text-red-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'}`}></span>
              {status}
            </div>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-300 hover:text-amber-400 transition-smooth"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-amber-400 transition-smooth"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-700">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-smooth ${
                  currentPage === item.key
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className={`mx-4 mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
              isOpen ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'}`}></span>
              {status}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
