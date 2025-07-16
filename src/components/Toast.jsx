import React, { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

function Toast() {
  const { state, dispatch } = useApp()

  useEffect(() => {
    if (state.toast) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_TOAST' })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [state.toast, dispatch])

  if (!state.toast) return null

  const { message, type } = state.toast

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-green-50 border-green-200'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`toast flex items-center space-x-3 p-4 rounded-lg border ${getBgColor()} shadow-lg max-w-sm`}>
        {getIcon()}
        <span className="text-sm font-medium text-gray-900 flex-1">{message}</span>
        <button
          onClick={() => dispatch({ type: 'HIDE_TOAST' })}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default Toast
