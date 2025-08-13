import { FrameCollection, PolaroidDimensions } from './types';

// Basic frames
import basicEmptyFrame from '@/assets/images/frames/basic/empty.png';
import basicEmptyThumb from '@/assets/images/frames/basic/empty-thumb.png';
import basicFallFrame from '@/assets/images/frames/basic/fall.png';
import basicFallThumb from '@/assets/images/frames/basic/fall-thumb.png';
import basicPartyFrame from '@/assets/images/frames/basic/party.png';
import basicPartyThumb from '@/assets/images/frames/basic/party-thumb.png';

// Special frames
import specialDay1Frame from '@/assets/images/frames/special/day1.png';
import specialDay1Thumb from '@/assets/images/frames/special/day1-thumb.png';
import specialDay2Frame from '@/assets/images/frames/special/day2.png';
import specialDay2Thumb from '@/assets/images/frames/special/day2-thumb.png';
import specialDay3Frame from '@/assets/images/frames/special/day3.png';
import specialDay3Thumb from '@/assets/images/frames/special/day3-thumb.png';

export const FRAMES: FrameCollection = {
  basic: {
    empty: { frame: basicEmptyFrame, thumb: basicEmptyThumb, name: '기본' },
    fall: { frame: basicFallFrame, thumb: basicFallThumb, name: '가을' },
    party: { frame: basicPartyFrame, thumb: basicPartyThumb, name: '파티' },
  },
  special: {
    day1: { frame: specialDay1Frame, thumb: specialDay1Thumb, name: '1일차' },
    day2: { frame: specialDay2Frame, thumb: specialDay2Thumb, name: '2일차' },
    day3: { frame: specialDay3Frame, thumb: specialDay3Thumb, name: '3일차' },
  },
};

// 프레임 규격 상수 (1080x1720px 프레임)
export const FRAME_DIMENSIONS: PolaroidDimensions = {
  width: 1080,
  height: 1720,
};

// 현상 애니메이션 관련 상수
export const DEVELOP_CONFIG = {
  totalMs: 10000, // 10초
  tickMs: 100, // 0.1초
  get delta() {
    return this.tickMs / this.totalMs; // 0.01씩 증가
  },
};

// 온보딩 슬라이드 텍스트
export const SLIDE_TEXTS = [
  '흘려보내기 아쉬운 순간들을\n폴라로이드 카메라에 담아 보세요!',
  '사진을 찍고 나면, 프레임을 선택할 수 있어요!\n오늘의 하루를 기록할 스페셜 프레임을 만나보세요',
  '두근두근! 환한 미소는 준비 되셨나요?\n그럼, 시작해 볼까요?',
];
