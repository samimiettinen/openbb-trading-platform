import React, { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL')

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            selectedSymbol={selectedSymbol}
            onSymbolSelect={setSelectedSymbol}
          />
          <main className="flex-1 overflow-auto">
            <Dashboard symbol={selectedSymbol} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App