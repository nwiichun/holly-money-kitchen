import React, { createContext, useContext, useState, useEffect } from 'react'
import { getFromLocalStorage, saveToLocalStorage } from '../utils/helpers'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => getFromLocalStorage('cart', []))
  const [orders, setOrders] = useState(() => getFromLocalStorage('orders', []))
  const [reservations, setReservations] = useState(() => getFromLocalStorage('reservations', []))
  const [availableItems, setAvailableItems] = useState(() => getFromLocalStorage('availableItems', {}))

  // Persist cart to localStorage
  useEffect(() => {
    saveToLocalStorage('cart', cart)
  }, [cart])

  // Persist orders to localStorage
  useEffect(() => {
    saveToLocalStorage('orders', orders)
  }, [orders])

  // Persist reservations to localStorage
  useEffect(() => {
    saveToLocalStorage('reservations', reservations)
  }, [reservations])

  // Persist available items to localStorage
  useEffect(() => {
    saveToLocalStorage('availableItems', availableItems)
  }, [availableItems])

  const addToCart = (item) => {
    setCart(prev => {
      const existingItem = prev.find(i => i.id === item.id)
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      items: cart,
      ...orderData,
      status: 'pending'
    }
    setOrders(prev => [newOrder, ...prev])
    clearCart()
    return newOrder
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    )
  }

  const createReservation = (reservationData) => {
    const newReservation = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...reservationData,
      status: 'confirmed'
    }
    setReservations(prev => [newReservation, ...prev])
    return newReservation
  }

  const toggleItemAvailability = (itemId) => {
    setAvailableItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const isItemAvailable = (itemId) => {
    return availableItems[itemId] !== false
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        reservations,
        availableItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        createOrder,
        updateOrderStatus,
        createReservation,
        toggleItemAvailability,
        isItemAvailable
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
