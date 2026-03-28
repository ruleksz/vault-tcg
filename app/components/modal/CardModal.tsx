'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, TrendingDown, Bookmark, ExternalLink, Clock, Star, Package } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts'
import { TCGCard } from '../../lib/api'
import { formatPrice } from '../../lib/price-simulator'

interface ModalProps {
  card: TCGCard | null
  onClose: () => void
  onWatchlist: (id: string) => void
  isWatchlisted: boolean
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(10,15,30,0.95)',
        border: '1px solid rgba(0,245,255,0.2)',
        borderRadius: 8,
        padding: '8px 12px',
      }}>
        <p style={{ color: '#00f5ff', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}>
          ${payload[0].value?.toFixed(2)}
        </p>
      </div>
    )
  }
  return null
}

export default function CardModal({ card, onClose, onWatchlist, isWatchlisted }: ModalProps) {
  const [imgError, setImgError] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (card) {
      document.body.style.overflow = 'hidden'
      setImgError(false)
    }
    return () => { document.body.style.overflow = '' }
  }, [card])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!card) return null

  const chartData = card.priceHistory.map((price, i) => ({
    day: i === card.priceHistory.length - 1 ? 'Now' : `D-${card.priceHistory.length - 1 - i}`,
    price,
  }))

  const minPrice = Math.min(...card.priceHistory)
  const maxPrice = Math.max(...card.priceHistory)
  const isPositive = card.changePercent >= 0
  const lineColor = isPositive ? '#00ff88' : '#ff3366'

  return (
    <AnimatePresence>
      {card && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(12px)' }}
          onClick={e => { if (e.target === overlayRef.current) onClose() }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{
              background: 'rgba(10,15,30,0.97)',
              border: '1px solid rgba(0,245,255,0.15)',
              boxShadow: '0 0 60px rgba(0,245,255,0.1), 0 40px 100px rgba(0,0,0,0.8)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#94a3b8',
              }}
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left: Card image */}
              <div
                className="relative p-8 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.04) 0%, rgba(191,0,255,0.04) 100%)',
                  borderRight: '1px solid rgba(0,245,255,0.08)',
                }}
              >
                <motion.div
                  initial={{ scale: 0.85, opacity: 0, rotateY: -20 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  transition={{ delay: 0.1, type: 'spring', damping: 20 }}
                  className="relative"
                  style={{ maxWidth: 260 }}
                >
                  <div
                    className="absolute inset-0 rounded-xl blur-xl opacity-60 scale-95"
                    style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%)' }}
                  />
                  <img
                    src={imgError ? `https://via.placeholder.com/300x420/0a0f1e/00f5ff?text=${encodeURIComponent(card.name)}` : card.image}
                    alt={card.name}
                    className="relative rounded-xl w-full"
                    style={{ boxShadow: '0 0 40px rgba(0,245,255,0.3), 0 20px 60px rgba(0,0,0,0.8)' }}
                    onError={() => setImgError(true)}
                  />
                </motion.div>
              </div>

              {/* Right: Details */}
              <div className="p-6 space-y-5">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(0,245,255,0.1)',
                        color: '#00f5ff',
                        border: '1px solid rgba(0,245,255,0.25)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {card.tcg}
                    </span>
                    {card.trending && (
                      <span
                        className="text-[10px] font-black px-3 py-1 rounded-full"
                        style={{
                          background: 'rgba(0,255,136,0.1)',
                          color: '#00ff88',
                          border: '1px solid rgba(0,255,136,0.25)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        🔥 TRENDING
                      </span>
                    )}
                  </div>
                  <h2
                    className="text-2xl font-black text-white mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}
                  >
                    {card.name}
                  </h2>
                  <p className="text-sm text-slate-400">{card.set}</p>
                </div>

                {/* Price */}
                <div
                  className="p-4 rounded-xl"
                  style={{ background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.08)' }}
                >
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <p className="text-xs text-slate-500 mb-1 uppercase tracking-widest">Market Price</p>
                      <p
                        className="text-4xl font-black text-white"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {formatPrice(card.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-1 uppercase tracking-widest">24h Change</p>
                      <div className="flex items-center gap-1">
                        {isPositive ? <TrendingUp size={16} style={{ color: '#00ff88' }} /> : <TrendingDown size={16} style={{ color: '#ff3366' }} />}
                        <span
                          className="text-xl font-black"
                          style={{
                            color: isPositive ? '#00ff88' : '#ff3366',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {isPositive ? '+' : ''}{card.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Low / High / Market */}
                  <div className="grid grid-cols-3 gap-3 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {[
                      { label: 'Low', value: card.lowPrice, color: '#ff3366' },
                      { label: 'Market', value: card.marketPrice, color: '#00f5ff' },
                      { label: 'High', value: card.highPrice, color: '#00ff88' },
                    ].map(item => (
                      <div key={item.label} className="text-center">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                        <p
                          className="text-sm font-black"
                          style={{ color: item.color, fontFamily: 'var(--font-mono)' }}
                        >
                          {formatPrice(item.value || 0)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price chart */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">30-Day Price History</p>
                  <div
                    className="rounded-xl p-3"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <ResponsiveContainer width="100%" height={140}>
                      <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis
                          dataKey="day"
                          tick={{ fill: '#475569', fontSize: 9, fontFamily: 'var(--font-mono)' }}
                          tickLine={false}
                          axisLine={false}
                          interval={6}
                        />
                        <YAxis
                          tick={{ fill: '#475569', fontSize: 9, fontFamily: 'var(--font-mono)' }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={v => `$${v}`}
                          width={50}
                          domain={[minPrice * 0.95, maxPrice * 1.05]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <defs>
                          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={lineColor} stopOpacity={0.3} />
                            <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke={lineColor}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4, fill: lineColor, stroke: 'rgba(10,15,30,0.9)', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Card details */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <Star size={13} />, label: 'Rarity', value: card.rarity },
                    { icon: <Package size={13} />, label: 'Set', value: card.set },
                    { icon: <Clock size={13} />, label: 'Updated', value: new Date(card.lastUpdated).toLocaleTimeString() },
                    { icon: <ExternalLink size={13} />, label: 'Artist', value: card.artist || 'Unknown' },
                  ].map(detail => (
                    <div
                      key={detail.label}
                      className="p-3 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                        {detail.icon}
                        <span className="text-[10px] uppercase tracking-wider">{detail.label}</span>
                      </div>
                      <p className="text-xs text-slate-200 font-semibold truncate">{detail.value}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-3 rounded-xl font-bold text-sm tracking-widest uppercase"
                    style={{
                      background: 'linear-gradient(135deg, #00f5ff, #0099ff)',
                      color: '#030712',
                    }}
                  >
                    View Market
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onWatchlist(card.id)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm tracking-wider"
                    style={{
                      background: isWatchlisted ? 'rgba(0,245,255,0.15)' : 'rgba(255,255,255,0.05)',
                      border: isWatchlisted ? '1px solid rgba(0,245,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
                      color: isWatchlisted ? '#00f5ff' : '#94a3b8',
                    }}
                  >
                    <Bookmark size={15} style={{ fill: isWatchlisted ? '#00f5ff' : 'none' }} />
                    {isWatchlisted ? 'Saved' : 'Watch'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
