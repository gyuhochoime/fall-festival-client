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

  const now = new Date();
  const todayEvents = events;

  const nightOn = (card: EventCardData, now: Date): boolean => {
    const startHour = Number(card.startTime.split(':')[0]);
    const endHour = Number(card.endTime.split(':')[0]);
    if (startHour < 18 && endHour > 18 && now.getHours() >= 18) {
      return false;
    }
    return card.isSun;
  };

  const liveOn = (card: EventCardData, now: Date) => {
    const tags = card.tags;
    const Perfomance = tags.some((tag) => tag.text === '공연무대');
    if (!Perfomance) return tags;

    const nowMin = now.getHours() * 60 + now.getMinutes();
    const startMin =
      Number(card.startTime.split(':')[0]) * 60 + Number(card.startTime.split(':')[1]);
    const endMin = Number(card.endTime.split(':')[0]) * 60 + Number(card.endTime.split(':')[1]);

    const isLive = nowMin >= startMin && nowMin <= endMin;
    const hasLive = tags.some((tag) => tag.text === 'LIVE');

    if (isLive && !hasLive) {
      return [{ color: 'rd500', text: 'LIVE' }, ...tags];
    }
    return tags;
  };

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
            const isSun = nightOn(card, now);
            const tags = liveOn(card, now);

            return (
              <div key={i}>
                <EventCard
                  {...card}
                  isSun={isSun}
                  tags={tags}
                  onClick={() => {
                    if (!isSwipingRef.current) {
                      const link = eventCardLinkMap[card.id];
                      if (link) navigate(link);
                    }
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
