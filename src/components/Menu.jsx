import React, { useState, useMemo } from 'react'
import { Search, Plus, Minus } from 'lucide-react'
import { menuData } from '../data/menuData'
import { useCart } from '../context/CartContext'

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(menuData[0].category)
  const [searchQuery, setSearchQuery] = useState('')
  const [quantities, setQuantities] = useState({})
  const { addToCart } = useCart()

  // Filter items based on search
  const filteredMenu = useMemo(() => {
    if (!searchQuery.trim()) {
      return menuData
    }

    const query = searchQuery.toLowerCase()
    return menuData
      .map(category => ({
        ...category,
        items: category.items.filter(
          item =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        )
      }))
      .filter(category => category.items.length > 0)
  }, [searchQuery])

  // Get current category items
  const currentCategoryItems = menuData.find(
    cat => cat.category === selectedCategory
  )?.items || []

  const handleAddToCart = (item) => {
    addToCart(item)
    setQuantities(prev => ({
      ...prev,
      [item.id]: 0
    }))
  }

  const handleQuantityChange = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }))
  }

  const getQuantity = (itemId) => quantities[itemId] || 0

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Our Menu</h1>
          <p className="text-gray-400">Explore our delicious offerings</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none transition-smooth"
          />
        </div>

        {/* Category Tabs */}
        {!searchQuery && (
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2">
              {menuData.map(cat => (
                <button
                  key={cat.category}
                  onClick={() => setSelectedCategory(cat.category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-smooth font-medium ${
                    selectedCategory === cat.category
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(searchQuery ? filteredMenu.flatMap(c => c.items) : currentCategoryItems).map(item => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-amber-500 transition-smooth"
            >
              {/* Item Header */}
              <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{item.description}</p>

              {/* Badge */}
              <div className="mb-4">
                <span className="inline-block bg-amber-900 text-amber-200 text-xs px-2 py-1 rounded">
                  Market Fresh
                </span>
              </div>

              {/* Quantity Selector & Add Button */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-700 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={getQuantity(item.id) === 0}
                    className="p-2 text-gray-300 hover:text-amber-400 disabled:opacity-50 transition-smooth"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center text-white font-semibold">
                    {getQuantity(item.id)}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="p-2 text-gray-300 hover:text-amber-400 transition-smooth"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-smooth"
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(searchQuery ? filteredMenu.flatMap(c => c.items) : currentCategoryItems).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No dishes found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu
