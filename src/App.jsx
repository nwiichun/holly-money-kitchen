import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Reservation from './components/Reservation'
import Admin from './components/Admin'
import Cart from './components/Cart'
import { CartProvider } from './context/CartContext'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cartOpen, setCartOpen] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <Menu />
      case 'reserve':
        return <Reservation />
      case 'admin':
        return <Admin />
      case 'home':
      default:
        return (
          <Hero
            onOrderClick={() => {
              setCurrentPage('menu')
              window.scrollTo(0, 0)
            }}
            onReserveClick={() => {
              setCurrentPage('reserve')
              window.scrollTo(0, 0)
            }}
          />
        )
    }
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-900 text-white dark">
        <Navbar
          onCartClick={() => setCartOpen(true)}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
        {renderPage()}
        <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <Footer />
      </div>
    </CartProvider>
  )
}

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HM</span>
              </div>
              <div>
                <h3 className="text-white font-bold">Holly Money</h3>
                <p className="text-amber-400 text-xs">Kitchen & Fries</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Authentic Nigerian Delicacies & Intercontinental Comfort Food</p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-bold mb-4">Hours</h4>
            <p className="text-gray-400 text-sm">Monday - Sunday</p>
            <p className="text-amber-400 font-semibold">9:00 AM - 1:00 AM</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm mb-2">Phone: +90 5488789193</p>
            <p className="text-gray-400 text-sm">City Centre, behind Arkin Colony Hotel</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-center text-sm">
            &copy; 2024 Holly Money Kitchen and Fries. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default App
