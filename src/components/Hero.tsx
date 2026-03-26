import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Zap } from "lucide-react";

const Hero: React.FC = () => {
    const [tickerPrices, setTickerPrices] = useState([
        { name: "Pikachu", price: 125.5, change: "+5.2%" },
        { name: "Blue-Eyes", price: 89.99, change: "+2.1%" },
        { name: "Black Lotus", price: 45000, change: "+15.3%" },
        { name: "Luffy", price: 45.99, change: "+8.7%" },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTickerPrices((prev) =>
                prev.map((item) => ({
                    ...item,
                    price: item.price * (1 + (Math.random() - 0.5) * 0.02),
                    change: `${((Math.random() - 0.5) * 10).toFixed(1)}%`,
                })),
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-purple-900/20 via-black to-black">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent" />
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-purple-500/20 rounded-full"
                        style={{
                            width: Math.random() * 300 + 50,
                            height: Math.random() * 300 + 50,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                        Realtime TCG Price Tracker
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Track live prices for Pokemon, Yu-Gi-Oh, Magic: The Gathering, and
                        One Piece cards with real-time updates and market insights
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white shadow-lg hover:shadow-purple-500/50 transition-shadow"
                        >
                            Start Tracking
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-white border border-white/20 hover:bg-white/20 transition-all"
                        >
                            View Trends
                        </motion.button>
                    </div>

                    {/* Live Ticker */}
                    <div className="glass rounded-xl p-4 max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                            <span className="text-sm font-semibold text-gray-400">
                                LIVE PRICE TICKER
                            </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {tickerPrices.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-left"
                                >
                                    <p className="text-sm text-gray-400">{item.name}</p>
                                    <p className="text-xl font-bold text-white">
                                        ${item.price.toFixed(2)}
                                    </p>
                                    <p
                                        className={`text-sm ${item.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                                    >
                                        {item.change}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Floating cards animation */}
            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-8 opacity-30">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-20 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4,
                            delay: i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
