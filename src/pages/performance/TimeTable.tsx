import * as S from './TimeTable.styles';
import BackIcon from '@/assets/icons/left-arrow.svg?react';
import CloseIcon from '@/assets/icons/close-black.svg?react';
import { singers, time } from '@/constants/performance/SingerList';
import { useEffect, useState } from 'react';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useNavigate } from 'react-router-dom';
import TabNav from '@/components/tab-nav';
import StageFillIcon from '@/assets/icons/stage-fill.svg?react';
import NorthStarIcon from '@/assets/icons/north-star.svg?react';

/**
 * TimeTable component
 * @returns {JSX.Element}
 */
const DAY_TO_DATE: Record<(typeof TABS)[number], string> = {
  '1일차': '2025-05-27',
  '2일차': '2025-05-28',
  '3일차': '2025-05-29',
};
const TABS = ['1일차', '2일차', '3일차'] as const;

export default function TimeTable() {
  const [selectedDay, setSelectedDay] = useState<'1일차' | '2일차' | '3일차'>('1일차');
  const [currentTime, setCurrentTime] = useState(new Date());
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const currentPerformances = singers[selectedDay];

  const handleBack = () => {
    navigate(-1);
  };

  const handleExit = () => {
    navigate('/');
  };

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000000);

    return () => clearInterval(timer);
  }, []);

  const isNowPlaying = (start: string, end: string, day: (typeof TABS)[number]) => {
    const todayString = new Date().toISOString().slice(0, 10);
    const performanceDate = DAY_TO_DATE[day];

    if (todayString !== performanceDate) return false;

    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);

    const startTotal = startHour * 60 + startMin;
    const endTotal = endHour * 60 + endMin;
    const nowTotal = currentTime.getHours() * 60 + currentTime.getMinutes();

    return nowTotal >= startTotal && nowTotal < endTotal;
  };

  // const calculateDurationInBlocks = (start: string, end: string) => {
  //   const [startHour, startMin] = start.split(':').map(Number);
  //   const [endHour, endMin] = end.split(':').map(Number);

  //   const startTotalMinutes = startHour * 60 + startMin;
  //   const endTotalMinutes = endHour * 60 + endMin;

  //   const diffMinutes = endTotalMinutes - startTotalMinutes;

  //   return Math.round(diffMinutes / 5);
  // };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderButton aria-label="뒤로">
          <BackIcon
            style={{ cursor: 'pointer' }}
            width={'0.95rem'}
            height={'0.95rem'}
            onClick={handleBack}
          />
        </S.HeaderButton>
        <S.HeaderTitle>타임테이블</S.HeaderTitle>
        <S.HeaderButton aria-label="나가기">
          <CloseIcon
            style={{ cursor: 'pointer' }}
            width={'0.85rem'}
            height={'0.85rem'}
            onClick={handleExit}
          />
        </S.HeaderButton>
      </S.Header>
      <S.TabNavWrap>
        <TabNav
          tabs={TABS}
          currentStep={selectedDay}
          setStep={setSelectedDay}
          variant="timetable"
        />
      </S.TabNavWrap>
      {selectedDay === '1일차' ? (
        <S.EmptyStateContainer>
          <StageFillIcon width="3rem" height="3rem" />
          <S.EmptyStateText>
            앗, 축제 1일차에는 공연이 없어요{'\n'}다른 일차를 기대해 주세요!
          </S.EmptyStateText>
        </S.EmptyStateContainer>
      ) : (
        <S.TimeWrap>
          <S.TimeAndBarContainer>
            <S.TimeContainer>
              {time.map((t, index) => (
                <S.TimeBoxWrap key={index}>
                  <S.TimeText>{t}</S.TimeText>
                </S.TimeBoxWrap>
              ))}
            </S.TimeContainer>
            <S.NorthStarContainer>
              <S.NorthStarLine>
                <S.NorthStarTop>
                  <NorthStarIcon width="1rem" height="1rem" />
                </S.NorthStarTop>
                <S.NorthStarBottom>
                  <NorthStarIcon width="1rem" height="1rem" />
                </S.NorthStarBottom>
              </S.NorthStarLine>
            </S.NorthStarContainer>
            <S.ArtistBoxContainer>
              {time.map((timeSlot, timeIndex) => {
                // 해당 시간대에 시작하는 공연 찾기
                const performance = currentPerformances.find((p) => p.start === timeSlot && p.name);

                if (!performance) return null;

                const active = isNowPlaying(performance.start, performance.end, selectedDay);

                // 시간대별 고정 위치 계산 (17:00 = 0, 18:00 = 1, ...)
                const topPosition = timeIndex * (6.25 + 0.859375); // 1시간 + 간격

                return (
                  <S.ArtistBox
                    key={timeIndex}
                    $isActive={active}
                    style={{
                      position: 'absolute',
                      top: `${topPosition}rem`,
                    }}
                  >
                    <S.ArtistName $isActive={active}>{performance.name}</S.ArtistName>
                    <S.ArtistTime $isActive={active}>
                      {performance.start}~{performance.end}
                    </S.ArtistTime>
                  </S.ArtistBox>
                );
              })}
            </S.ArtistBoxContainer>
          </S.TimeAndBarContainer>
        </S.TimeWrap>
      )}
    </S.Container>
  );
}
