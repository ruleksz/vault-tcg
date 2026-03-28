'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TCGCard } from '../../lib/api'
import { Bookmark, TrendingUp, Zap, Star } from 'lucide-react'
import { formatPrice } from '../../lib/price-simulator'

interface CardProps {
  card: TCGCard
  onSelect: (card: TCGCard) => void
  onWatchlist: (id: string) => void
  isWatchlisted: boolean
  prevPrice?: number
}

const TCG_COLORS: Record<string, { primary: string; secondary: string; bg: string }> = {
  'Pokemon': { primary: '#ffd700', secondary: '#ff6b00', bg: 'rgba(255,215,0,0.08)' },
  'Yu-Gi-Oh': { primary: '#bf00ff', secondary: '#6600cc', bg: 'rgba(191,0,255,0.08)' },
  'Magic': { primary: '#cc3300', secondary: '#ff6633', bg: 'rgba(204,51,0,0.08)' },
  'One Piece': { primary: '#ff3366', secondary: '#cc0033', bg: 'rgba(255,51,102,0.08)' },
}

const RARITY_COLORS: Record<string, string> = {
  'Common': '#64748b',
  'Uncommon': '#22c55e',
  'Rare': '#3b82f6',
  'Super Rare': '#8b5cf6',
  'Ultra Rare': '#f59e0b',
  'Secret Rare': '#00f5ff',
  'Rainbow Rare': '#ff00ff',
  'Mythic Rare': '#ff6b00',
  'Leader Rare': '#ffd700',
}

export default function CardComponent({ card, onSelect, onWatchlist, isWatchlisted, prevPrice }: CardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const colors = TCG_COLORS[card.tcg] || TCG_COLORS['Pokemon']
  const rarityColor = RARITY_COLORS[card.rarity] || '#64748b'

  const priceChanged = prevPrice !== undefined && prevPrice !== card.price
  const priceUp = priceChanged && card.price > (prevPrice || 0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    setTilt({ x: x * 8, y: y * 8 })
  }, [])

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="cursor-pointer select-none"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(card)}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative rounded-2xl overflow-hidden h-full"
        style={{
          background: 'rgba(15,23,41,0.85)',
          backdropFilter: 'blur(12px)',
          border: isHovered
            ? `1px solid ${colors.primary}55`
            : '1px solid rgba(255,255,255,0.06)',
          boxShadow: isHovered
            ? `0 0 30px ${colors.primary}30, 0 20px 60px rgba(0,0,0,0.5)`
            : '0 4px 20px rgba(0,0,0,0.3)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '5/7' }}>
          <img
            src={imgError ? `https://via.placeholder.com/300x420/0a0f1e/00f5ff?text=${encodeURIComponent(card.name)}` : card.image}
            alt={card.name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            onError={() => setImgError(true)}
          />

          {/* Shine overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: isHovered
                ? `linear-gradient(${135 + tilt.y * 5}deg, rgba(255,255,255,0.18) 0%, transparent 60%)`
                : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
            }}
          />

          {/* Top badges */}
          <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
            {/* TCG Badge */}
            <span
              className="text-[10px] font-black tracking-[0.15em] uppercase px-2 py-1 rounded-full"
              style={{
                background: colors.bg,
                color: colors.primary,
                border: `1px solid ${colors.primary}40`,
                backdropFilter: 'blur(8px)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {card.tcg}
            </span>

            {/* Trending badge */}
            {card.trending && (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full"
                style={{
                  background: 'rgba(0,255,136,0.15)',
                  color: '#00ff88',
                  border: '1px solid rgba(0,255,136,0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <TrendingUp size={9} /> HOT
              </motion.span>
            )}
          </div>

          {/* Watchlist button */}
          <motion.button
            className="absolute bottom-2 right-2 p-2 rounded-full"
            style={{
              background: isWatchlisted ? 'rgba(0,245,255,0.2)' : 'rgba(0,0,0,0.5)',
              border: isWatchlisted ? '1px solid rgba(0,245,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={e => { e.stopPropagation(); onWatchlist(card.id) }}
          >
            <Bookmark
              size={14}
              style={{
                color: isWatchlisted ? '#00f5ff' : '#64748b',
                fill: isWatchlisted ? '#00f5ff' : 'none',
              }}
            />
          </motion.button>
        </div>

        {/* Card info */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="text-sm font-bold text-white leading-tight line-clamp-2"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {card.name}
            </h3>
          </div>

          <p className="text-xs text-slate-500 truncate" style={{ fontFamily: 'var(--font-body)' }}>
            {card.set}
          </p>

          {/* Price row */}
          <div className="flex items-center justify-between pt-1">
            <motion.span
              key={`${card.id}-${card.price}`}
              className={`text-lg font-black ${priceChanged ? (priceUp ? 'price-up' : 'price-down') : ''}`}
              style={{
                fontFamily: 'var(--font-mono)',
                color: priceChanged ? (priceUp ? '#00ff88' : '#ff3366') : '#ffffff',
              }}
            >
              {formatPrice(card.price)}
            </motion.span>

            <AnimatePresence mode="wait">
              <motion.span
                key={`${card.id}-change-${card.changePercent}`}
                initial={{ opacity: 0, y: card.changePercent >= 0 ? -8 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-bold px-2 py-1 rounded-lg"
                style={{
                  background: card.changePercent >= 0 ? 'rgba(0,255,136,0.1)' : 'rgba(255,51,102,0.1)',
                  color: card.changePercent >= 0 ? '#00ff88' : '#ff3366',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {card.changePercent >= 0 ? '▲' : '▼'} {Math.abs(card.changePercent).toFixed(1)}%
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Rarity badge */}
          <div className="flex items-center gap-2">
            <Star size={10} style={{ color: rarityColor, fill: rarityColor }} />
            <span
              className="text-[10px] font-semibold tracking-wider uppercase"
              style={{ color: rarityColor, fontFamily: 'var(--font-mono)' }}
            >
              {card.rarity}
            </span>
          </div>
        </div>

        {/* Bottom glow line */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)` }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
