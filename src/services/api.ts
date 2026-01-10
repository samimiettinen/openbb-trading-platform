import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export interface StockInfo {
  symbol: string
  name: string
  price: number
  change: number
  change_percent: number
  volume: number
  market_cap: number
  timestamp: string
}

export interface HistoricalData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface MarketOverview {
  indices: Array<{
    name: string
    symbol: string
    price: number
    change: number
    change_percent: number
  }>
  sectors: Array<{
    name: string
    change_percent: number
  }>
  timestamp: string
}

export interface NewsItem {
  id: number
  title: string
  summary: string
  source: string
  published_at: string
  sentiment: 'positive' | 'negative' | 'neutral'
  url: string
}

// API functions
export const apiService = {
  // Get stock information
  async getStockInfo(symbol: string): Promise<StockInfo> {
    const response = await api.get(`/api/stock/${symbol}`)
    return response.data
  },

  // Get historical stock data
  async getHistoricalData(
    symbol: string, 
    period: string = '1mo',
    interval: string = '1d'
  ): Promise<{ symbol: string; data: HistoricalData[] }> {
    const response = await api.get(`/api/stock/${symbol}/historical`, {
      params: { period, interval }
    })
    return response.data
  },

  // Get market overview
  async getMarketOverview(): Promise<MarketOverview> {
    const response = await api.get('/api/market/overview')
    return response.data
  },

  // Get stock news
  async getStockNews(symbol: string, limit: number = 10): Promise<{ symbol: string; news: NewsItem[] }> {
    const response = await api.get(`/api/news/${symbol}`, {
      params: { limit }
    })
    return response.data
  },

  // Health check
  async healthCheck(): Promise<{ message: string; version: string; openbb_available: boolean }> {
    const response = await api.get('/')
    return response.data
  }
}

export default api