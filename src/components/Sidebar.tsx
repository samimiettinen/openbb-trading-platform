import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SidebarProps {
  selectedSymbol: string
  onSymbolSelect: (symbol: string) => void
}

const popularStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.15 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 310.80, change: -1.25 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.45, change: 15.30 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3200.15, change: -8.75 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 850.60, change: 25.40 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 220.35, change: 5.80 },
  { symbol: 'META', name: 'Meta Platforms', price: 325.90, change: -3.45 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 450.75, change: 12.20 }
]

export function Sidebar({ selectedSymbol, onSymbolSelect }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStocks = popularStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-80 sidebar flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Hae osakkeita..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Suositut osakkeet
          </h3>
          <div className="space-y-2">
            {filteredStocks.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => onSymbolSelect(stock.symbol)}
                className={`w-full text-left p-3 rounded-md transition-colors ${
                  selectedSymbol === stock.symbol
                    ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {stock.symbol}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {stock.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-gray-900 dark:text-gray-100">
                      ${stock.price.toFixed(2)}
                    </div>
                    <div className={`text-sm font-medium ${
                      stock.change >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}