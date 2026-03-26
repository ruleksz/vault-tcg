import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp,
    Bell,
    Menu,
    X,
    User,
    Sun,
    Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();

    const navItems = [
        { id: 'pokemon', label: 'Pokémon', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
        { id: 'yugioh', label: 'Yu-Gi-Oh!', icon: '✨', color: 'from-purple-500 to-pink-500' },
        { id: 'mtg', label: 'MTG', icon: '🔮', color: 'from-blue-500 to-cyan-500' },
        { id: 'onepiece', label: 'One Piece', icon: '🏴‍☠️', color: 'from-red-500 to-orange-500' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg dark:shadow-purple-500/10 border-b border-gray-200 dark:border-white/10'
                        : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50 animate-pulse" />
                                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-2">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                                    TCG Tracker
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                                    Live Prices • Real-time Updates
                                </p>
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onTabChange(item.id)}
                                    className={`relative px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === item.id
                                            ? 'text-gray-900 dark:text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    {activeTab === item.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-lg opacity-10 dark:opacity-20`}
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                            >
                                <Bell className="w-5 h-5 text-gray-700 dark:text-white" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                            >
                                {isDarkMode ? (
                                    <Sun className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-700" />
                                )}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-purple-500/50 transition-shadow"
                            >
                                <User className="w-4 h-4" />
                                <span>Sign In</span>
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-white/10"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Live Price Ticker */}
                <div className="border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-black/50 backdrop-blur-sm">
                    <div className="container mx-auto px-4">
                        <LivePriceTicker />
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 z-40 md:hidden shadow-2xl"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-2">
                                        <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">TCG Tracker</h2>
                                </div>

                                <div className="space-y-2">
                                    {navItems.map((item) => (
                                        <motion.button
                                            key={item.id}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                onTabChange(item.id);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                                                    ? `bg-gradient-to-r ${item.color} text-white`
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
                                                }`}
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="text-xl">{item.icon}</span>
                                                <span>{item.label}</span>
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                                        <Bell className="w-4 h-4" />
                                        <span>Notifications</span>
                                    </button>
                                    <button
                                        onClick={toggleTheme}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                                    >
                                        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                        <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                                    </button>
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white">
                                        <User className="w-4 h-4" />
                                        <span>Sign In</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

// Live Price Ticker Component
const LivePriceTicker: React.FC = () => {
    const [prices, setPrices] = useState([
        { name: 'Pikachu', price: 125.50, change: '+5.2%', up: true },
        { name: 'Charizard', price: 450.00, change: '+12.3%', up: true },
        { name: 'Blue-Eyes', price: 89.99, change: '-2.1%', up: false },
        { name: 'Dark Magician', price: 67.50, change: '+3.8%', up: true },
        { name: 'Black Lotus', price: 45000, change: '+15.3%', up: true },
        { name: 'Luffy', price: 45.99, change: '+8.7%', up: true },
        { name: 'Zoro', price: 28.50, change: '-1.2%', up: false },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => prev.map(item => {
                const change = (Math.random() - 0.5) * 10;
                const newPrice = Math.max(0.01, item.price * (1 + change / 100));
                return {
                    ...item,
                    price: newPrice,
                    change: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`,
                    up: change > 0,
                };
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden py-2">
            <div className="flex animate-scroll whitespace-nowrap">
                {[...prices, ...prices].map((item, index) => (
                    <div
                        key={index}
                        className="inline-flex items-center gap-3 mx-4 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10"
                    >
                        <span className="text-sm font-semibold text-gray-700 dark:text-white">{item.name}</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">${item.price.toFixed(2)}</span>
                        <span className={`text-xs ${item.up ? 'text-green-500' : 'text-red-500'}`}>
                            {item.change}
                        </span>
                        {item.up ? (
                            <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                            <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
                        )}
                    </div>
                ))}
            </div>

            {/* Gradient overlays for smooth scrolling effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />
        </div>
    );
};

export default Navbar;