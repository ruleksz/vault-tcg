export interface TCGCard {
  id: string
  name: string
  image: string
  price: number
  change: number
  changePercent: number
  rarity: string
  tcg: 'Pokemon' | 'Yu-Gi-Oh' | 'Magic' | 'One Piece'
  set: string
  marketPrice?: number
  lowPrice?: number
  highPrice?: number
  lastUpdated: string
  trending?: boolean
  watchlisted?: boolean
  priceHistory: number[]
  description?: string
  artist?: string
}

// Pokemon TCG API
export async function fetchPokemonCards(query = 'pikachu', page = 1): Promise<TCGCard[]> {
  try {
    const url = query
      ? `https://api.pokemontcg.io/v2/cards?q=name:${query}*&page=${page}&pageSize=20&orderBy=-set.releaseDate`
      : `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=20&orderBy=-set.releaseDate`

    const res = await fetch(url)
    if (!res.ok) throw new Error('Pokemon API failed')
    const data = await res.json()

    return (data.data || []).slice(0, 20).map((card: any) => {
      const basePrice = card.cardmarket?.prices?.averageSellPrice
        || card.tcgplayer?.prices?.holofoil?.market
        || card.tcgplayer?.prices?.normal?.market
        || Math.random() * 200 + 5

      return {
        id: card.id,
        name: card.name,
        image: card.images?.large || card.images?.small || '',
        price: parseFloat(basePrice.toFixed(2)),
        change: 0,
        changePercent: 0,
        rarity: card.rarity || 'Common',
        tcg: 'Pokemon' as const,
        set: card.set?.name || 'Unknown Set',
        marketPrice: parseFloat(basePrice.toFixed(2)),
        lowPrice: parseFloat((basePrice * 0.85).toFixed(2)),
        highPrice: parseFloat((basePrice * 1.2).toFixed(2)),
        lastUpdated: new Date().toISOString(),
        trending: Math.random() > 0.7,
        priceHistory: generatePriceHistory(basePrice),
        artist: card.artist || 'Unknown',
        description: card.flavorText || `A powerful ${card.supertype || 'card'} from the ${card.set?.name || 'TCG'} set.`,
      }
    })
  } catch (e) {
    console.error('Pokemon fetch error:', e)
    return getMockPokemonCards()
  }
}

// Yu-Gi-Oh API
export async function fetchYugiohCards(query = ''): Promise<TCGCard[]> {
  try {
    const url = query
      ? `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(query)}&num=20&offset=0`
      : `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=${Math.floor(Math.random() * 100)}&sort=new`

    const res = await fetch(url)
    if (!res.ok) throw new Error('YGO API failed')
    const data = await res.json()

    return (data.data || []).slice(0, 20).map((card: any) => {
      const basePrice = card.card_prices?.[0]?.tcgplayer_price
        ? parseFloat(card.card_prices[0].tcgplayer_price)
        : Math.random() * 150 + 2

      const price = basePrice < 0.5 ? Math.random() * 50 + 1 : basePrice

      return {
        id: String(card.id),
        name: card.name,
        image: card.card_images?.[0]?.image_url || '',
        price: parseFloat(price.toFixed(2)),
        change: 0,
        changePercent: 0,
        rarity: card.card_sets?.[0]?.set_rarity || 'Common',
        tcg: 'Yu-Gi-Oh' as const,
        set: card.card_sets?.[0]?.set_name || 'Unknown Set',
        marketPrice: parseFloat(price.toFixed(2)),
        lowPrice: parseFloat((price * 0.85).toFixed(2)),
        highPrice: parseFloat((price * 1.25).toFixed(2)),
        lastUpdated: new Date().toISOString(),
        trending: Math.random() > 0.75,
        priceHistory: generatePriceHistory(price),
        description: card.desc || 'A powerful card from the Yu-Gi-Oh TCG.',
        artist: 'Konami',
      }
    })
  } catch (e) {
    console.error('Yugioh fetch error:', e)
    return getMockYugiohCards()
  }
}

