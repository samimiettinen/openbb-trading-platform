import React from 'react'
import { ClockIcon } from '@heroicons/react/24/outline'

interface NewsPanelProps {
  symbol: string
}

// Mock news data - tämä korvataan oikealla API-datalla
const mockNews = [
  {
    id: 1,
    title: 'Apple julkistaa uuden iPhone-mallin ensi kuussa',
    summary: 'Yhtiö odottaa vahvaa kysyntää uudelle laitteelle, mikä voi nostaa osakekurssia merkittävästi.',
    source: 'TechCrunch',
    time: '2 tuntia sitten',
    sentiment: 'positive'
  },
  {
    id: 2,
    title: 'Analyytikot nostavat Apple-osakkeen tavoitehintaa',
    summary: 'Useat investointipankit ovat nostaneet Applen tavoitehintaa vahvojen tulosodotusten vuoksi.',
    source: 'Reuters',
    time: '4 tuntia sitten',
    sentiment: 'positive'
  },
  {
    id: 3,
    title: 'Teknologia-osakkeet jatkavat nousuaan',
    summary: 'Markkinat reagoivat positiivisesti teknologiayhtiöiden vahvoihin tuloksiin.',
    source: 'Bloomberg',
    time: '6 tuntia sitten',
    sentiment: 'positive'
  },
  {
    id: 4,
    title: 'Fed:n korkokommentit vaikuttavat markkinoihin',
    summary: 'Keskuspankin viestintä tulevista koronmuutoksista luo epävarmuutta sijoittajien keskuudessa.',
    source: 'Wall Street Journal',
    time: '8 tuntia sitten',
    sentiment: 'neutral'
  }
]

export function NewsPanel({ symbol }: NewsPanelProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'border-l-green-500'
      case 'negative':
        return 'border-l-red-500'
      default:
        return 'border-l-gray-400'
    }
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Uutiset - {symbol}
      </h3>
      
      <div className="space-y-4">
        {mockNews.map((article) => (
          <article 
            key={article.id}
            className={`border-l-4 ${getSentimentColor(article.sentiment)} pl-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer`}
          >
            <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
              {article.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {article.summary}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">{article.source}</span>
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-3 w-3" />
                <span>{article.time}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
        Näytä lisää uutisia →
      </button>
    </div>
  )
}