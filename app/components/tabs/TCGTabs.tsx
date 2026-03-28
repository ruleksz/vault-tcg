'use client'

import { motion } from 'framer-motion'
import { TCGType } from '../../hooks/useCards'

interface TabsProps {
  active: TCGType
  onChange: (tab: TCGType) => void
}

const TABS: { id: TCGType; label: string; emoji: string; color: string }[] = [
  { id: 'Pokemon', label: 'Pokémon', emoji: '⚡', color: '#ffd700' },
  { id: 'Yu-Gi-Oh', label: 'Yu-Gi-Oh!', emoji: '👁', color: '#bf00ff' },
  { id: 'Magic', label: 'Magic: TG', emoji: '🔮', color: '#cc3300' },
  { id: 'One Piece', label: 'One Piece', emoji: '☠️', color: '#ff3366' },
]

export default function TCGTabs({ active, onChange }: TabsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {TABS.map(tab => {
        const isActive = active === tab.id
        return (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wider transition-all duration-200"
            style={{
              background: isActive
                ? `${tab.color}18`
                : 'rgba(255,255,255,0.04)',
              border: isActive
                ? `1px solid ${tab.color}50`
                : '1px solid rgba(255,255,255,0.07)',
              color: isActive ? tab.color : '#64748b',
              fontFamily: 'var(--font-body)',
            }}
          >
            <span>{tab.emoji}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.id.split('-')[0]}</span>

            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  boxShadow: `0 0 15px ${tab.color}30`,
                }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
