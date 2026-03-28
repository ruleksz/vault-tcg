'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchPokemonCards, fetchYugiohCards, fetchMagicCards, getOnePieceCards, TCGCard } from '../lib/api'
import { simulatePriceUpdate } from '../lib/price-simulator'
import { useState, useEffect, useRef } from 'react'

export type TCGType = 'Pokemon' | 'Yu-Gi-Oh' | 'Magic' | 'One Piece'

export function useCards(tcg: TCGType, searchQuery: string = '') {
  const queryClient = useQueryClient()
  const [cards, setCards] = useState<TCGCard[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const queryKey = ['cards', tcg, searchQuery]

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      switch (tcg) {
        case 'Pokemon': return fetchPokemonCards(searchQuery || 'charizard')
        case 'Yu-Gi-Oh': return fetchYugiohCards(searchQuery)
        case 'Magic': return fetchMagicCards(searchQuery || 'dragon')
        case 'One Piece': return getOnePieceCards()
        default: return []
      }
    },
    staleTime: 30000,
  })

  useEffect(() => {
    if (data) {
      setCards(data)
    }
  }, [data])

  // Real-time price simulation every 5 seconds
  useEffect(() => {
    if (!cards.length) return

    intervalRef.current = setInterval(() => {
      setCards(prev => simulatePriceUpdate(prev))
    }, 5000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [cards.length > 0])

  return { cards, isLoading, isError, refetch }
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('tcg-watchlist')
    if (stored) setWatchlist(JSON.parse(stored))
  }, [])

  const toggle = (id: string) => {
    setWatchlist(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      localStorage.setItem('tcg-watchlist', JSON.stringify(next))
      return next
    })
  }

  return { watchlist, toggle }
}
