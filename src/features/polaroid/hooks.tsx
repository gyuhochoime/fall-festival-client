import { useEffect, useRef, useState } from 'react';
import { DEVELOP_CONFIG } from './constants';
import { FrameCategory, FrameKey } from './types';

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
 * 프레임 선택을 관리하는 훅
 */
export function useFrameSelection() {
  const [frameCategory, setFrameCategory] = useState<FrameCategory>('basic');
  const [frameKey, setFrameKey] = useState<FrameKey>('empty');

  // 카테고리 변경 시 기본 프레임 설정
  useEffect(() => {
    if (frameCategory === 'basic') {
      setFrameKey('empty');
    } else {
      setFrameKey('day1');
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
