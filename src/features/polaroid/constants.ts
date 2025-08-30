import { FrameCollection, PolaroidDimensions } from './types';

// Basic frames
// Basic (color)
import basicBlackFrame from '@/assets/images/polaroid/frames/basic/black.png';
import basicBlackThumb from '@/assets/images/polaroid/frames/basic/black-thumb.webp';
import basicPinkFrame from '@/assets/images/polaroid/frames/basic/pink.png';
import basicPinkThumb from '@/assets/images/polaroid/frames/basic/pink-thumb.webp';
import basicSkyFrame from '@/assets/images/polaroid/frames/basic/sky.png';
import basicSkyThumb from '@/assets/images/polaroid/frames/basic/sky-thumb.webp';
import basicWhiteFrame from '@/assets/images/polaroid/frames/basic/white.png';
import basicWhiteThumb from '@/assets/images/polaroid/frames/basic/white-thumb.webp';
import basicYellowFrame from '@/assets/images/polaroid/frames/basic/yellow.png';
import basicYellowThumb from '@/assets/images/polaroid/frames/basic/yellow-thumb.webp';

// Special frames
// Special (daily)
import specialDay1Frame from '@/assets/images/polaroid/frames/special/day1.png';
import specialDay1Thumb from '@/assets/images/polaroid/frames/special/day1-thumb.webp';
import specialDay2Frame from '@/assets/images/polaroid/frames/special/day2.png';
import specialDay2Thumb from '@/assets/images/polaroid/frames/special/day2-thumb.webp';
import specialDay3Frame from '@/assets/images/polaroid/frames/special/day3.png';
import specialDay3Thumb from '@/assets/images/polaroid/frames/special/day3-thumb.webp';

// Special (color)
import specialBlackFrame from '@/assets/images/polaroid/frames/special/black.png';
import specialBlackThumb from '@/assets/images/polaroid/frames/special/black-thumb.webp';
import specialPinkFrame from '@/assets/images/polaroid/frames/special/pink.png';
import specialPinkThumb from '@/assets/images/polaroid/frames/special/pink-thumb.webp';
import specialDenimFrame from '@/assets/images/polaroid/frames/special/denim.png';
import specialDenimThumb from '@/assets/images/polaroid/frames/special/denim-thumb.webp';

export const FRAMES: FrameCollection = {
  basic: {
    black: { frame: basicBlackFrame, thumb: basicBlackThumb, name: '검정' },
    pink: { frame: basicPinkFrame, thumb: basicPinkThumb, name: '분홍' },
    sky: { frame: basicSkyFrame, thumb: basicSkyThumb, name: '하늘' },
    white: { frame: basicWhiteFrame, thumb: basicWhiteThumb, name: '하양' },
    yellow: { frame: basicYellowFrame, thumb: basicYellowThumb, name: '노랑' },
  },
  special: {
    day1: { frame: specialDay1Frame, thumb: specialDay1Thumb, name: '1일차' },
    day2: { frame: specialDay2Frame, thumb: specialDay2Thumb, name: '2일차' },
    day3: { frame: specialDay3Frame, thumb: specialDay3Thumb, name: '3일차' },

    black: { frame: specialBlackFrame, thumb: specialBlackThumb, name: '검정' },
    pink: { frame: specialPinkFrame, thumb: specialPinkThumb, name: '분홍' },
    denim: { frame: specialDenimFrame, thumb: specialDenimThumb, name: '데님' },
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

// 흔들기 현상 관련 상수
export const SHAKE_CONFIG = {
  // === 기본 흔들기 설정 ===
  maxShakes: 50, // 현상 완료까지 필요한 흔들기 횟수 (10~30 권장)
  shakeThreshold: 15, // 흔들기 감지 임계값 (10~25 권장, 낮을수록 민감)
  shakeCooldown: 200, // 연속 흔들기 방지 시간 (100~300ms 권장)

  // === 애니메이션 타이밍 설정 ===
  shakeAnimationDuration: 300, // 흔들기 애니메이션 지속 시간 (200~500ms 권장)
  completionDelay: 500, // 완료 후 다음 단계로 이동하는 지연 시간 (300~800ms 권장)

  // === CSS 애니메이션 관련 (Polaroid.styles.ts에서 수동으로 동기화 필요) ===
  cssAnimationDuration: '0.5s', // CSS shake 애니메이션 지속시간
  shakeIntensity: 5, // 흔들기 강도 (px) - 3~10 권장
  rotationAngle: 1, // 회전 각도 (deg) - 0.5~2 권장
};

// 온보딩 슬라이드 텍스트
export const SLIDE_TEXTS = [
  '흘려보내기 아쉬운 순간들을\n폴라로이드 카메라에 담아 보세요!',
  '사진을 찍고 나면, 프레임을 선택할 수 있어요!\n오늘의 하루를 기록할 스페셜 프레임을 만나보세요',
  '두근두근! 환한 미소는 준비 되셨나요?\n그럼, 시작해 볼까요?',
];
