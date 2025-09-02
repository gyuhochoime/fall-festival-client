/**
 * 이미지 URL에 캐시 버스팅 쿼리 파라미터를 추가하는 유틸리티 함수
 * @param {string} imageUrl - 이미지 URL
 * @returns {string} 캐시 버스팅 쿼리 파라미터가 추가된 URL
 */
export const getCacheBustedImageUrl = (imageUrl: string): string => {
  const separator = imageUrl.includes('?') ? '&' : '?';
  return `${imageUrl}${separator}v=${Date.now()}`;
};
