import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import LoadingSkeleton from '../components/LoadingSkeleton'
import AIChat from '../components/AIChat'
import apiService from '../services/api'
import { Sparkles, Filter, SlidersHorizontal } from 'lucide-react'
import Pagination from '../components/Pagination'

function Home() {
  const { state, dispatch, showToast } = useApp()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [state.products, state.searchQuery, state.priceFilter])

  useEffect(() => {
    setCurrentPage(1) // Reset về trang 1 khi filter thay đổi
  }, [state.searchQuery, state.priceFilter])

  const loadProducts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiService.getProducts()
      dispatch({ type: 'SET_PRODUCTS', payload: response.data })
    } catch (error) {
      showToast('Failed to load products', 'error')
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const filterProducts = () => {
    let filtered = [...state.products]

    // Search filter
    if (state.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    }

    // Price filter
    if (state.priceFilter !== 'all') {
      filtered = filtered.filter(product => {
        switch (state.priceFilter) {
          case 'under-500k':
            return product.price < 500000
          case '500k-1m':
            return product.price >= 500000 && product.price <= 1000000
          case 'over-1m':
            return product.price > 1000000
          default:
            return true
        }
      })
    }

    setFilteredProducts(filtered)
  }

  const handleGetSuggestions = async () => {
    if (!state.user) {
      showToast('Please login to get AI suggestions', 'error')
      return
    }

    try {
      setIsLoadingSuggestions(true)
      const response = await apiService.getSuggestions(state.user.id)
      dispatch({ type: 'SET_SUGGESTIONS', payload: response.data })
      showToast('AI suggestions loaded!', 'success')
    } catch (error) {
      showToast('Unable to get suggestions right now', 'error')
    } finally {
      setIsLoadingSuggestions(false)
    }
  }

  const handleViewDetails = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const categories = ['All', 
  'Lập trình',
  'Thiết kế',
  'Tiếp thị',
  'Kinh doanh',
  'Ngôn ngữ',
  'Khoa học dữ liệu',
  'An ninh mạng'
]

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
  Học tập cùng <span className="text-primary-600">nền tảng AI thông minh</span>
</h1>
<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
  Khám phá các khóa học được cá nhân hóa, nhận đề xuất thông minh và tăng tốc hành trình học tập của bạn với nền tảng được hỗ trợ bởi AI.
</p>
        
        {/* AI Suggestions Button */}
        <button
          onClick={handleGetSuggestions}
          disabled={isLoadingSuggestions}
          className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-3"
        >
          <Sparkles className="h-5 w-5" />
          <span>{isLoadingSuggestions ? 'Getting Suggestions...' : 'AI Suggestions'}</span>
        </button>
      </div>

      {/* AI Suggestions Section */}
      {state.suggestions.length > 0 && (
        <div className="mb-12">
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-6 w-6 text-primary-600 mr-2" />
              AI Recommendations for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {state.suggestions.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                  {product.reason && (
                    <div className="absolute -top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                      {product.reason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">
            All Courses ({filteredProducts.length})
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center space-x-2 sm:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        <div className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto ${showFilters ? 'block' : 'hidden sm:flex'}`}>
          {/* Category Filter */}
          <select
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            className="input-field w-full sm:w-48"
          >
            <option value="">All Categories</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category.toLowerCase()}>{category}</option>
            ))}
          </select>

          {/* Price Filter */}
          <select
            value={state.priceFilter}
            onChange={(e) => dispatch({ type: 'SET_PRICE_FILTER', payload: e.target.value })}
            className="input-field w-full sm:w-48"
          >
            <option value="all">All Prices</option>
            <option value="under-500k">Dưới 500k</option>
            <option value="500k-1m">500K - 1M</option>
            <option value="over-1m">Trên 1M </option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {state.loading ? (
        <LoadingSkeleton />
      ) : filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* AI Chat */}
      <AIChat />
    </div>
  )
}

export default Home
