import * as S from './TimeTable.styles';
import { singers, time } from '@/constants/performance/SingerList';
import { useEffect, useState } from 'react';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useNavigate } from 'react-router-dom';
import TabNav from '@/components/tab-nav';
import StageFillIcon from '@/assets/icons/stage-fill.svg?react';
import NorthStarIcon from '@/assets/icons/timetable-north-star.svg?react';
import { NavBar } from '@/components/nav-bar/NavBar';

/**
 * TimeTable component
 * @returns {JSX.Element}
 */
const DAY_TO_DATE: Record<(typeof TABS)[number], string> = {
  '1일차': '2025-09-15',
  '2일차': '2025-09-16',
  '3일차': '2025-09-17',
};
const TABS = ['1일차', '2일차', '3일차'] as const;

export default function TimeTable() {
  const [selectedDay, setSelectedDay] = useState<'1일차' | '2일차' | '3일차'>('1일차');
  const [currentTime, setCurrentTime] = useState(new Date());
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const currentPerformances = singers[selectedDay];

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

  return (
    <S.Container>
      <NavBar
        isBack={true}
        title="타임테이블"
        isClose={true}
        backPath={-1}
        onCloseClick={handleExit}
      />
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
            <S.PerformanceBoxContainer>
              {selectedDay === '2일차' && (
                <S.Day2Container>
                  {currentPerformances.map((performance, index) => {
                    const active = isNowPlaying(performance.start, performance.end, selectedDay);
                    const boxSize = index === 0 ? 'large' : index === 2 ? 'small' : 'medium';

                    return (
                      <S.PerformanceBox key={index} $boxSize={boxSize} $isActive={active}>
                        <S.PerformanceInfo $isActive={active}>
                          <S.PerformanceName $isActive={active}>
                            {performance.name}
                          </S.PerformanceName>
                          <S.PerformanceTime $isActive={active}>
                            {performance.start}~{performance.end}
                          </S.PerformanceTime>
                        </S.PerformanceInfo>
                      </S.PerformanceBox>
                    );
                  })}
                </S.Day2Container>
              )}

              {selectedDay === '3일차' && (
                <S.Day3Container>
                  {currentPerformances.map((performance, index) => {
                    const active = isNowPlaying(performance.start, performance.end, selectedDay);
                    const boxSize =
                      index === 0 ? 'large-day3' : index === 1 || index === 2 ? 'small' : 'medium';

                    return (
                      <S.PerformanceBox key={index} $boxSize={boxSize} $isActive={active}>
                        <S.PerformanceInfo $isActive={active}>
                          <S.PerformanceName $isActive={active}>
                            {performance.name}
                          </S.PerformanceName>
                          <S.PerformanceTime $isActive={active}>
                            {performance.start}~{performance.end}
                          </S.PerformanceTime>
                        </S.PerformanceInfo>
                      </S.PerformanceBox>
                    );
                  })}
                </S.Day3Container>
              )}
            </S.PerformanceBoxContainer>
          </S.TimeAndBarContainer>
        </S.TimeWrap>
      )}
    </S.Container>
  );
}
