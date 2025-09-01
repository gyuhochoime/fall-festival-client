import { useState, useEffect } from 'react';
import { boothService } from '@/services/boothService';
import type { Booth } from '@/types/booth.types';

export const useBooths = () => {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await boothService.getAllBooths();
        setBooths(data);
      } catch (err) {
        setError('주점 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching booths:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooths();
  }, []);

  const refetch = async () => {
    const fetchBooths = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await boothService.getAllBooths();
        setBooths(data);
      } catch (err) {
        setError('주점 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching booths:', err);
      } finally {
        setLoading(false);
      }
    };

    await fetchBooths();
  };

  return { booths, loading, error, refetch };
};

export const useBooth = (id: number) => {
  const [booth, setBooth] = useState<Booth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooth = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await boothService.getBoothById(id);
        setBooth(data);
      } catch (err) {
        setError('주점 정보를 불러오는데 실패했습니다.');
        console.error(`Error fetching booth ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooth();
  }, [id]);

  return { booth, loading, error };
};
