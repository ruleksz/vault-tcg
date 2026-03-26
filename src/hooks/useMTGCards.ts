import { useQuery } from '@tanstack/react-query';
import { fetchMTGCards } from '../utils/api';

export const useMTGCards = () => {
    return useQuery({
        queryKey: ['mtg-cards'],
        queryFn: fetchMTGCards,
        staleTime: 30000,
    });
};