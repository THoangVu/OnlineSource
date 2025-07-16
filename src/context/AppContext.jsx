import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  user: null,
  products: [],
  favorites: [],
  cart: [],
  history: [],
  searchQuery: '',
  priceFilter: 'all',
  loading: false,
  toast: null,
  suggestions: []
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    case 'SET_PRICE_FILTER':
      return { ...state, priceFilter: action.payload }
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.find(item => item.id === action.payload.id)
          ? state.favorites
          : [...state.favorites, action.payload]
      }
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload)
      }
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      }
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    case 'ADD_TO_HISTORY':
      const historyExists = state.history.find(item => item.id === action.payload.id)
      if (!historyExists) {
        return {
          ...state,
          history: [action.payload, ...state.history.slice(0, 19)] // Keep last 20 items
        }
      }
      return state
    case 'SET_HISTORY':
      return { ...state, history: action.payload }
    case 'SHOW_TOAST':
      return { ...state, toast: action.payload }
    case 'HIDE_TOAST':
      return { ...state, toast: null }
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload }
    case 'LOGOUT':
      return {
        ...initialState,
        products: state.products
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedFavorites = localStorage.getItem('favorites')
    const savedCart = localStorage.getItem('cart')
    const savedHistory = localStorage.getItem('history')

    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) })
    }
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites)
      favorites.forEach(fav => dispatch({ type: 'ADD_TO_FAVORITES', payload: fav }))
    }
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      cart.forEach(item => dispatch({ type: 'ADD_TO_CART', payload: item }))
    }
    if (savedHistory) {
      const history = JSON.parse(savedHistory)
      dispatch({ type: 'SET_HISTORY', payload: history })
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user))
    } else {
      localStorage.removeItem('user')
    }
  }, [state.user])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  }, [state.favorites])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(state.history))
  }, [state.history])

  const showToast = (message, type = 'success') => {
    dispatch({ type: 'SHOW_TOAST', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'HIDE_TOAST' })
    }, 3000)
  }

  const value = {
    state,
    dispatch,
    showToast
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
