'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TICKER_INITIAL } from '../../lib/price-simulator'
import { Activity } from 'lucide-react'

interface TickerItem {
  name: string
  price: number
  changePercent: number
  up: boolean
}

export default function LiveTicker() {
  const [items, setItems] = useState<TickerItem[]>(TICKER_INITIAL)

  // Update prices slightly on interval
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => prev.map(item => {
        const delta = (Math.random() - 0.5) * 0.04
        const newChange = parseFloat((item.changePercent + delta).toFixed(2))
        const newPrice = parseFloat((item.price * (1 + delta / 100)).toFixed(2))
        return { ...item, price: newPrice, changePercent: newChange, up: newChange >= 0 }
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const doubled = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: 'rgba(0,245,255,0.04)',
        borderTop: '1px solid rgba(0,245,255,0.1)',
        borderBottom: '1px solid rgba(0,245,255,0.1)',
      }}
    >
      {/* Left label */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 flex items-center gap-2 px-4"
        style={{
          background: 'linear-gradient(to right, #030712 40%, transparent)',
          minWidth: '120px',
        }}
      >
        <Activity size={14} className="text-neon-green flex-shrink-0" style={{ color: '#00ff88' }} />
        <span
          className="text-xs font-black tracking-[0.2em] uppercase whitespace-nowrap"
          style={{ color: '#00ff88', fontFamily: 'var(--font-mono)' }}
        >
          LIVE
        </span>
      </div>

      {/* Scrolling content */}
      <div className="ticker-wrap py-3 pl-28">
        <div className="ticker-inner flex gap-12 items-center">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <span
                className="text-xs font-semibold text-slate-300 tracking-wide whitespace-nowrap"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {item.name}
              </span>
              <span
                className="text-xs font-black"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: item.up ? '#00ff88' : '#ff3366',
                }}
              >
                ${item.price.toFixed(2)}
              </span>
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded"
                style={{
                  background: item.up ? 'rgba(0,255,136,0.1)' : 'rgba(255,51,102,0.1)',
                  color: item.up ? '#00ff88' : '#ff3366',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {item.up ? '↑' : '↓'} {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(1)}%
              </span>
              {/* Divider */}
              <span className="text-slate-700 ml-4">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #030712, transparent)' }}
      />
    </div>
  )
}
