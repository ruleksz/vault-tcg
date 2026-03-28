'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Bell, Wallet, Menu, X, Zap } from 'lucide-react'

interface NavbarProps {
  onSearch: (q: string) => void
  searchValue: string
}

export default function Navbar({ onSearch, searchValue }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [focused, setFocused] = useState(false)

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <Zap size={24} className="text-neon-cyan" />
              <div className="absolute inset-0 blur-sm opacity-60" style={{ color: '#00f5ff' }}>
                <Zap size={24} />
              </div>
            </div>
            <span
              className="text-xl font-bold tracking-wider"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              TCG Vault
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Market', 'Trending', 'Watchlist', 'Portfolio'].map(item => (
              <motion.a
                key={item}
                href="#"
                className="text-sm font-semibold tracking-widest uppercase text-slate-400 hover:text-neon-cyan transition-colors duration-200"
                whileHover={{ y: -1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Search + Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300"
              style={{
                background: focused ? 'rgba(0, 245, 255, 0.08)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${focused ? 'rgba(0,245,255,0.35)' : 'rgba(255,255,255,0.08)'}`,
                minWidth: '220px',
              }}
            >
              <Search size={15} className="text-slate-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchValue}
                onChange={e => onSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none w-full"
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="p-2 rounded-lg text-slate-400 hover:text-neon-cyan transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <Bell size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm tracking-wider"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(191,0,255,0.15))',
                border: '1px solid rgba(0,245,255,0.25)',
                color: '#00f5ff',
              }}
            >
              <Wallet size={15} />
              Connect
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-3 border-t"
            style={{ borderColor: 'rgba(0,245,255,0.08)' }}
          >
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Search size={15} className="text-slate-500" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchValue}
                onChange={e => onSearch(e.target.value)}
                className="bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none flex-1"
              />
            </div>
            {['Market', 'Trending', 'Watchlist', 'Portfolio'].map(item => (
              <a key={item} href="#" className="block text-sm font-semibold text-slate-400 hover:text-neon-cyan px-1 py-2 uppercase tracking-widest">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
