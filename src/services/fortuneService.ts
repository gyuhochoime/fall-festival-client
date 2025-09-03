import axiosInstance from '@/lib/AxiosInstance';
import type { FortuneRequest, FortuneResponse } from '@/types/fortune.types';

export const fortuneService = {
  async getFortune(request: FortuneRequest): Promise<string> {
    const response = await axiosInstance.post<FortuneResponse>('/api/fortunes', request);
    return response.data.data.imageUrl;
  },
};
