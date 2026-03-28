'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Activity, BarChart2, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const STATS = [
  { icon: <Activity size={16} />, label: 'Market Cap', value: '$2.4B', change: '+3.2%', up: true },
  { icon: <TrendingUp size={16} />, label: '24h Volume', value: '$18.7M', change: '+12.1%', up: true },
  { icon: <BarChart2 size={16} />, label: 'Cards Tracked', value: '52,341', change: '+128', up: true },
  { icon: <Users size={16} />, label: 'Active Users', value: '14,203', change: '+5.8%', up: true },
]

export default function StatsBar() {
  const [stats, setStats] = useState(STATS)

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(s => {
        const delta = (Math.random() - 0.45) * 0.5
        return { ...s, up: delta >= 0 }
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative p-4 rounded-xl overflow-hidden"
            style={{
              background: 'rgba(15,23,41,0.7)',
              border: '1px solid rgba(0,245,255,0.07)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Glow accent */}
            <div
              className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
              style={{
                background: stat.up ? 'rgba(0,255,136,0.08)' : 'rgba(255,51,102,0.08)',
                filter: 'blur(20px)',
                transform: 'translate(30%, -30%)',
              }}
            />

            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: '#00f5ff' }}>{stat.icon}</span>
              <span
                className="text-[10px] uppercase tracking-[0.2em] text-slate-500"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {stat.label}
              </span>
            </div>

            <div className="flex items-end justify-between">
              <span
                className="text-xl font-black text-white"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: stat.up ? 'rgba(0,255,136,0.1)' : 'rgba(255,51,102,0.1)',
                  color: stat.up ? '#00ff88' : '#ff3366',
                }}
              >
                {stat.up ? '▲' : '▼'} {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
