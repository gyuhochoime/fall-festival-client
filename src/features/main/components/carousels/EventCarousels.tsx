import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as S from './EventCarousels.styles';
import { EventCard } from '../cards';
import { useNavigate } from 'react-router-dom';
import { EventCardData } from '@/types/eventCardData.type';

interface EventCarouselsProps {
  events: EventCardData[];
}

/**
 * Carousels 컴포넌트
 * - MainEventData를 기반으로 UI를 렌더링
 */

export default function EventCarousels({ events }: EventCarouselsProps) {
  const navigate = useNavigate();
  const isSwipingRef = useRef(false);

  const eventCardLinkMap: Record<string, string> = {
    '1': '/main/notice/13',
    '2': '/main/notice/14',
    '10': '/main/notice/8',
    '15': '/main/notice/14',
  };

  const todayEvents = events;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    variableWidth: true,

    beforeChange: () => {
      isSwipingRef.current = true;
    },
    afterChange: () => {
      setTimeout(() => {
        isSwipingRef.current = false;
      }, 100);
    },
  };

  return (
    <S.Wrapper>
      <S.CardWrap>
        <Slider {...settings}>
          {todayEvents.map((card, i) => {
            return (
              <div key={i}>
                <EventCard
                  {...card}
                  onClick={() => {
                    if (isSwipingRef.current) return;
                    const link = eventCardLinkMap[card.id];
                    if (link) navigate(link);
                  }}
                />
              </div>
            );
          })}
        </Slider>
      </S.CardWrap>
      {/*
      <S.CursorBox>
        <Cursor width={'12.625rem'} height={'3.72063rem'} />
      </S.CursorBox>      
      <Indicator currentPage={index} totalPages={todayEvents.length} />
      */}
    </S.Wrapper>
  );
}
