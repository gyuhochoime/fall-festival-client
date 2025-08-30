import { useEffect, useRef, useState } from 'react';
import { DEVELOP_CONFIG, SHAKE_CONFIG } from './constants';
import { FrameCategory, FrameKey } from './types';
import { FESTIVAL_START_DATE, FESTIVAL_TOTAL_DAYS } from '@/constants/festival/dates';

/**
 * 현상 애니메이션을 관리하는 훅
 */
export function useDevelopAnimation() {
  const [opacity, setOpacity] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const startDevelop = (onComplete?: () => void) => {
    setOpacity(0);
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    const id = window.setInterval(() => {
      setOpacity((prev) => {
        const next = Math.min(1, prev + DEVELOP_CONFIG.delta);
        if (next >= 1) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          intervalRef.current = null;
          setTimeout(() => onComplete?.(), 400);
        }
        return next;
      });
    }, DEVELOP_CONFIG.tickMs);

    intervalRef.current = id;
  };

  const stopDevelop = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = null;
    setOpacity(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  return { opacity, startDevelop, stopDevelop };
}

/**
 * 흔들기 현상 애니메이션을 관리하는 훅
 */
export function useShakeDevelop() {
  const [shakeCount, setShakeCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxShakes = SHAKE_CONFIG.maxShakes;
  const lastShakeTimeRef = useRef(0);
  const onCompleteRef = useRef<(() => void) | null>(null);

  // 아주 간단한 흔들기 감지
  const detectShake = (event: DeviceMotionEvent) => {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    const currentTime = Date.now();
    if (currentTime - lastShakeTimeRef.current < SHAKE_CONFIG.shakeCooldown) return;

    const totalAcceleration = Math.sqrt(
      (acceleration.x || 0) ** 2 + (acceleration.y || 0) ** 2 + (acceleration.z || 0) ** 2,
    );

    if (totalAcceleration > SHAKE_CONFIG.shakeThreshold) {
      // alert('흔들림 감지!');

      // 바로 카운트 올리기
      setShakeCount((prev) => {
        const newCount = prev + 1;

        // 완료 체크
        if (newCount >= maxShakes && onCompleteRef.current) {
          setTimeout(() => {
            onCompleteRef.current?.();
          }, 500);
        }

        return newCount;
      });

      // 흔들기 애니메이션
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);

      lastShakeTimeRef.current = currentTime;
    }
  };

  // 권한 요청 - 간단하게
  const requestPermission = async (): Promise<boolean> => {
    try {
      const DeviceMotionEventTyped = DeviceMotionEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };

      if (typeof DeviceMotionEventTyped.requestPermission === 'function') {
        const permission = await DeviceMotionEventTyped.requestPermission();
        const granted = permission === 'granted';
        setPermissionGranted(granted);
        return granted;
      } else {
        setPermissionGranted(true);
        return true;
      }
    } catch (error) {
      console.error('Permission error:', error);
      setError('권한 요청 실패');
      return false;
    }
  };

  // 흔들기 시작
  const startShakeDevelop = async (onComplete?: () => void) => {
    // 초기화
    setShakeCount(0);
    setError(null);
    onCompleteRef.current = onComplete || null;

    // 권한 체크/요청
    if (!permissionGranted) {
      const granted = await requestPermission();
      if (!granted) return;
    }

    // 이벤트 리스너 등록
    window.addEventListener('devicemotion', detectShake);
  };

  // 중지
  const stopShakeDevelop = () => {
    window.removeEventListener('devicemotion', detectShake);
    setShakeCount(0);
    onCompleteRef.current = null;
  };

  // 테스트용
  const simulateShake = () => {
    setShakeCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= maxShakes && onCompleteRef.current) {
        setTimeout(() => onCompleteRef.current?.(), 500);
      }
      return newCount;
    });
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
  };

  const progress = shakeCount / maxShakes;
  const opacity = progress;
  const isCompleted = shakeCount >= maxShakes;

  return {
    shakeCount,
    maxShakes,
    progress,
    opacity,
    isShaking,
    isCompleted,
    permissionGranted,
    error,
    requestPermission,
    startShakeDevelop,
    stopShakeDevelop,
    simulateShake,
  };
}

/**
 * 프레임 선택을 관리하는 훅
 */
export function useFrameSelection() {
  const [frameCategory, setFrameCategory] = useState<FrameCategory>('basic');
  const [frameKey, setFrameKey] = useState<FrameKey>('black');

  // 카테고리 변경 시 기본 프레임 설정
  useEffect(() => {
    if (frameCategory === 'basic') {
      setFrameKey('black');
    } else {
      // 날짜별 스페셜 프레임 자동선택

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [year, month, day] = FESTIVAL_START_DATE.split('-').map(Number);
      const startDate = new Date(year, month - 1, day);

      const diffTime = today.getTime() - startDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 0 && diffDays < FESTIVAL_TOTAL_DAYS) {
        const dayNumber = diffDays + 1;
        setFrameKey(`day${dayNumber}` as FrameKey);
      } else {
        setFrameKey('black');
      }
    }
  }, [frameCategory]);

  return {
    frameCategory,
    frameKey,
    setFrameCategory,
    setFrameKey,
  };
}

/**
 * 온보딩 슬라이드를 관리하는 훅
 */
export function useOnboardingSlides() {
  const [slideIndex, setSlideIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setSlideIndex(i);
  };

  const goNextSlide = () => {
    const el = scrollRef.current;
    if (!el) return;
    const next = Math.min(2, slideIndex + 1);
    el.scrollTo({ left: el.clientWidth * next, behavior: 'smooth' });
  };

  const goToSlide = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * index, behavior: 'smooth' });
  };

  return {
    slideIndex,
    scrollRef,
    onScroll,
    goNextSlide,
    goToSlide,
    setSlideIndex,
  };
}

/**
 * 사진 촬영/선택을 관리하는 훅
 */
export function usePhotoCapture() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleShootClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  return {
    photoUrl,
    fileInputRef,
    handleShootClick,
    handleFileChange,
  };
}

/**
 * 컨테이너 크기를 관리하는 훅
 */
export function useContainerSize() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(360);
  const [containerHeight, setContainerHeight] = useState<number>(600);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.floor(entry.contentRect.width);
        const h = Math.floor(entry.contentRect.height);
        setContainerWidth(w);
        setContainerHeight(h);
      }
    });

    observer.observe(el);
    setContainerWidth(el.clientWidth);
    setContainerHeight(el.clientHeight);

    return () => observer.disconnect();
  }, []);

  return {
    containerRef,
    containerWidth,
    containerHeight,
  };
}
