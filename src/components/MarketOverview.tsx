import React from 'react'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

const marketIndices = [
  { name: 'S&P 500', symbol: 'SPX', price: 4150.25, change: 15.30, changePercent: 0.37 },
  { name: 'Dow Jones', symbol: 'DJI', price: 33850.45, change: -125.80, changePercent: -0.37 },
  { name: 'NASDAQ', symbol: 'IXIC', price: 12750.90, change: 45.60, changePercent: 0.36 },
  { name: 'Russell 2000', symbol: 'RUT', price: 1850.75, change: 8.25, changePercent: 0.45 }
]

const sectors = [
  { name: 'Teknologia', change: 1.25, color: 'text-green-600 dark:text-green-400' },
  { name: 'Terveydenhuolto', change: 0.85, color: 'text-green-600 dark:text-green-400' },
  { name: 'Rahoitus', change: -0.45, color: 'text-red-600 dark:text-red-400' },
  { name: 'Energia', change: 2.15, color: 'text-green-600 dark:text-green-400' },
  { name: 'Kulutustuotteet', change: -0.25, color: 'text-red-600 dark:text-red-400' },
  { name: 'Teollisuus', change: 0.65, color: 'text-green-600 dark:text-green-400' }
]

export function MarketOverview() {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Markkinakatsaus
      </h3>
      
      <div className="space-y-6">
        {/* Market Indices */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Pääindeksit
          </h4>
          <div className="space-y-3">
            {marketIndices.map((index) => (
              <div key={index.symbol} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {index.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {index.symbol}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm text-gray-900 dark:text-white">
                    {index.price.toLocaleString('fi-FI', { minimumFractionDigits: 2 })}
                  </div>
                  <div className={`flex items-center justify-end space-x-1 text-sm ${
                    index.change >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {index.change >= 0 ? (
                      <ArrowUpIcon className="h-3 w-3" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3" />
                    )}
                    <span>
                      {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.change >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sectors */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Sektorit
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {sectors.map((sector) => (
              <div key={sector.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-900 dark:text-white">
                  {sector.name}
                </span>
                <span className={`text-sm font-medium ${sector.color}`}>
                  {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}