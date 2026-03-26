import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card } from '../types';
import PriceChart from './PriceChart';

interface CardModalProps {
    card: Card | null;
    isOpen: boolean;
    onClose: () => void;
    priceHistory: any[];
}

const CardModal: React.FC<CardModalProps> = ({ card, isOpen, onClose, priceHistory }) => {
    if (!card) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 glass border-b border-white/10 p-4 flex justify-between items-center">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                    {card.name}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <img
                                            src={card.image}
                                            alt={card.name}
                                            className="w-full rounded-xl shadow-2xl"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x500?text=${card.name}`;
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-gray-400 mb-2">Card Details</h3>
                                            <div className="space-y-2">
                                                <p><span className="text-gray-400">Set:</span> {card.set}</p>
                                                <p><span className="text-gray-400">Rarity:</span> {card.rarity}</p>
                                                <p><span className="text-gray-400">Type:</span> {card.type.toUpperCase()}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-gray-400 mb-2">Price Information</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="glass rounded-lg p-3">
                                                    <p className="text-sm text-gray-400">Market Price</p>
                                                    <p className="text-2xl font-bold text-purple-400">
                                                        ${card.marketPrice?.toFixed(2) || card.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="glass rounded-lg p-3">
                                                    <p className="text-sm text-gray-400">24h Change</p>
                                                    <p className={`text-2xl font-bold ${card.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                        {card.priceChange >= 0 ? '+' : ''}{card.priceChange.toFixed(2)}%
                                                    </p>
                                                </div>
                                                <div className="glass rounded-lg p-3">
                                                    <p className="text-sm text-gray-400">Low Price</p>
                                                    <p className="text-xl font-bold">${card.lowPrice?.toFixed(2) || (card.price * 0.8).toFixed(2)}</p>
                                                </div>
                                                <div className="glass rounded-lg p-3">
                                                    <p className="text-sm text-gray-400">High Price</p>
                                                    <p className="text-xl font-bold">${card.highPrice?.toFixed(2) || (card.price * 1.2).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {priceHistory.length > 0 && (
                                            <div>
                                                <h3 className="text-gray-400 mb-2">Price History</h3>
                                                <PriceChart data={priceHistory} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CardModal;