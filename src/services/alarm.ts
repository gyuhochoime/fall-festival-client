import { axiosInstance } from '@/lib';

export const sendToken = async (token: string) => {
  // Firebase FCM 토큰 전송 비활성화 (로컬 테스트)
  console.log('Firebase FCM 토큰 전송이 비활성화되었습니다:', token);
  return { status: 200, data: { message: 'Firebase FCM 기능 비활성화됨' } };
  
  /*
  const response = await axiosInstance.post('/fcm/token', {
    token: token,
  });
  return response;
  */
};

/**
 * 아티스트 공연 시작 전 알림 신청
 * @params {string} artistName - 아티스트 이름
 */
export const registerArtistAlarm = async (artistName: string) => {
  return await axiosInstance.post(`/concert/${encodeURIComponent(artistName)}/alarm`);
};

/**
 * 아티스트 공연 시작 전 알림 해제
 * @params {string} artistName - 아티스트 이름
 */
export const releaseArtistAlarm = async (artistName: string) => {
  return await axiosInstance.delete(`/concert/${encodeURIComponent(artistName)}/alarm`);
};
