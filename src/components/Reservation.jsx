import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { generateTimeSlots } from '../utils/helpers'

const Reservation = () => {
  const { createReservation } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    phone: '+90',
    date: '',
    time: '',
    guests: '1',
    requests: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [successData, setSuccessData] = useState(null)

  const timeSlots = generateTimeSlots()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      alert('Please fill in all required fields')
      return
    }

    const reservation = createReservation(formData)
    setSuccessData(reservation)
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        phone: '+90',
        date: '',
        time: '',
        guests: '1',
        requests: ''
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Reserve a Table</h1>
          <p className="text-gray-400">Book your table at Holly Money Kitchen</p>
        </div>

        {submitted ? (
          <div className="bg-green-900 border border-green-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-green-200 mb-4">✓ Reservation Confirmed!</h2>
            <p className="text-green-200 mb-4">
              Thank you, <strong>{successData.name}</strong>!
            </p>
            <p className="text-green-200 mb-2">
              Your reservation is confirmed for {successData.guests} guest(s) on {successData.date} at {successData.time}
            </p>
            <p className="text-green-300 text-sm mt-4">
              A confirmation will be sent to {successData.phone}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-white font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white font-semibold mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-white font-semibold mb-2">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-white font-semibold mb-2">Time *</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              >
                <option value="">Select a time</option>
                {timeSlots.map(slot => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-white font-semibold mb-2">Number of Guests *</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-white font-semibold mb-2">Special Requests</label>
              <textarea
                name="requests"
                value={formData.requests}
                onChange={handleChange}
                placeholder="Any special occasions, dietary requirements, etc."
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none h-20 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg rounded-lg transition-smooth"
            >
              Reserve Table
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Reservation
