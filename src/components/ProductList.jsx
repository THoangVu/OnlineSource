import React, { useState } from 'react'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
import { mockProducts } from '../data/mockProducts' // Import mock data JS

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const totalPages = Math.ceil(mockProducts.length / itemsPerPage)

  const displayedProducts = mockProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={() => {}}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default ProductList
