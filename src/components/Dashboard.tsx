import React from 'react'
import { StockChart } from './StockChart'
import { StockInfo } from './StockInfo'
import { MarketOverview } from './MarketOverview'
import { NewsPanel } from './NewsPanel'

interface DashboardProps {
  symbol: string
}

export function Dashboard({ symbol }: DashboardProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Stock Info Header */}
      <StockInfo symbol={symbol} />
      
      {/* Main Chart */}
      <div className="chart-container p-6">
        <StockChart symbol={symbol} />
      </div>
      
      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketOverview />
        <NewsPanel symbol={symbol} />
      </div>
    </div>
  )
}