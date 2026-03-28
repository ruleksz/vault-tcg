'use client'

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import LiveTicker from './components/ticker/LiveTicker'
import StatsBar from './components/StatsBar'
import TrendingSection from './components/TrendingSection'
import CardsGrid from './components/CardsGrid'
import Footer from './components/footer/Footer'
import { TCGCard } from './lib/api'
import CardModal from './components/modal/CardModal'
import { useWatchlist } from './hooks/useCards'
import WatchlistSection from './components/WatchlistSection'
import { useCards } from './hooks/useCards'

// Separator component
function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(0,245,255,0.15), transparent)',
        }}
      />
    </div>
  )
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [externalSelectedCard, setExternalSelectedCard] = useState<TCGCard | null>(null)
  const { watchlist, toggle: toggleWatchlist } = useWatchlist()

  // We pull pokemon cards for the watchlist view to have real data
  const { cards: pokemonCards } = useCards('Pokemon', '')
  const { cards: yugiohCards } = useCards('Yu-Gi-Oh', '')

  const cardsRef = useRef<HTMLDivElement>(null)
  const trendingRef = useRef<HTMLDivElement>(null)
  const watchlistRef = useRef<HTMLDivElement>(null)

  const scrollTo = useCallback((ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q)
    if (q && cardsRef.current) {
      setTimeout(() => cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [])

  const allCards = [...pokemonCards, ...yugiohCards]

  return (
    <div className="min-h-screen relative">
      {/* Navbar */}
      <Navbar onSearch={handleSearch} searchValue={searchQuery} />

      {/* Hero */}
      <Hero
        onExplore={() => scrollTo(cardsRef)}
        onTrending={() => scrollTo(trendingRef)}
        onWatchlist={() => scrollTo(watchlistRef)}
      />

      {/* Live Ticker */}
      <LiveTicker />

      {/* Stats Bar */}
      <StatsBar />

      <SectionDivider />

      {/* Trending Section */}
      <div ref={trendingRef}>
        <TrendingSection onCardSelect={card => setExternalSelectedCard(card)} />
      </div>

      <SectionDivider />

      {/* Cards Grid */}
      <div ref={cardsRef}>
        <CardsGrid searchQuery={searchQuery} />
      </div>

      <SectionDivider />

      {/* Watchlist */}
      <div ref={watchlistRef}>
        <WatchlistSection
          cards={allCards}
          watchlistIds={watchlist}
          onRemove={toggleWatchlist}
          onSelect={card => setExternalSelectedCard(card)}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Global card modal (for trending / watchlist clicks) */}
      <CardModal
        card={externalSelectedCard}
        onClose={() => setExternalSelectedCard(null)}
        onWatchlist={toggleWatchlist}
        isWatchlisted={externalSelectedCard ? watchlist.includes(externalSelectedCard.id) : false}
      />

      {/* Back to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full"
        style={{
          background: 'rgba(0,245,255,0.12)',
          border: '1px solid rgba(0,245,255,0.25)',
          color: '#00f5ff',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 0 20px rgba(0,245,255,0.2)',
        }}
        whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0,245,255,0.4)' }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 3L14 12H2L8 3Z" />
        </svg>
      </motion.button>
    </div>
  )
}
