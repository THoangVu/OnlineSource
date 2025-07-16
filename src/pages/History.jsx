import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import { History as HistoryIcon, Trash2 } from 'lucide-react'

function History() {
  const { state, dispatch } = useApp()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const clearHistory = () => {
    dispatch({ type: 'SET_HISTORY', payload: [] })
  }

  if (state.history.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <HistoryIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No viewing history</h2>
          <p className="text-gray-600 mb-8">Start exploring courses to see your history here!</p>
          <a href="/" className="btn-primary">
            Browse Courses
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Viewing History</h1>
          <p className="text-gray-600 mt-2">{state.history.length} courses viewed</p>
        </div>
        
        <button
          onClick={clearHistory}
          className="btn-secondary flex items-center space-x-2"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.history.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default History
