import React from 'react'

function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card p-0 overflow-hidden">
          <div className="skeleton h-48 w-full"></div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="skeleton h-4 w-16 rounded"></div>
              <div className="skeleton h-4 w-12 rounded"></div>
            </div>
            <div className="skeleton h-5 w-full rounded"></div>
            <div className="skeleton h-4 w-3/4 rounded"></div>
            <div className="skeleton h-4 w-1/2 rounded"></div>
            <div className="flex justify-between items-center">
              <div className="skeleton h-6 w-20 rounded"></div>
              <div className="skeleton h-8 w-8 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