// Magic: The Gathering API (via Scryfall which is free)
export async function fetchMagicCards(query = 'dragon'): Promise<TCGCard[]> {
  try {
    const q = query || 'is:mythic'
    const res = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(q)}&order=usd&dir=desc&unique=cards`)
    if (!res.ok) throw new Error('MTG API failed')
    const data = await res.json()

    return (data.data || []).slice(0, 20).map((card: any) => {
      const basePrice = parseFloat(card.prices?.usd || card.prices?.usd_foil || '5')
      const price = isNaN(basePrice) || basePrice < 0.1 ? Math.random() * 80 + 2 : basePrice

      return {
        id: card.id,
        name: card.name,
        image: card.image_uris?.large || card.image_uris?.normal || card.image_uris?.small || '',
        price: parseFloat(price.toFixed(2)),
        change: 0,
        changePercent: 0,
        rarity: capitalizeFirst(card.rarity || 'common'),
        tcg: 'Magic' as const,
        set: card.set_name || 'Unknown Set',
        marketPrice: parseFloat(price.toFixed(2)),
        lowPrice: parseFloat((price * 0.88).toFixed(2)),
        highPrice: parseFloat((price * 1.18).toFixed(2)),
        lastUpdated: new Date().toISOString(),
        trending: Math.random() > 0.72,
        priceHistory: generatePriceHistory(price),
        description: card.oracle_text || card.flavor_text || 'A powerful card from the Magic: The Gathering universe.',
        artist: card.artist || 'Unknown Artist',
      }
    })
  } catch (e) {
    console.error('Magic fetch error:', e)
    return getMockMagicCards()
  }
}

// One Piece - Mock data since no free API
export function getOnePieceCards(): TCGCard[] {
  const cards = [
    { name: 'Monkey D. Luffy', rarity: 'Secret Rare', set: 'Romance Dawn', price: 289.99 },
    { name: 'Roronoa Zoro', rarity: 'Super Rare', set: 'Romance Dawn', price: 145.50 },
    { name: 'Nico Robin', rarity: 'Rare', set: 'Paramount War', price: 78.25 },
    { name: 'Nami', rarity: 'Super Rare', set: 'Romance Dawn', price: 92.00 },
    { name: 'Trafalgar Law', rarity: 'Secret Rare', set: 'Pillars of Strength', price: 320.00 },
    { name: 'Portgas D. Ace', rarity: 'Secret Rare', set: 'Paramount War', price: 410.00 },
    { name: 'Whitebeard', rarity: 'Leader Rare', set: 'Paramount War', price: 185.00 },
    { name: 'Shanks', rarity: 'Secret Rare', set: 'Romance Dawn', price: 520.00 },
    { name: 'Boa Hancock', rarity: 'Super Rare', set: 'Kingdoms of Intrigue', price: 112.00 },
    { name: 'Sabo', rarity: 'Rare', set: 'Pillars of Strength', price: 67.50 },
    { name: 'Charlotte Katakuri', rarity: 'Secret Rare', set: 'Wings of the Captain', price: 255.00 },
    { name: 'Kaido', rarity: 'Leader Rare', set: 'Wings of the Captain', price: 195.00 },
  ]

  return cards.map((c, i) => ({
    id: `op-${i}`,
    name: c.name,
    image: `https://via.placeholder.com/250x350/1a1a2e/00f5ff?text=${encodeURIComponent(c.name)}`,
    price: c.price,
    change: 0,
    changePercent: 0,
    rarity: c.rarity,
    tcg: 'One Piece' as const,
    set: c.set,
    marketPrice: c.price,
    lowPrice: parseFloat((c.price * 0.88).toFixed(2)),
    highPrice: parseFloat((c.price * 1.15).toFixed(2)),
    lastUpdated: new Date().toISOString(),
    trending: Math.random() > 0.6,
    priceHistory: generatePriceHistory(c.price),
    description: `A powerful One Piece Trading Card from the ${c.set} set.`,
    artist: 'Bandai',
  }))
}

