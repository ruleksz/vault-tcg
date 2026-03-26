import { useQuery } from '@tanstack/react-query';
import { fetchYugiohCards } from '../utils/api';

export const useYugiohCards = () => {
    return useQuery({
        queryKey: ['yugioh-cards'],
        queryFn: fetchYugiohCards,
        staleTime: 30000,
    });
};