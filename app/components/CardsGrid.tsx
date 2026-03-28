'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCards, useWatchlist, TCGType } from '../hooks/useCards'
import { TCGCard } from '../lib/api'
import CardComponent from './card/Card'
import CardSkeleton from './card/CardSkeleton'
import TCGTabs from './tabs/TCGTabs'
import FilterBar from './tabs/FilterBar'
import CardModal from './modal/CardModal'
import { RefreshCw, ChevronDown } from 'lucide-react'

interface CardsGridProps {
  searchQuery: string
}

export default function CardsGrid({ searchQuery }: CardsGridProps) {
  const [activeTCG, setActiveTCG] = useState<TCGType>('Pokemon')
  const [selectedCard, setSelectedCard] = useState<TCGCard | null>(null)
  const [rarity, setRarity] = useState('All')
  const [sortBy, setSortBy] = useState('price-desc')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 999999])
  const [visibleCount, setVisibleCount] = useState(12)
  const prevPrices = useRef<Record<string, number>>({})

  const { watchlist, toggle: toggleWatchlist } = useWatchlist()
  const { cards, isLoading, isError, refetch } = useCards(activeTCG, searchQuery)

  // Track prev prices for animation
  const cardsWithPrev = useMemo(() => {
    return cards.map(card => {
      const prev = prevPrices.current[card.id]
      prevPrices.current[card.id] = card.price
      return { card, prevPrice: prev }
    })
  }, [cards])

  const filteredCards = useMemo(() => {
    let result = cardsWithPrev

    if (rarity !== 'All') {
      result = result.filter(({ card }) => card.rarity === rarity)
    }

    result = result.filter(({ card }) =>
      card.price >= priceRange[0] && card.price <= priceRange[1]
    )

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(({ card }) =>
        card.name.toLowerCase().includes(q) ||
        card.set.toLowerCase().includes(q) ||
        card.rarity.toLowerCase().includes(q)
      )
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-desc': return b.card.price - a.card.price
        case 'price-asc': return a.card.price - b.card.price
        case 'change-desc': return b.card.changePercent - a.card.changePercent
        case 'change-asc': return a.card.changePercent - b.card.changePercent
        case 'name-asc': return a.card.name.localeCompare(b.card.name)
        default: return 0
      }
    })

    return result
  }, [cardsWithPrev, rarity, sortBy, priceRange, searchQuery])

  const visibleCards = filteredCards.slice(0, visibleCount)

  return (
    <section id="cards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-1"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            Card{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Market
            </span>
          </h2>
          <p className="text-slate-500 text-sm">Live prices · Updated every 5 seconds</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: 180 }}
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{
            background: 'rgba(0,245,255,0.08)',
            border: '1px solid rgba(0,245,255,0.2)',
            color: '#00f5ff',
          }}
        >
          <RefreshCw size={14} />
          Refresh
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <TCGTabs active={activeTCG} onChange={tab => { setActiveTCG(tab); setVisibleCount(12) }} />
      </div>

      {/* Filters */}
      <div className="mb-8">
        <FilterBar
          rarity={rarity}
          onRarity={setRarity}
          priceRange={priceRange}
          onPriceRange={setPriceRange}
          sortBy={sortBy}
          onSortBy={setSortBy}
          cardCount={filteredCards.length}
        />
      </div>

      {/* Error state */}
      {isError && (
        <div
          className="text-center py-16 rounded-2xl"
          style={{ background: 'rgba(255,51,102,0.05)', border: '1px solid rgba(255,51,102,0.15)' }}
        >
          <p className="text-slate-400 mb-4">Failed to load cards. Using fallback data.</p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2 rounded-lg text-sm font-bold"
            style={{ background: 'rgba(255,51,102,0.15)', color: '#ff3366', border: '1px solid rgba(255,51,102,0.3)' }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <motion.div key={`skel-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <CardSkeleton />
                </motion.div>
              ))
            : visibleCards.map(({ card, prevPrice }) => (
                <CardComponent
                  key={card.id}
                  card={card}
                  onSelect={setSelectedCard}
                  onWatchlist={toggleWatchlist}
                  isWatchlisted={watchlist.includes(card.id)}
                  prevPrice={prevPrice}
                />
              ))
          }
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {!isLoading && filteredCards.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-slate-400 font-semibold mb-2">No cards match your filters</p>
          <p className="text-slate-600 text-sm">Try adjusting rarity, price range, or search term</p>
        </motion.div>
      )}

      {/* Load more */}
      {!isLoading && visibleCount < filteredCards.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setVisibleCount(v => v + 12)}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm tracking-wider"
            style={{
              background: 'rgba(0,245,255,0.06)',
              border: '1px solid rgba(0,245,255,0.18)',
              color: '#00f5ff',
            }}
          >
            <ChevronDown size={16} />
            Load More ({filteredCards.length - visibleCount} remaining)
          </motion.button>
        </motion.div>
      )}

      {/* Modal */}
      <CardModal
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
        onWatchlist={toggleWatchlist}
        isWatchlisted={selectedCard ? watchlist.includes(selectedCard.id) : false}
      />
    </section>
  )
}
