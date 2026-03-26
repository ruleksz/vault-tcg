import { useQuery } from '@tanstack/react-query';
import { fetchPokemonCards } from '../utils/api';

export const usePokemonCards = () => {
    return useQuery({
        queryKey: ['pokemon-cards'],
        queryFn: fetchPokemonCards,
        staleTime: 30000,
    });
};