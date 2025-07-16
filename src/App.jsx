import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Cart from './pages/Cart'
import History from './pages/History'
import Login from './pages/Login'
import Register from './pages/Register'
import Toast from './components/Toast'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="cart" element={<Cart />} />
            <Route path="history" element={<History />} />
          </Route>
        </Routes>
        <Toast />
      </div>
    </AppProvider>
  )
}

export default App
