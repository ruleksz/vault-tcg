import { TCGCard } from './api'

export function simulatePriceUpdate(cards: TCGCard[]): TCGCard[] {
  return cards.map(card => {
    const volatility = getVolatility(card.rarity)
    const changePercent = (Math.random() - 0.5) * volatility * 2
    const change = card.price * (changePercent / 100)
    const newPrice = Math.max(0.01, card.price + change)

    return {
      ...card,
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      marketPrice: parseFloat(newPrice.toFixed(2)),
      lastUpdated: new Date().toISOString(),
      priceHistory: [...(card.priceHistory || []).slice(-30), parseFloat(newPrice.toFixed(2))],
    }
  })
}

function getVolatility(rarity: string): number {
  const r = rarity.toLowerCase()
  if (r.includes('secret') || r.includes('rainbow')) return 4
  if (r.includes('ultra') || r.includes('mythic')) return 3
  if (r.includes('rare') || r.includes('super')) return 2
  return 1.5
}

export function formatPrice(price: number): string {
  if (price >= 1000) return `$${(price / 1000).toFixed(1)}K`
  return `$${price.toFixed(2)}`
}

export function formatChange(change: number, changePercent: number): string {
  const sign = change >= 0 ? '+' : ''
  return `${sign}$${Math.abs(change).toFixed(2)} (${sign}${changePercent.toFixed(1)}%)`
}

// Ticker data for the live price strip
export const TICKER_INITIAL = [
  { name: 'Charizard VSTAR PSA10', price: 425, changePercent: 5.2, up: true },
  { name: 'Blue-Eyes White Dragon', price: 210, changePercent: -1.2, up: false },
  { name: 'Black Lotus', price: 28500, changePercent: 0.8, up: true },
  { name: 'Pikachu VMAX Rainbow', price: 89, changePercent: 3.1, up: true },
  { name: 'Dark Magician LOB', price: 145, changePercent: -2.5, up: false },
  { name: 'Mewtwo Base Set', price: 680, changePercent: 12.4, up: true },
  { name: 'Umbreon VMAX Alt Art', price: 195, changePercent: -0.8, up: false },
  { name: 'Jace, Mind Sculptor', price: 85, changePercent: 1.9, up: true },
  { name: 'Luffy Secret Rare', price: 289, changePercent: 7.3, up: true },
  { name: 'Exodia the Forbidden One', price: 380, changePercent: -3.2, up: false },
  { name: 'Mox Sapphire', price: 8900, changePercent: 0.3, up: true },
  { name: 'Rayquaza VMAX Rainbow', price: 165, changePercent: 4.1, up: true },
]
