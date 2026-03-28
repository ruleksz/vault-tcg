'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, TrendingUp, TrendingDown, Trash2, Eye } from 'lucide-react'
import { TCGCard } from '../lib/api'
import { formatPrice } from '../lib/price-simulator'

interface WatchlistProps {
  cards: TCGCard[]
  watchlistIds: string[]
  onRemove: (id: string) => void
  onSelect: (card: TCGCard) => void
}

export default function WatchlistSection({ cards, watchlistIds, onRemove, onSelect }: WatchlistProps) {
  const watchlistCards = cards.filter(c => watchlistIds.includes(c.id))

  return (
    <section id="watchlist" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div
          className="p-2 rounded-xl"
          style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)' }}
        >
          <Bookmark size={22} style={{ color: '#00f5ff', fill: '#00f5ff' }} />
        </div>
        <div>
          <h2
            className="text-2xl font-black text-white"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)' }}
          >
            My{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00f5ff, #0099ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Watchlist
            </span>
          </h2>
          <p className="text-slate-500 text-sm">{watchlistCards.length} card{watchlistCards.length !== 1 ? 's' : ''} tracked</p>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {watchlistCards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 rounded-2xl"
            style={{
              background: 'rgba(0,245,255,0.03)',
              border: '1px dashed rgba(0,245,255,0.12)',
            }}
          >
            <Eye size={36} className="mx-auto mb-4" style={{ color: '#334155' }} />
            <p className="text-slate-400 font-semibold mb-1">Your watchlist is empty</p>
            <p className="text-slate-600 text-sm">Click the bookmark icon on any card to track it</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {watchlistCards.map((card, i) => {
              const isUp = card.changePercent >= 0
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl cursor-pointer group"
                  style={{
                    background: 'rgba(15,23,41,0.7)',
                    border: '1px solid rgba(0,245,255,0.07)',
                    backdropFilter: 'blur(12px)',
                  }}
                  onClick={() => onSelect(card)}
                  whileHover={{
                    borderColor: 'rgba(0,245,255,0.2)',
                    backgroundColor: 'rgba(15,23,41,0.9)',
                  }}
                >
                  {/* Image */}
                  <div
                    className="flex-shrink-0 rounded-lg overflow-hidden"
                    style={{ width: 48, height: 68 }}
                  >
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                      onError={e => {
                        (e.target as HTMLImageElement).src =
                          `https://via.placeholder.com/48x68/0a0f1e/00f5ff?text=${encodeURIComponent(card.name.slice(0, 2))}`
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-white truncate">{card.name}</p>
                    <p className="text-xs text-slate-500 truncate">{card.set} · {card.rarity}</p>
                    <span
                      className="inline-block mt-1 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider"
                      style={{
                        background: 'rgba(0,245,255,0.08)',
                        color: '#00f5ff',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {card.tcg}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p
                      className="text-base font-black text-white"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {formatPrice(card.price)}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      {isUp
                        ? <TrendingUp size={11} style={{ color: '#00ff88' }} />
                        : <TrendingDown size={11} style={{ color: '#ff3366' }} />
                      }
                      <span
                        className="text-xs font-bold"
                        style={{
                          color: isUp ? '#00ff88' : '#ff3366',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {isUp ? '+' : ''}{card.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <motion.button
                    className="flex-shrink-0 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(255,51,102,0.1)', color: '#ff3366' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={e => { e.stopPropagation(); onRemove(card.id) }}
                  >
                    <Trash2 size={14} />
                  </motion.button>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
