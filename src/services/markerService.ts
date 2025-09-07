import axiosInstance from '@/lib/AxiosInstance';

// API 응답 타입 정의
export interface ApiMarkerItem {
  id: number;
  category: string;
  image: string;
  name: string;
  latitude: number;
  longitude: number;
  time: string;
  closedDays: string[];
  linkType: string;
  linkId: number | null;
}

export interface ApiResponse {
  status: string;
  data: ApiMarkerItem[];
  message: string;
}

export const markerService = {
  // 모든 마커 정보 가져오기
  async getMarkers(): Promise<ApiResponse> {
    const response = await axiosInstance.get('/api/markers');
    return response.data;
  },
};
