import axios from 'axios';
import { Card } from '../types';

const POKEMON_API = 'https://api.pokemontcg.io/v2';
const YUGIOH_API = 'https://db.ygoprodeck.com/api/v7';
const MTG_API = 'https://api.magicthegathering.io/v1';

export const fetchPokemonCards = async (): Promise<Card[]> => {
    try {
        const response = await axios.get(`${POKEMON_API}/cards`, {
            params: {
                pageSize: 20,
                orderBy: '-set.releaseDate',
            },
        });

        return response.data.data.map((card: any) => ({
            id: card.id,
            name: card.name,
            image: card.images?.small || card.images?.large || '',
            set: card.set?.name || 'Unknown',
            rarity: card.rarity || 'Common',
            price: card.tcgplayer?.prices?.normal?.market || Math.random() * 50 + 5,
            priceChange: (Math.random() - 0.5) * 10,
            type: 'pokemon',
            marketPrice: card.tcgplayer?.prices?.normal?.market,
            lowPrice: card.tcgplayer?.prices?.normal?.low,
            highPrice: card.tcgplayer?.prices?.normal?.high,
        }));
    } catch (error) {
        console.error('Error fetching Pokemon cards:', error);
        return [];
    }
};

export const fetchYugiohCards = async (): Promise<Card[]> => {
    try {
        const response = await axios.get(`${YUGIOH_API}/cardinfo.php`, {
            params: {
                num: 20,
                offset: 0,
            },
        });

        return response.data.data.slice(0, 20).map((card: any) => ({
            id: card.id.toString(),
            name: card.name,
            image: card.card_images?.[0]?.image_url || '',
            set: card.card_sets?.[0]?.set_name || 'Unknown',
            rarity: card.card_sets?.[0]?.set_rarity || 'Common',
            price: card.card_prices?.[0]?.market_price || Math.random() * 40 + 3,
            priceChange: (Math.random() - 0.5) * 8,
            type: 'yugioh',
            marketPrice: parseFloat(card.card_prices?.[0]?.market_price) || 0,
            lowPrice: parseFloat(card.card_prices?.[0]?.low_price) || 0,
            highPrice: parseFloat(card.card_prices?.[0]?.high_price) || 0,
        }));
    } catch (error) {
        console.error('Error fetching Yu-Gi-Oh cards:', error);
        return [];
    }
};

export const fetchMTGCards = async (): Promise<Card[]> => {
    try {
        const response = await axios.get(`${MTG_API}/cards`, {
            params: {
                pageSize: 20,
            },
        });

        return response.data.cards.slice(0, 20).map((card: any) => ({
            id: card.id,
            name: card.name,
            image: card.imageUrl || '',
            set: card.setName || 'Unknown',
            rarity: card.rarity || 'Common',
            price: Math.random() * 60 + 2,
            priceChange: (Math.random() - 0.5) * 12,
            type: 'mtg',
            marketPrice: Math.random() * 60 + 2,
            lowPrice: Math.random() * 30 + 1,
            highPrice: Math.random() * 80 + 5,
        }));
    } catch (error) {
        console.error('Error fetching MTG cards:', error);
        return [];
    }
};

export const fetchOnePieceMockCards = (): Card[] => {
    const mockCards = [
        { name: 'Monkey D. Luffy', set: 'OP-01', rarity: 'Secret Rare', price: 45.99 },
        { name: 'Roronoa Zoro', set: 'OP-01', rarity: 'Super Rare', price: 28.50 },
        { name: 'Nami', set: 'OP-02', rarity: 'Rare', price: 12.75 },
        { name: 'Sanji', set: 'OP-02', rarity: 'Super Rare', price: 22.30 },
        { name: 'Tony Tony Chopper', set: 'OP-01', rarity: 'Rare', price: 15.20 },
        { name: 'Nico Robin', set: 'OP-03', rarity: 'Super Rare', price: 32.80 },
        { name: 'Franky', set: 'OP-03', rarity: 'Rare', price: 18.45 },
        { name: 'Brook', set: 'OP-04', rarity: 'Rare', price: 14.90 },
        { name: 'Jinbe', set: 'OP-04', rarity: 'Super Rare', price: 26.60 },
        { name: 'Shanks', set: 'OP-01', rarity: 'Secret Rare', price: 89.99 },
    ];

    return mockCards.map((card, index) => ({
        id: `op-${index}`,
        name: card.name,
        image: `https://picsum.photos/id/${200 + index}/300/400`,
        set: card.set,
        rarity: card.rarity,
        price: card.price,
        priceChange: (Math.random() - 0.5) * 15,
        type: 'onepiece',
        marketPrice: card.price,
        lowPrice: card.price * 0.8,
        highPrice: card.price * 1.2,
    }));
};

export const simulatePriceUpdate = (card: Card): Card => {
    const changePercent = (Math.random() - 0.5) * 0.1;
    const newPrice = Math.max(0.01, card.price * (1 + changePercent));
    const priceChange = ((newPrice - card.price) / card.price) * 100;

    return {
        ...card,
        previousPrice: card.price,
        price: newPrice,
        priceChange: priceChange,
    };
};