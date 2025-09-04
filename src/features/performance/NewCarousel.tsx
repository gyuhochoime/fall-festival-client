import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as S from './NewCarousel.styles';
import TimeIcon from '@/assets/icons/time-performance.svg?react';
import NorthStarIcon from '@/assets/icons/north-star.svg?react';
import StageFillIcon from '@/assets/icons/stage-fill.svg?react';
import { NewCarouselProps } from './NewCarousel.types';
import { PerformanceItem } from './Carousel.types';

export default function NewCarousel({ data, onIndexChange, onArtistClick }: NewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [textFade, setTextFade] = useState<'in' | 'out'>('in');
  const isSwipingRef = useRef(false);
  const sliderRef = useRef<Slider>(null);

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
      console.log('Final Index sent to parent:', currentIndex, 'Data Length:', data.length);
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange, data.length]);

  // 데이터 변경 시 슬라이더를 첫 번째 슬라이드로 이동
  useEffect(() => {
    if (sliderRef.current && data.length > 0) {
      sliderRef.current.slickGoTo(0);
      setCurrentIndex(0);
    }
  }, [data]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    variableWidth: false,
    centerPadding: '1.25rem',
    initialSlide: 0,
    beforeChange: () => {
      isSwipingRef.current = true;
    },
    afterChange: (current: number) => {
      console.log('Raw afterChange value:', current);
      // 반올림 처리
      const roundedIndex = Math.round(current);
      console.log('Rounded index:', roundedIndex);
      setCurrentIndex(roundedIndex);
      setTimeout(() => {
        isSwipingRef.current = false;
      }, 100);
    },
  };

  return (
    <S.Container>
      {data.length === 0 ? (
        <S.EmptyStateContainer>
          <StageFillIcon width="3rem" height="3rem" />
          <S.EmptyStateText>
            앗, 축제 1일차에는 공연이 없어요{'\n'}다른 일차를 기대해 주세요!
          </S.EmptyStateText>
        </S.EmptyStateContainer>
      ) : (
        <S.CarouselWrapper>
          <Slider ref={sliderRef} {...settings}>
            {data.map((singer: PerformanceItem, index: number) => {
              const isEven = index % 2 === 0;
              const isActive = index === currentIndex;

              return (
                <div key={index}>
                  <S.CarouselItem>
                    {isEven ? (
                      <>
                        <S.ArtistTimeBox fade={isActive ? textFade : 'in'}>
                          <S.ArtistName>{singer.singer}</S.ArtistName>
                          <S.TimeBox>
                            <TimeIcon width="0.75rem" height="0.75rem" />
                            <S.TimeText>{singer.time}</S.TimeText>
                          </S.TimeBox>
                        </S.ArtistTimeBox>
                        <S.NorthStar>
                          <NorthStarIcon width="1.75rem" height="1.75rem" />
                        </S.NorthStar>
                        <S.VerticalLine />
                        <S.ArtistCircle $isActive={isActive}>
                          <S.ArtistImage
                            src={singer.backgroundUrl}
                            alt={singer.singer}
                            onClick={() => {
                              if (isSwipingRef.current) return;
                              onArtistClick?.(singer);
                            }}
                            style={{ cursor: 'pointer' }}
                          />
                        </S.ArtistCircle>
                      </>
                    ) : (
                      <>
                        <S.ArtistCircle $isActive={isActive}>
                          <S.ArtistImage
                            src={singer.backgroundUrl}
                            alt={singer.singer}
                            onClick={() => {
                              if (isSwipingRef.current) return;
                              onArtistClick?.(singer);
                            }}
                            style={{ cursor: 'pointer' }}
                          />
                        </S.ArtistCircle>
                        <S.VerticalLine />
                        <S.NorthStar>
                          <NorthStarIcon width="1.75rem" height="1.75rem" />
                        </S.NorthStar>
                        <S.ArtistTimeBox fade={isActive ? textFade : 'in'}>
                          <S.ArtistName>{singer.singer}</S.ArtistName>
                          <S.TimeBox>
                            <TimeIcon width="0.75rem" height="0.75rem" />
                            <S.TimeText>{singer.time}</S.TimeText>
                          </S.TimeBox>
                        </S.ArtistTimeBox>
                      </>
                    )}
                  </S.CarouselItem>
                </div>
              );
            })}
          </Slider>
        </S.CarouselWrapper>
      )}
    </S.Container>
  );
}
