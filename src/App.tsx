import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Hero from './components/Hero';
import Card from './components/Card';
import CardModal from './components/CardModal';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import TrendingCards from './components/TrendingCards';
import { usePokemonCards } from './hooks/usePokemonCards';
import { useYugiohCards } from './hooks/useYugiohCards';
import { useMTGCards } from './hooks/useMTGCards';
import { useRealtimePrice } from './hooks/useRealtimePrice';
import { Card as CardType, FilterOptions, TabType } from './types';
import { fetchOnePieceMockCards, simulatePriceUpdate } from './utils/api';
import { Loader2 } from 'lucide-react';

const tabs: TabType[] = [
    { id: 'pokemon', label: 'Pokémon', icon: '⚡' },
    { id: 'yugioh', label: 'Yu-Gi-Oh!', icon: '✨' },
    { id: 'mtg', label: 'Magic: The Gathering', icon: '🔮' },
    { id: 'onepiece', label: 'One Piece', icon: '🏴‍☠️' },
];

function App() {
    const [activeTab, setActiveTab] = useState<TabType['id']>('pokemon');
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
    const [filters, setFilters] = useState<FilterOptions>({
        search: '',
        rarity: '',
        minPrice: 0,
        maxPrice: Infinity,
        cardType: '',
    });
    const [realTimeCards, setRealTimeCards] = useState<CardType[]>([]);

    // Fetch data for each tab
    const { data: pokemonCards, isLoading: pokemonLoading } = usePokemonCards();
    const { data: yugiohCards, isLoading: yugiohLoading } = useYugiohCards();
    const { data: mtgCards, isLoading: mtgLoading } = useMTGCards();
    const [onePieceCards, setOnePieceCards] = useState<CardType[]>([]);

    useEffect(() => {
        setOnePieceCards(fetchOnePieceMockCards());
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setOnePieceCards(prev => prev.map(card => simulatePriceUpdate(card)));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getCurrentCards = (): CardType[] => {
        switch (activeTab) {
            case 'pokemon':
                return pokemonCards || [];
            case 'yugioh':
                return yugiohCards || [];
            case 'mtg':
                return mtgCards || [];
            case 'onepiece':
                return onePieceCards;
            default:
                return [];
        }
    };

    const isLoading = () => {
        switch (activeTab) {
            case 'pokemon':
                return pokemonLoading;
            case 'yugioh':
                return yugiohLoading;
            case 'mtg':
                return mtgLoading;
            default:
                return false;
        }
    };

    const filteredCards = useMemo(() => {
        const cards = getCurrentCards();
        return cards.filter(card => {
            const matchesSearch = card.name.toLowerCase().includes(filters.search.toLowerCase());
            const matchesRarity = !filters.rarity || card.rarity === filters.rarity;
            const matchesPrice = card.price >= filters.minPrice && card.price <= filters.maxPrice;
            return matchesSearch && matchesRarity && matchesPrice;
        });
    }, [activeTab, filters, pokemonCards, yugiohCards, mtgCards, onePieceCards]);

    const handleCardClick = (card: CardType) => {
        setSelectedCard(card);
    };

    const handleCloseModal = () => {
        setSelectedCard(null);
    };

    // Get price history for selected card
    const getPriceHistoryForCard = () => {
        if (!selectedCard) return [];
        // Simulate price history for the card
        const history = [];
        for (let i = 20; i >= 0; i--) {
            history.push({
                timestamp: Date.now() - i * 3000,
                price: selectedCard.price * (1 + (Math.random() - 0.5) * 0.1),
            });
        }
        return history;
    };

    return (
        <div className="min-h-screen bg-black">
            <Hero />

            <div className="container mx-auto px-4 py-12">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                    : 'glass text-gray-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search and Filters */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex-1 min-w-[200px]">
                        <SearchBar value={filters.search} onChange={(value) => setFilters({ ...filters, search: value })} />
                    </div>
                    <Filters filters={filters} onFilterChange={setFilters} />
                </div>

                {/* Cards Grid */}
                {isLoading() ? (
                    <div className="flex items-center justify-center h-96">
                        <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredCards.map((card) => (
                                <Card key={card.id} card={card} onClick={handleCardClick} />
                            ))}
                        </div>

                        {filteredCards.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-400 text-lg">No cards found matching your criteria</p>
                            </div>
                        )}
                    </>
                )}

                {/* Trending Cards Section */}
                {getCurrentCards().length > 0 && (
                    <TrendingCards cards={getCurrentCards()} onCardClick={handleCardClick} />
                )}
            </div>

            {/* Card Modal */}
            <CardModal
                card={selectedCard}
                isOpen={!!selectedCard}
                onClose={handleCloseModal}
                priceHistory={getPriceHistoryForCard()}
            />
        </div>
    );
}

export default App;