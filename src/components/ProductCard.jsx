import React from 'react'
import { Heart, ShoppingCart, Star, Users, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'

function ProductCard({ product, onViewDetails }) {
  const { state, dispatch, showToast } = useApp()
  
  const isFavorite = state.favorites.some(item => item.id === product.id)
  const isInCart = state.cart.some(item => item.id === product.id)

  const handleFavorite = (e) => {
    e.stopPropagation()
    if (!state.user) {
      showToast('Please login to add favorites', 'error')
      return
    }

    if (isFavorite) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product.id })
      showToast('Removed from favorites', 'info')
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: product })
      showToast('Added to favorites', 'success')
    }
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (!state.user) {
      showToast('Please login to add to cart', 'error')
      return
    }

    dispatch({ type: 'ADD_TO_CART', payload: product })
    showToast('Added to cart', 'success')
  }

  const handleViewDetails = () => {
    if (state.user) {
      dispatch({ type: 'ADD_TO_HISTORY', payload: product })
    }
    onViewDetails(product)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="card p-0 overflow-hidden group cursor-pointer h-full flex flex-col" onClick={handleViewDetails}>
  {/* Image */}
  <div className="relative">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
    />
    {discount > 0 && (
      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
        -{discount}%
      </div>
    )}
    <button
      onClick={handleFavorite}
      className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
        isFavorite 
          ? 'bg-red-500 text-white' 
          : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
      }`}
    >
      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  </div>

  {/* Content */}
  <div className="p-4 flex flex-col flex-grow">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
        {product.category}
      </span>
      <div className="flex items-center space-x-1">
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <span className="text-sm text-gray-600">{product.rating}</span>
      </div>
    </div>

    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
      {product.name}
    </h3>

    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
      {product.shortDescription}
    </p>

    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
      <div className="flex items-center space-x-1">
        <Users className="h-3 w-3" />
        <span>{product.students?.toLocaleString()} học viên</span>
      </div>
      <div className="flex items-center space-x-1">
        <Clock className="h-3 w-3" />
        <span>{product.duration}</span>
      </div>
    </div>

    {/* Giá + nút mua hàng */}
    <div className="flex items-center justify-between mt-auto">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <span className="text-sm text-gray-500 line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isInCart}
        className={`p-2 rounded-lg transition-colors ${
          isInCart
            ? 'bg-green-100 text-green-600 cursor-not-allowed'
            : 'bg-primary-600 text-white hover:bg-primary-700'
        }`}
      >
        <ShoppingCart className="h-4 w-4" />
      </button>
    </div>
  </div>
</div>

  )
}

export default ProductCard
