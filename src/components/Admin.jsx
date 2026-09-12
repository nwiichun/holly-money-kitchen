import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { menuData } from '../data/menuData'

const Admin = () => {
  const { orders, reservations, availableItems, toggleItemAvailability, updateOrderStatus } = useCart()
  const [activeTab, setActiveTab] = useState('orders')
  const [expandedOrder, setExpandedOrder] = useState(null)

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900 text-yellow-200'
      case 'preparing':
        return 'bg-blue-900 text-blue-200'
      case 'completed':
        return 'bg-green-900 text-green-200'
      default:
        return 'bg-gray-700 text-gray-200'
    }
  }

  const nextStatus = (current) => {
    const statuses = ['pending', 'preparing', 'completed']
    const index = statuses.indexOf(current)
    return statuses[(index + 1) % statuses.length]
  }

  const allItems = menuData.flatMap(cat => cat.items)

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage orders, reservations, and menu items</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-700">
          {[
            { key: 'orders', label: 'Live Orders' },
            { key: 'reservations', label: 'Table Reservations' },
            { key: 'menu', label: 'Menu Toggle' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 font-semibold transition-smooth border-b-2 ${
                activeTab === tab.key
                  ? 'text-amber-400 border-amber-500'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
                No orders yet
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">{order.customerName}</h3>
                      <p className="text-gray-400 text-sm">{order.phone}</p>
                    </div>
                    <button
                      onClick={() => updateOrderStatus(order.id, nextStatus(order.status))}
                      className={`px-4 py-2 rounded-lg font-semibold transition-smooth ${
                        getStatusColor(order.status)
                      } hover:opacity-80`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </button>
                  </div>

                  <div className="bg-gray-700 rounded p-4 mb-4">
                    <p className="text-gray-300 text-sm mb-2">
                      <strong>Order Type:</strong> {order.orderType}
                    </p>
                    {order.address && (
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Address:</strong> {order.address}
                      </p>
                    )}
                    {order.notes && (
                      <p className="text-gray-300 text-sm">
                        <strong>Notes:</strong> {order.notes}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="text-amber-400 hover:text-amber-300 transition-smooth text-sm font-semibold"
                  >
                    {expandedOrder === order.id ? 'Hide' : 'Show'} Items ({order.items.length})
                  </button>

                  {expandedOrder === order.id && (
                    <div className="mt-4 space-y-2">
                      {order.items.map(item => (
                        <div key={item.id} className="text-gray-300 text-sm flex justify-between">
                          <span>{item.name} x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            {reservations.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
                No reservations yet
              </div>
            ) : (
              reservations.map(res => (
                <div key={res.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">{res.name}</h3>
                      <p className="text-gray-400 text-sm">{res.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 font-semibold">
                        {res.date} at {res.time}
                      </p>
                      <p className="text-gray-400 text-sm">{res.guests} guest(s)</p>
                    </div>
                  </div>
                  {res.requests && (
                    <p className="text-gray-300 text-sm mt-4"
                      <strong>Special Requests:</strong> {res.requests}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Menu Toggle Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-3">
            {allItems.map(item => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="text-white font-semibold">{item.name}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                <button
                  onClick={() => toggleItemAvailability(item.id)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${
                    !availableItems[item.id]
                      ? 'bg-red-900 text-red-200 hover:bg-red-800'
                      : 'bg-green-900 text-green-200 hover:bg-green-800'
                  }`}
                >
                  {!availableItems[item.id] ? 'Out of Stock' : 'Available'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
