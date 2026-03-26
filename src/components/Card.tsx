import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Card as CardType } from '../types';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface CardProps {
    card: CardType;
    onClick: (card: CardType) => void;
    priceFlash?: 'up' | 'down' | null;
}

const Card: React.FC<CardProps> = ({ card, onClick, priceFlash }) => {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [20, -20]);
    const rotateY = useTransform(x, [-100, 100], [-20, 20]);

    const getPriceColor = () => {
        if (priceFlash === 'up') return 'text-green-500 dark:text-green-400';
        if (priceFlash === 'down') return 'text-red-500 dark:text-red-400';
        return card.priceChange >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400';
    };

    return (
        <motion.div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                x.set(mouseX - centerX);
                y.set(mouseY - centerY);
            }}
            onClick={() => onClick(card)}
            style={{
                perspective: 1000,
            }}
        >
            <motion.div
                className="bg-white dark:bg-white/5 rounded-xl overflow-hidden shadow-lg dark:shadow-purple-500/10"
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    transition: 'all 0.3s ease',
                }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
                }}
            >
                <div className="relative">
                    <img
                        src={card.image || `https://via.placeholder.com/300x400?text=${card.name}`}
                        alt={card.name}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x400?text=${card.name}`;
                        }}
                    />
                    <div className="absolute top-2 right-2">
                        <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-700 dark:text-white">
                            {card.rarity}
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate">{card.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{card.set}</p>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                            <motion.span
                                key={card.price}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                className={`font-bold text-lg ${getPriceColor()}`}
                            >
                                ${card.price.toFixed(2)}
                            </motion.span>
                        </div>

                        <div className={`flex items-center gap-1 text-sm ${card.priceChange >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                            {card.priceChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span>{Math.abs(card.priceChange).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Card;