import React from 'react'
import { X, Star, Users, Clock, Award, Smartphone, Play, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

function ProductModal({ product, isOpen, onClose }) {
  const { state, dispatch, showToast } = useApp()

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    if (!state.user) {
      showToast('Please login to add to cart', 'error')
      return
    }

    dispatch({ type: 'ADD_TO_CART', payload: product })
    showToast('Added to cart', 'success')
    onClose()
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

  const isInCart = state.cart.some(item => item.id === product.id)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Left Column - Image and Details */}
          <div>
            <div className="relative mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-medium">
                  -{discount}% OFF
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500">rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span>{product.students?.toLocaleString()} students</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>{product.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-gray-400" />
                  <span>{product.level}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Instructor</h3>
                <p className="text-gray-600">{product.instructor}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
              </div>

              {product.features && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">What you'll get</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Purchase Card */}
          <div>
            <div className="card p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <p className="text-green-600 font-medium">Save {discount}%</p>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    isInCart
                      ? 'bg-green-100 text-green-600 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isInCart ? 'Already in Cart' : 'Add to Cart'}
                </button>
                
                <button className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Buy Now
                </button>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">This course includes:</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Play className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.duration} on-demand video</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Access on mobile and TV</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
