import { useState, useEffect } from 'react';
import { Card, PriceHistory } from '../types';
import { simulatePriceUpdate } from '../utils/api';

export const useRealtimePrice = (initialCard: Card) => {
    const [card, setCard] = useState<Card>(initialCard);
    const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
    const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedCard = simulatePriceUpdate(card);

            // Track price change direction for flash effect
            if (updatedCard.price > card.price) {
                setPriceFlash('up');
            } else if (updatedCard.price < card.price) {
                setPriceFlash('down');
            }

            setCard(updatedCard);

            // Update price history
            setPriceHistory(prev => [...prev, {
                timestamp: Date.now(),
                price: updatedCard.price,
            }].slice(-20));

            // Clear flash after 300ms
            setTimeout(() => setPriceFlash(null), 300);
        }, 3000);

        return () => clearInterval(interval);
    }, [card]);

    return { card, priceHistory, priceFlash };
};