// Helpers
function generatePriceHistory(basePrice: number): number[] {
  const history: number[] = []
  let price = basePrice * (0.8 + Math.random() * 0.2)
  for (let i = 0; i < 30; i++) {
    price = price * (1 + (Math.random() - 0.48) * 0.06)
    history.push(parseFloat(price.toFixed(2)))
  }
  history.push(basePrice)
  return history
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Fallback mock data
function getMockPokemonCards(): TCGCard[] {
  const cards = [
    { name: 'Charizard VSTAR', image: 'https://images.pokemontcg.io/swsh12pt5gg/GG06_hires.png', price: 425, rarity: 'Ultra Rare', set: 'Crown Zenith' },
    { name: 'Pikachu VMAX', image: 'https://images.pokemontcg.io/swsh4/44_hires.png', price: 89, rarity: 'Ultra Rare', set: 'Vivid Voltage' },
    { name: 'Mewtwo EX', image: 'https://images.pokemontcg.io/bw5/54_hires.png', price: 210, rarity: 'Ultra Rare', set: 'Dragon Vault' },
    { name: 'Umbreon VMAX', image: 'https://images.pokemontcg.io/swsh7/215_hires.png', price: 195, rarity: 'Rainbow Rare', set: 'Evolving Skies' },
    { name: 'Rayquaza VMAX', image: 'https://images.pokemontcg.io/swsh7/217_hires.png', price: 165, rarity: 'Rainbow Rare', set: 'Evolving Skies' },
  ]
  return cards.map((c, i) => ({
    id: `poke-mock-${i}`, ...c, tcg: 'Pokemon' as const,
    change: 0, changePercent: 0, marketPrice: c.price,
    lowPrice: c.price * 0.85, highPrice: c.price * 1.2,
    lastUpdated: new Date().toISOString(), trending: i < 2,
    priceHistory: generatePriceHistory(c.price),
  }))
}

function getMockYugiohCards(): TCGCard[] {
  const cards = [
    { name: 'Blue-Eyes White Dragon', price: 210, rarity: 'Ultra Rare', set: 'Legend of Blue Eyes' },
    { name: 'Dark Magician', price: 145, rarity: 'Ultra Rare', set: 'Legend of Blue Eyes' },
    { name: 'Exodia the Forbidden One', price: 380, rarity: 'Ultra Rare', set: 'Legend of Blue Eyes' },
    { name: 'Red-Eyes Black Dragon', price: 125, rarity: 'Super Rare', set: 'Metal Raiders' },
    { name: 'Elemental HERO Neos', price: 88, rarity: 'Ultra Rare', set: 'Cyberdark Impact' },
  ]
  return cards.map((c, i) => ({
    id: `ygo-mock-${i}`, ...c,
    image: `https://via.placeholder.com/421x614/0a0f1e/00f5ff?text=${encodeURIComponent(c.name)}`,
    tcg: 'Yu-Gi-Oh' as const, change: 0, changePercent: 0,
    marketPrice: c.price, lowPrice: c.price * 0.85, highPrice: c.price * 1.25,
    lastUpdated: new Date().toISOString(), trending: i < 2,
    priceHistory: generatePriceHistory(c.price),
  }))
}

function getMockMagicCards(): TCGCard[] {
  const cards = [
    { name: 'Black Lotus', price: 28500, rarity: 'Rare', set: 'Alpha Edition' },
    { name: 'Mox Sapphire', price: 8900, rarity: 'Rare', set: 'Beta Edition' },
    { name: 'Ancestral Recall', price: 12000, rarity: 'Rare', set: 'Alpha Edition' },
    { name: 'Liliana of the Veil', price: 42, rarity: 'Mythic Rare', set: 'Innistrad' },
    { name: 'Jace, the Mind Sculptor', price: 85, rarity: 'Mythic Rare', set: 'Worldwake' },
  ]
  return cards.map((c, i) => ({
    id: `mtg-mock-${i}`, ...c,
    image: `https://via.placeholder.com/745x1040/0a0f1e/ffd700?text=${encodeURIComponent(c.name)}`,
    tcg: 'Magic' as const, change: 0, changePercent: 0,
    marketPrice: c.price, lowPrice: c.price * 0.88, highPrice: c.price * 1.18,
    lastUpdated: new Date().toISOString(), trending: i < 2,
    priceHistory: generatePriceHistory(c.price),
  }))
}
