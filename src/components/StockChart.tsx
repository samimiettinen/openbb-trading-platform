import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface StockChartProps {
  symbol: string
}

// Mock chart data - tämä korvataan oikealla API-datalla
const generateMockData = (symbol: string) => {
  const basePrice = symbol === 'AAPL' ? 150 : symbol === 'MSFT' ? 310 : 200
  const data = []
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    const randomChange = (Math.random() - 0.5) * 10
    const price = basePrice + randomChange + (Math.sin(i / 5) * 5)
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.max(price, basePrice * 0.8),
      volume: Math.floor(Math.random() * 50000000) + 10000000
    })
  }
  
  return data
}

const timeframes = [
  { label: '1D', value: '1d' },
  { label: '1V', value: '1w' },
  { label: '1K', value: '1m' },
  { label: '3K', value: '3m' },
  { label: '1V', value: '1y' },
  { label: 'Kaikki', value: 'all' }
]

export function StockChart({ symbol }: StockChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1m')
  const data = generateMockData(symbol)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {symbol} Hintakehitys
        </h3>
        
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.value}
              onClick={() => setSelectedTimeframe(timeframe.value)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                selectedTimeframe === timeframe.value
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('fi-FI', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}