'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'

interface FilterBarProps {
  rarity: string
  onRarity: (r: string) => void
  priceRange: [number, number]
  onPriceRange: (r: [number, number]) => void
  sortBy: string
  onSortBy: (s: string) => void
  cardCount: number
}

const RARITIES = ['All', 'Common', 'Uncommon', 'Rare', 'Super Rare', 'Ultra Rare', 'Secret Rare', 'Rainbow Rare', 'Mythic Rare']
const SORT_OPTIONS = [
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'change-desc', label: '📈 Biggest Gainers' },
  { value: 'change-asc', label: '📉 Biggest Losers' },
  { value: 'name-asc', label: 'Name A → Z' },
]
const PRICE_RANGES: [string, [number, number]][] = [
  ['All Prices', [0, 999999]],
  ['Under $10', [0, 10]],
  ['$10 – $50', [10, 50]],
  ['$50 – $200', [50, 200]],
  ['$200 – $1K', [200, 1000]],
  ['Over $1K', [1000, 999999]],
]

export default function FilterBar({ rarity, onRarity, priceRange, onPriceRange, sortBy, onSortBy, cardCount }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)

  const activeFilters = [
    rarity !== 'All' ? rarity : null,
    sortBy !== 'price-desc' ? SORT_OPTIONS.find(o => o.value === sortBy)?.label : null,
    priceRange[1] !== 999999 ? PRICE_RANGES.find(([_, r]) => r[0] === priceRange[0] && r[1] === priceRange[1])?.[0] : null,
  ].filter(Boolean)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Card count */}
        <div className="flex items-center gap-3">
          <p className="text-sm text-slate-400">
            <span className="font-black text-white" style={{ fontFamily: 'var(--font-mono)' }}>{cardCount}</span>
            {' '}cards found
          </p>

          {/* Active filter chips */}
          <AnimatePresence>
            {activeFilters.map(filter => (
              <motion.span
                key={filter}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"
                style={{
                  background: 'rgba(0,245,255,0.1)',
                  color: '#00f5ff',
                  border: '1px solid rgba(0,245,255,0.2)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {filter}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Filter toggle */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
          style={{
            background: showFilters ? 'rgba(0,245,255,0.12)' : 'rgba(255,255,255,0.04)',
            border: showFilters ? '1px solid rgba(0,245,255,0.3)' : '1px solid rgba(255,255,255,0.07)',
            color: showFilters ? '#00f5ff' : '#64748b',
          }}
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeFilters.length > 0 && (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-black"
              style={{ background: '#00f5ff', color: '#030712' }}
            >
              {activeFilters.length}
            </span>
          )}
          <ChevronDown
            size={14}
            style={{ transform: showFilters ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
          />
        </motion.button>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="p-4 rounded-xl space-y-4"
              style={{
                background: 'rgba(15,23,41,0.7)',
                border: '1px solid rgba(0,245,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Sort */}
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Sort By
                </p>
                <div className="flex flex-wrap gap-2">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => onSortBy(opt.value)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                      style={{
                        background: sortBy === opt.value ? 'rgba(0,245,255,0.15)' : 'rgba(255,255,255,0.04)',
                        border: sortBy === opt.value ? '1px solid rgba(0,245,255,0.3)' : '1px solid rgba(255,255,255,0.06)',
                        color: sortBy === opt.value ? '#00f5ff' : '#64748b',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rarity */}
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Rarity
                </p>
                <div className="flex flex-wrap gap-2">
                  {RARITIES.map(r => (
                    <button
                      key={r}
                      onClick={() => onRarity(r)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                      style={{
                        background: rarity === r ? 'rgba(191,0,255,0.15)' : 'rgba(255,255,255,0.04)',
                        border: rarity === r ? '1px solid rgba(191,0,255,0.35)' : '1px solid rgba(255,255,255,0.06)',
                        color: rarity === r ? '#bf00ff' : '#64748b',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Price Range
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map(([label, range]) => {
                    const isActive = priceRange[0] === range[0] && priceRange[1] === range[1]
                    return (
                      <button
                        key={label}
                        onClick={() => onPriceRange(range)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                        style={{
                          background: isActive ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.04)',
                          border: isActive ? '1px solid rgba(255,215,0,0.35)' : '1px solid rgba(255,255,255,0.06)',
                          color: isActive ? '#ffd700' : '#64748b',
                        }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Reset */}
              {activeFilters.length > 0 && (
                <button
                  onClick={() => { onRarity('All'); onPriceRange([0, 999999]); onSortBy('price-desc') }}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X size={12} /> Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
