import { useState } from 'react';
import { fortuneService } from '@/services/fortuneService';
import type { FortuneRequest } from '@/types/fortune.types';

export const useFortune = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFortune = async (request: FortuneRequest): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const imageUrl = await fortuneService.getFortune(request);
      return imageUrl;
    } catch (err) {
      setError('운세를 불러오는데 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getFortune, loading, error };
};
