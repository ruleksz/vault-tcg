'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, Flame, ChevronRight } from 'lucide-react'
import { TCGCard } from '../lib/api'
import { formatPrice, simulatePriceUpdate } from '../lib/price-simulator'

const MOCK_TRENDING: TCGCard[] = [
  {
    id: 'trend-1', name: 'Charizard VSTAR', image: 'https://images.pokemontcg.io/swsh12pt5gg/GG06_hires.png',
    price: 425, change: 21.25, changePercent: 5.27, rarity: 'Ultra Rare', tcg: 'Pokemon',
    set: 'Crown Zenith', marketPrice: 425, lowPrice: 361, highPrice: 510,
    lastUpdated: new Date().toISOString(), trending: true,
    priceHistory: Array.from({ length: 31 }, (_, i) => 380 + i * 1.5 + Math.random() * 10),
  },
  {
    id: 'trend-2', name: 'Mewtwo Base Set', image: 'https://images.pokemontcg.io/base1/10_hires.png',
    price: 680, change: 74.8, changePercent: 12.4, rarity: 'Rare', tcg: 'Pokemon',
    set: 'Base Set', marketPrice: 680, lowPrice: 580, highPrice: 750,
    lastUpdated: new Date().toISOString(), trending: true,
    priceHistory: Array.from({ length: 31 }, (_, i) => 580 + i * 3.3 + Math.random() * 20),
  },
  {
    id: 'trend-3', name: 'Dark Magician LOB', image: '',
    price: 145, change: -3.77, changePercent: -2.53, rarity: 'Ultra Rare', tcg: 'Yu-Gi-Oh',
    set: 'Legend of Blue Eyes', marketPrice: 145, lowPrice: 123, highPrice: 175,
    lastUpdated: new Date().toISOString(), trending: true,
    priceHistory: Array.from({ length: 31 }, (_, i) => 155 - i * 0.33 + Math.random() * 8),
  },
  {
    id: 'trend-4', name: 'Black Lotus Alpha', image: '',
    price: 28500, change: 2280, changePercent: 8.7, rarity: 'Rare', tcg: 'Magic',
    set: 'Alpha Edition', marketPrice: 28500, lowPrice: 25000, highPrice: 32000,
    lastUpdated: new Date().toISOString(), trending: true,
    priceHistory: Array.from({ length: 31 }, (_, i) => 24000 + i * 150 + Math.random() * 500),
  },
  {
    id: 'trend-5', name: 'Shanks Secret Rare', image: '',
    price: 520, change: 35.36, changePercent: 7.3, rarity: 'Secret Rare', tcg: 'One Piece',
    set: 'Romance Dawn', marketPrice: 520, lowPrice: 440, highPrice: 600,
    lastUpdated: new Date().toISOString(), trending: true,
    priceHistory: Array.from({ length: 31 }, (_, i) => 440 + i * 2.6 + Math.random() * 15),
  },
  {
    id: 'trend-6', name: 'Umbreon VMAX Alt', image: 'https://images.pokemontcg.io/swsh7/215_hires.png',
    price: 195, change: -1.56, changePercent: -0.79, rarity: 'Rainbow Rare', tcg: 'Pokemon',
    set: 'Evolving Skies', marketPrice: 195, lowPrice: 165, highPrice: 230,
    lastUpdated: new Date().toISOString(), trending: true,
    priceHistory: Array.from({ length: 31 }, (_, i) => 200 - i * 0.17 + Math.random() * 8),
  },
]

const TCG_ACCENTS: Record<string, string> = {
  'Pokemon': '#ffd700',
  'Yu-Gi-Oh': '#bf00ff',
  'Magic': '#cc3300',
  'One Piece': '#ff3366',
}

export default function TrendingSection({ onCardSelect }: { onCardSelect: (card: TCGCard) => void }) {
  const [cards, setCards] = useState(MOCK_TRENDING)

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => simulatePriceUpdate(prev))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="trending" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame size={28} style={{ color: '#ff6b00' }} />
          </motion.div>
          <div>
            <h2
              className="text-3xl font-black text-white"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3.5vw, 2rem)' }}
            >
              Trending{' '}
              <span style={{
                background: 'linear-gradient(135deg, #ff6b00, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Now
              </span>
            </h2>
            <p className="text-slate-500 text-sm mt-0.5">Hottest movers in the last 24 hours</p>
          </div>
        </div>

        <button
          className="hidden sm:flex items-center gap-1.5 text-sm font-semibold"
          style={{ color: '#00f5ff' }}
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => {
          const accent = TCG_ACCENTS[card.tcg] || '#00f5ff'
          const isUp = card.changePercent >= 0

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => onCardSelect(card)}
              className="cursor-pointer group relative rounded-2xl overflow-hidden p-4 flex items-center gap-4"
              style={{
                background: 'rgba(15,23,41,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                scale: 1.02,
                borderColor: `${accent}40`,
                boxShadow: `0 0 25px ${accent}20`,
              }}
            >
              {/* Rank badge */}
              <div
                className="absolute top-3 left-3 text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{
                  background: `${accent}18`,
                  color: accent,
                  fontFamily: 'var(--font-mono)',
                  border: `1px solid ${accent}35`,
                }}
              >
                #{i + 1}
              </div>

              {/* Card image */}
              <div
                className="flex-shrink-0 rounded-xl overflow-hidden"
                style={{
                  width: 64,
                  height: 90,
                  background: 'rgba(0,0,0,0.5)',
                  border: `1px solid ${accent}25`,
                  boxShadow: `0 0 15px ${accent}20`,
                }}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                  onError={e => {
                    (e.target as HTMLImageElement).src =
                      `https://via.placeholder.com/64x90/0a0f1e/${accent.slice(1)}?text=${encodeURIComponent(card.name.slice(0, 2))}`
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded"
                    style={{
                      background: `${accent}15`,
                      color: accent,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {card.tcg}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[9px] font-black px-1.5 py-0.5 rounded"
                    style={{
                      background: 'rgba(255,107,0,0.15)',
                      color: '#ff6b00',
                    }}
                  >
                    🔥 HOT
                  </motion.span>
                </div>

                <h3
                  className="text-sm font-black text-white truncate mb-0.5"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {card.name}
                </h3>
                <p className="text-[11px] text-slate-500 truncate mb-2">{card.set}</p>

                <div className="flex items-center justify-between">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={card.price}
                      initial={{ opacity: 0, y: isUp ? -6 : 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-base font-black"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: '#ffffff',
                      }}
                    >
                      {formatPrice(card.price)}
                    </motion.span>
                  </AnimatePresence>

                  <div className="flex items-center gap-1">
                    {isUp
                      ? <TrendingUp size={12} style={{ color: '#00ff88' }} />
                      : <TrendingDown size={12} style={{ color: '#ff3366' }} />
                    }
                    <span
                      className="text-xs font-black"
                      style={{
                        color: isUp ? '#00ff88' : '#ff3366',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {isUp ? '+' : ''}{card.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom glow line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
              />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
