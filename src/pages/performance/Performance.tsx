import * as S from './Performance.styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { Notification } from '@/components/notification';
import { Tabs } from '@/components/tabs';

import NewCarousel from '@/features/performance/NewCarousel';
import { performanceData } from '@/constants/performance/SingerInfo';
import { ModalHelp } from '@/features/performance';
import useModal from '@/hooks/useModal';

import BackIcon from '@/assets/icons/left-arrow.svg?react';
import CloseIcon from '@/assets/icons/close-black.svg?react';

export type DayType = '1일차' | '2일차' | '3일차';

/**
 * Performance 페이지
 * @returns {JSX.Element}
 */

export default function Performance() {
  const { open } = useModal(ModalHelp);
  const navigate = useNavigate();
  const setIsNav = useLayoutStore((s) => s.setIsNav);
  const [selectedDay, setSelectedDay] = useState<DayType>('2일차');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const performances = performanceData[selectedDay];

  // 진입/이탈 시 하단 탭바 숨김/복원
  React.useEffect(() => {
    setIsNav(true);
    return () => setIsNav(true);
  }, [setIsNav]);

  const handleHelpClick = () => {
    open(
      {
        title: '공연 정보 제공 안내',
      },
      {
        isHelpIcon: false,
      },
    );
  };

  const handleBack = () => {
    navigate('/main');
  };

  const handleExit = () => {
    navigate('/main');
  };

  return (
    <S.PerformanceContainer>
      {/* 상단 헤더 */}
      <S.Header>
        <S.HeaderButton aria-label="뒤로">
          <BackIcon
            style={{ cursor: 'pointer' }}
            width={'0.95rem'}
            height={'0.95rem'}
            onClick={handleBack}
          />
        </S.HeaderButton>
        <S.HeaderTitle>공연</S.HeaderTitle>
        <S.HeaderButton aria-label="나가기">
          <CloseIcon
            style={{ cursor: 'pointer' }}
            width={'0.85rem'}
            height={'0.85rem'}
            onClick={handleExit}
          />
        </S.HeaderButton>
      </S.Header>

      {/* 본문 */}
      <S.Fullscreen role="main">
        <S.InfoWrap>
          <Notification
            title="[공지] 공연관람 유의사항"
            onClick={() => navigate('/main/notice/25')}
          />
        </S.InfoWrap>
        <S.DayWrap>
          <S.TabsHelpWrap>
            <Tabs
              tabs={['1일차', '2일차', '3일차']}
              activeTab={selectedDay}
              onTabClick={(tab) => setSelectedDay(tab as DayType)}
              gap="0.25rem"
            />
            <S.HelpIconStyled onClick={() => handleHelpClick()} />
          </S.TabsHelpWrap>
        </S.DayWrap>

        <S.Carousel>
          <NewCarousel data={performances} onIndexChange={setCurrentIndex} />
        </S.Carousel>
        <S.ProgressContainer>
          <S.ProgressBar>
            <S.ProgressFill
              width={`${(1 / performances.length) * 100}%`}
              left={`${(currentIndex / performances.length) * 100}%`}
            />
          </S.ProgressBar>
        </S.ProgressContainer>
        <S.TimeTableButton onClick={() => navigate('/timetable')}>
          전체 타임 테이블 보러가기
        </S.TimeTableButton>
      </S.Fullscreen>
    </S.PerformanceContainer>
  );
}
