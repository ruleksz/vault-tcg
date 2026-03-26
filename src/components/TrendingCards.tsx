import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { Card as CardType } from '../types';
import { useRealtimePrice } from '../hooks/useRealtimePrice';

interface TrendingCardsProps {
    cards: CardType[];
    onCardClick: (card: CardType) => void;
}

const TrendingCards: React.FC<TrendingCardsProps> = ({ cards, onCardClick }) => {
    const [trendingCards, setTrendingCards] = useState<CardType[]>([]);

    useEffect(() => {
        // Get top 6 cards with highest price change
        const sorted = [...cards].sort((a, b) => Math.abs(b.priceChange) - Math.abs(a.priceChange));
        setTrendingCards(sorted.slice(0, 6));
    }, [cards]);

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                🔥 Trending Cards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingCards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card card={card} onClick={onCardClick} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TrendingCards;