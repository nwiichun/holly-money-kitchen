import React, { useState } from 'react'
import { X, ChevronDown, Send } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { generateWhatsAppMessage } from '../utils/helpers'

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, createOrder } = useCart()
  const [orderType, setOrderType] = useState('pickup')
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('+90')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  const handleSubmitOrder = (e) => {
    e.preventDefault()

    if (!customerName || !phone) {
      alert('Please fill in required fields')
      return
    }

    const orderData = {
      orderType,
      customerName,
      phone,
      address: orderType === 'delivery' ? address : '',
      notes
    }

    createOrder(orderData)
    setOrderSubmitted(true)
    setShowForm(false)

    setTimeout(() => {
      setOrderSubmitted(false)
      onClose()
    }, 2000)
  }

  const handleWhatsAppOrder = () => {
    const orderData = {
      orderType,
      customerName,
      phone,
      address: orderType === 'delivery' ? address : '',
      notes
    }

    const message = generateWhatsAppMessage(orderData)
    window.open(`https://wa.me/905488789193?text=${message}`, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-gray-900 shadow-2xl border-l border-amber-500 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Your Order</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-smooth"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-400 transition-smooth"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center bg-gray-700 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-300 hover:text-amber-400 transition-smooth"
                      >
                        −
                      </button>
                      <span className="px-2 text-white font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-300 hover:text-amber-400 transition-smooth"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form / Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-gray-700">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold transition-smooth flex items-center justify-between"
              >
                <span>Proceed to Checkout</span>
                <ChevronDown size={20} />
              </button>
            ) : (
              <form onSubmit={handleSubmitOrder} className="p-6 space-y-4">
                {/* Order Type */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Order Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="pickup"
                        checked={orderType === 'pickup'}
                        onChange={(e) => setOrderType(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-300">Pickup</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="delivery"
                        checked={orderType === 'delivery'}
                        onChange={(e) => setOrderType(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-300">Delivery</span>
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Address (if delivery) */}
                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Delivery Address
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none h-20 resize-none"
                    />
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none h-16 resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-smooth"
                  >
                    Confirm Order
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-smooth flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Success Message */}
        {orderSubmitted && (
          <div className="p-6 bg-green-900 border-t border-green-700">
            <p className="text-green-200 font-semibold text-center">
              ✓ Order submitted successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
