import React from 'react';
import { FilterOptions } from '../types';

interface FiltersProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
    const rarities = ['All', 'Common', 'Rare', 'Super Rare', 'Secret Rare', 'Ultra Rare'];

    return (
        <div className="flex flex-wrap gap-4 items-center">
            <select
                value={filters.rarity}
                onChange={(e) => onFilterChange({ ...filters, rarity: e.target.value })}
                className="px-3 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
                {rarities.map((rarity) => (
                    <option key={rarity} value={rarity === 'All' ? '' : rarity}>
                        {rarity}
                    </option>
                ))}
            </select>

            <div className="flex items-center gap-2">
                <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice || ''}
                    onChange={(e) => onFilterChange({ ...filters, minPrice: parseFloat(e.target.value) || 0 })}
                    className="w-28 px-3 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-gray-400">-</span>
                <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice || ''}
                    onChange={(e) => onFilterChange({ ...filters, maxPrice: parseFloat(e.target.value) || Infinity })}
                    className="w-28 px-3 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
        </div>
    );
};

export default Filters;