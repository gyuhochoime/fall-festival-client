import axiosInstance from '@/lib/AxiosInstance';
import { EventCardData } from '@/types/eventCardData.type';

// API 응답 타입 정의
export interface EventItem {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  place: string;
  period: string;
  noticeId: number | null;
}

interface EventListResponse {
  status: string;
  data: EventItem[];
  message: string;
}

/**
 * 현재 진행 중인 이벤트 목록을 가져오는 API 함수
 * @returns {Promise<EventItem[]>} 이벤트 목록
 */
export const fetchCurrentEvents = async (): Promise<EventItem[]> => {
  try {
    const response = await axiosInstance.get<EventListResponse>(`/api/events`);
    return response.data.data;
  } catch (error: unknown) {
    // 타입스크립트를 위한 타입 가드
    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'data' in error.response &&
      error.response.data &&
      typeof error.response.data === 'object' &&
      'code' in error.response.data &&
      error.response.data.code === 'E404007'
    ) {
      // 이벤트가 없는 경우는 빈 배열 반환
      return [];
    }
    console.error('현재 진행 중인 이벤트 목록을 가져오는데 실패했습니다:', error);
    throw error;
  }
};

/**
 * API에서 가져온 이벤트 데이터를 EventCardData 형식으로 변환
 * @param {EventItem[]} events - API에서 가져온 이벤트 목록
 * @returns {EventCardData[]} 이벤트 카드 데이터 목록
 */
export const convertToEventCardData = (events: EventItem[]): EventCardData[] => {
  return events.map((event) => {
    // 시간 형식 변환 (예: "2025-08-29T17:00:48" -> "17:00")
    const startDateTime = new Date(event.startTime);
    const endDateTime = new Date(event.endTime);

    const startTimeFormatted = startDateTime.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const endTimeFormatted = endDateTime.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return {
      id: event.id.toString(),
      title: event.title,
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
      location: event.place,
      date: event.period,
      noticeId: event.noticeId, // 공지사항 ID 추가
    };
  });
};
