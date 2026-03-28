'use client'

import { motion } from 'framer-motion'
import { Zap, Github, Twitter, BarChart2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="relative mt-20 py-12 px-4"
      style={{
        borderTop: '1px solid rgba(0,245,255,0.08)',
        background: 'rgba(3,7,18,0.9)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={22} style={{ color: '#00f5ff' }} />
              <span
                className="text-xl font-black tracking-wider"
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
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              The most comprehensive real-time price tracker for trading card games. 
              Monitor Pokemon, Yu-Gi-Oh!, Magic: The Gathering, and One Piece card markets.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: <Github size={16} />, label: 'GitHub' },
                { icon: <Twitter size={16} />, label: 'Twitter' },
                { icon: <BarChart2 size={16} />, label: 'Stats' },
              ].map(item => (
                <motion.a
                  key={item.label}
                  href="#"
                  whileHover={{ scale: 1.1, color: '#00f5ff' }}
                  className="p-2 rounded-lg text-slate-500 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Platform',
              links: ['Market', 'Trending', 'Watchlist', 'Portfolio', 'Alerts'],
            },
            {
              title: 'Data',
              links: ['Pokemon TCG', 'Yu-Gi-Oh!', 'Magic: TG', 'One Piece', 'API Docs'],
            },
          ].map(col => (
            <div key={col.title}>
              <h4
                className="text-xs font-black tracking-[0.2em] uppercase text-slate-400 mb-4"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-xs text-slate-600">
            © 2025 TCG Vault. Price data from PokémonTCG.io, YGOProDeck & Scryfall.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00ff88' }} />
            <span className="text-xs text-slate-600" style={{ fontFamily: 'var(--font-mono)' }}>
              Live market data · Updated every 5s
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
