export interface Card {
    id: string;
    name: string;
    image: string;
    set: string;
    rarity: string;
    price: number;
    previousPrice?: number;
    priceChange: number;
    type: 'pokemon' | 'yugioh' | 'mtg' | 'onepiece';
    marketPrice?: number;
    lowPrice?: number;
    highPrice?: number;
}

export interface PriceHistory {
    timestamp: number;
    price: number;
}

export interface FilterOptions {
    search: string;
    rarity: string;
    minPrice: number;
    maxPrice: number;
    cardType: string;
}

export interface TabType {
    id: 'pokemon' | 'yugioh' | 'mtg' | 'onepiece';
    label: string;
    icon: string;
}