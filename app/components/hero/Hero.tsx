'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Zap, Eye } from 'lucide-react'

interface HeroProps {
  onExplore: () => void
  onTrending: () => void
  onWatchlist: () => void
}

const FLOATING_CARDS = [
  { src: 'https://images.pokemontcg.io/swsh12pt5gg/GG06_hires.png', rotate: -8, x: -160, y: 20, delay: 0, label: 'Charizard VSTAR' },
  { src: 'https://images.pokemontcg.io/swsh7/215_hires.png', rotate: 4, x: 160, y: -10, delay: 0.5, label: 'Umbreon VMAX' },
  { src: 'https://images.pokemontcg.io/swsh4/44_hires.png', rotate: -3, x: 0, y: 30, delay: 1, label: 'Pikachu VMAX' },
]

export default function Hero({ onExplore, onTrending, onWatchlist }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #00f5ff 0%, #bf00ff 50%, transparent 100%)' }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #bf00ff 0%, transparent 100%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #ffd700 0%, transparent 100%)' }}
        />

        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00f5ff" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(0,245,255,0.08)',
                border: '1px solid rgba(0,245,255,0.2)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" style={{ background: '#00ff88' }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#00f5ff', fontFamily: 'var(--font-mono)' }}>
                Live Market Data
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-white mb-2">
                Track TCG
              </span>
              <span
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #00f5ff 0%, #bf00ff 50%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Card Prices
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-white">
                In Real-Time
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg text-slate-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Monitor Pokemon, Yu-Gi-Oh!, Magic & more. Live market prices, trending cards, and portfolio tracking — all in one premium dashboard.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10"
            >
              {[
                { value: '50K+', label: 'Cards Tracked' },
                { value: '$2.4M', label: 'Daily Volume' },
                { value: '99.9%', label: 'Uptime' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-black" style={{ color: '#00f5ff', fontFamily: 'var(--font-display)' }}>{stat.value}</div>
                  <div className="text-xs text-slate-500 tracking-widest uppercase mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              <motion.button
                onClick={onExplore}
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,245,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, #00f5ff, #0099ff)',
                  color: '#030712',
                  boxShadow: '0 0 20px rgba(0,245,255,0.2)',
                }}
              >
                <Zap size={16} /> Explore Cards
              </motion.button>

              <motion.button
                onClick={onTrending}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase"
                style={{
                  background: 'rgba(0,245,255,0.08)',
                  border: '1px solid rgba(0,245,255,0.25)',
                  color: '#00f5ff',
                }}
              >
                <TrendingUp size={16} /> Trending
              </motion.button>

              <motion.button
                onClick={onWatchlist}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8',
                }}
              >
                <Eye size={16} /> Watchlist
              </motion.button>
            </motion.div>
          </div>

          {/* Right: Floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="relative flex-shrink-0 w-[340px] h-[380px] lg:h-[460px] hidden sm:block"
          >
            {FLOATING_CARDS.map((card, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  x: card.x,
                  y: card.y,
                  rotate: card.rotate,
                  zIndex: 3 - i,
                }}
                animate={{
                  y: [card.y, card.y - 15, card.y],
                  rotate: [card.rotate, card.rotate + 2, card.rotate],
                }}
                transition={{
                  duration: 5 + i,
                  delay: card.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    width: 130,
                    boxShadow: i === 2
                      ? '0 0 40px rgba(0,245,255,0.5), 0 20px 60px rgba(0,0,0,0.8)'
                      : '0 10px 40px rgba(0,0,0,0.7)',
                    border: '1px solid rgba(0,245,255,0.2)',
                    transform: 'translateX(-50%) translateY(-50%)',
                  }}
                >
                  <img
                    src={card.src}
                    alt={card.label}
                    className="w-full h-auto block"
                    style={{ aspectRatio: '250/350' }}
                    onError={e => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/250x350/0a0f1e/00f5ff?text=${encodeURIComponent(card.label)}`
                    }}
                  />
                  {/* Shine overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
                    }}
                  />
                </div>

                {/* Price badge */}
                {i === 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                    style={{
                      background: 'rgba(0,245,255,0.15)',
                      border: '1px solid rgba(0,245,255,0.4)',
                      color: '#00f5ff',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    $89.00 ↑ +3.1%
                  </motion.div>
                )}
              </motion.div>
            ))}

            {/* Glow circle behind */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(0,245,255,0.1) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #030712)' }}
      />
    </section>
  )
}
