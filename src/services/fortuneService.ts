import axiosInstance from '@/lib/AxiosInstance';
import type { FortuneRequest, FortuneResponse } from '@/types/fortune.types';

export const fortuneService = {
  async getFortune(request: FortuneRequest): Promise<string> {
    try {
      const response = await axiosInstance.post<FortuneResponse>('/fortunes', request);
      return response.data.data.imageUrl;
    } catch (error) {
      console.error('Failed to fetch fortune:', error);
      throw error;
    }
  },
};
