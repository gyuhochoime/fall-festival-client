import { useState, useRef, useEffect } from 'react';
import * as S from './NewCarousel.styles';
import TimeIcon from '@/assets/icons/time_gy200.svg?react';
import NorthStarIcon from '@/assets/icons/north-star.svg?react';
import StageFillIcon from '@/assets/icons/stage-fill.svg?react';
import { NewCarouselProps } from './NewCarousel.types';

export default function NewCarousel({ data, onIndexChange }: NewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleData, setVisibleData] = useState(data);
  const [textFade, setTextFade] = useState<'in' | 'out'>('in');

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 탭 변경 감지
  useEffect(() => {
    if (data !== visibleData) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
        setVisibleData(data);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, data, visibleData]);

  // 텍스트 fade 처리
  useEffect(() => {
    setTextFade('out');
    const timeout = setTimeout(() => {
      setTextFade('in');
    }, 100);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  // 인덱스 변경 시 콜백 호출
  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setCurrentIndex((prev) => (prev + 1) % visibleData.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + visibleData.length) % visibleData.length);
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;

    const scrollLeft = carouselRef.current.scrollLeft;
    const itemWidth = carouselRef.current.offsetWidth - 2.5 * 16; // 2.5rem in px
    const gap = 1.5 * 16; // 1.5rem in px

    console.log('Scroll event:', {
      scrollLeft,
      itemWidth,
      gap,
      offsetWidth: carouselRef.current.offsetWidth,
    });

    const newIndex = Math.round(scrollLeft / (itemWidth + gap));
    setCurrentIndex(Math.max(0, Math.min(newIndex, visibleData.length - 1)));
  };

  return (
    <S.Container>
      {visibleData.length === 0 ? (
        <S.EmptyStateContainer>
          <StageFillIcon width="3rem" height="3rem" />
          <S.EmptyStateText>
            앗, 축제 1일차에는 공연이 없어요{'\n'}다른 일차를 기대해 주세요!
          </S.EmptyStateText>
        </S.EmptyStateContainer>
      ) : (
        <S.CarouselWrapper
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onScroll={handleScroll}
        >
          {visibleData.map((singer, index) => {
            const isEven = index % 2 === 0;
            const isActive = index === currentIndex;

            return (
              <S.CarouselItem key={index}>
                {isEven ? (
                  <>
                    <S.ArtistTimeBox fade={isActive ? textFade : 'in'}>
                      <S.ArtistName>{singer.singer}</S.ArtistName>
                      <S.TimeBox>
                        <TimeIcon width="1.125rem" height="1.125rem" />
                        <S.TimeText>{singer.time}</S.TimeText>
                      </S.TimeBox>
                    </S.ArtistTimeBox>
                    <S.NorthStar>
                      <NorthStarIcon width="1rem" height="1rem" />
                    </S.NorthStar>
                    <S.VerticalLine />
                    <S.ArtistCircle $isActive={isActive}>
                      <S.ArtistImage src={singer.backgroundUrl} alt={singer.singer} />
                    </S.ArtistCircle>
                  </>
                ) : (
                  <>
                    <S.ArtistCircle $isActive={isActive}>
                      <S.ArtistImage src={singer.backgroundUrl} alt={singer.singer} />
                    </S.ArtistCircle>
                    <S.VerticalLine />
                    <S.NorthStar>
                      <NorthStarIcon width="1rem" height="1rem" />
                    </S.NorthStar>
                    <S.ArtistTimeBox fade={isActive ? textFade : 'in'}>
                      <S.ArtistName>{singer.singer}</S.ArtistName>
                      <S.TimeBox>
                        <TimeIcon width="1.125rem" height="1.125rem" />
                        <S.TimeText>{singer.time}</S.TimeText>
                      </S.TimeBox>
                    </S.ArtistTimeBox>
                  </>
                )}
              </S.CarouselItem>
            );
          })}
        </S.CarouselWrapper>
      )}
    </S.Container>
  );
}
