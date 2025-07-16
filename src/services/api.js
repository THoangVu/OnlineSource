import axios from 'axios'
import { mockProducts } from '../data/mockData'

// Mock API service
class ApiService {
  constructor() {
    this.baseURL = '/api'
    this.delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  }

  async getProducts() {
    await this.delay(800)
    return { data: mockProducts }
  }

  async getSuggestions(userId) {
    await this.delay(1200)
    
    // Mock AI suggestions based on user behavior
    const suggestions = mockProducts
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map(product => ({
        ...product,
        reason: this.getRandomReason()
      }))
    
    return { data: suggestions }
  }

  async searchProducts(query) {
    await this.delay(500)
    
    const filtered = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(query.toLowerCase())
    )
    
    return { data: filtered }
  }

  async login(credentials) {
  await this.delay(1000)

  const existingUsers = JSON.parse(localStorage.getItem('users')) || []
  const foundUser = existingUsers.find(
    u => u.email === credentials.email && u.password === credentials.password
  )

  if (foundUser) {
    return {
      data: {
        user: foundUser,
        token: "mock-jwt-token"
      }
    }
  }

  throw new Error('Invalid credentials')
}
  async register(userData) {
  await this.delay(1000)

  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    avatar: "https://cdn-icons-png.flaticon.com/512/7547/7547919.png"
  }

  // Lưu user vào localStorage (mô phỏng backend)
  const existingUsers = JSON.parse(localStorage.getItem('users')) || []
  localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]))

  return {
    data: {
      user: newUser,
      token: "mock-jwt-token"
    }
  }
}

  async getChatResponse(message) {
    await this.delay(1500)
    
    const responses = [
      "Based on your interests, I recommend checking out our English and React courses!",
      "For career advancement, consider our Data Science and Digital Marketing courses.",
      "If you're looking for creative skills, our UI/UX Design course is perfect for you.",
      "For business professionals, I suggest the Business Analytics course with Excel and Power BI.",
      "Looking to expand globally? Our Japanese language course is highly rated!"
    ]
    
    return {
      data: {
        message: responses[Math.floor(Math.random() * responses.length)],
        suggestions: mockProducts.slice(0, 3)
      }
    }
  }

  getRandomReason() {
    const reasons = [
      "Based on your recent views",
      "Popular in your area",
      "Matches your learning goals",
      "Highly rated by similar users",
      "Trending this week"
    ]
    return reasons[Math.floor(Math.random() * reasons.length)]
  }
}

export default new ApiService()
