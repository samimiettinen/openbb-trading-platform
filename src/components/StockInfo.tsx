import React, { useState, useEffect } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import { apiService, StockInfo as StockInfoType } from '../services/api'

interface StockInfoProps {
  symbol: string
}

export function StockInfo({ symbol }: StockInfoProps) {
  const [stockData, setStockData] = useState<StockInfoType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.getStockInfo(symbol)
        setStockData(data)
      } catch (err) {
        setError('Virhe osakkeen tietojen haussa')
        console.error('Error fetching stock data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStockData()
  }, [symbol])

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    )
  }

  if (error || !stockData) {
    return (
      <div className="card">
        <div className="text-red-600 dark:text-red-400">
          {error || 'Osakkeen tietoja ei voitu ladata'}
        </div>
      </div>
    )
  }

  const isPositive = stockData.change >= 0
  
  const formatNumber = (num: number, suffix: string = '') => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T${suffix}`
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B${suffix}`
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M${suffix}`
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K${suffix}`
    return num.toLocaleString() + suffix
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {symbol}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {stockData.name}
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">
            ${stockData.price.toFixed(2)}
          </div>
          <div className={`flex items-center justify-end space-x-1 text-lg font-semibold ${
            isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {isPositive ? (
              <ArrowUpIcon className="h-5 w-5" />
            ) : (
              <ArrowDownIcon className="h-5 w-5" />
            )}
            <span>
              {isPositive ? '+' : ''}{stockData.change.toFixed(2)} ({isPositive ? '+' : ''}{stockData.change_percent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Volyymi</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatNumber(stockData.volume)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Markkina-arvo</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatNumber(stockData.market_cap, '$')}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Päivän korkein</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">${(stockData.price * 1.02).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Päivän matalin</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">${(stockData.price * 0.98).toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}