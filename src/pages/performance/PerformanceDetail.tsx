import { useLocation, useNavigate } from 'react-router-dom';
import CalendarIcon from '@/assets/icons/calendar-black.svg?react';
import TimePerformanceIcon from '@/assets/icons/time-performance.svg?react';
import StageFillIcon from '@/assets/icons/stage-fill.svg?react';
import * as S from './PerformanceDetail.styles';
import { PerformanceDetailsProps } from './PerformanceDetail.types';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useEffect } from 'react';
import { NavBar } from '@/components/nav-bar/NavBar';

/**
 * 공연 상세 페이지 컴포넌트
 *
 * React Router의 `Link` 컴포넌트에서 `state`로 전달된 공연 정보를 기반으로 렌더링됩니다.
 *
 * 전달 데이터 구조 (`PerformanceDetailsProps`):
 * - backgroundUrl: 배경 이미지 URL
 * - singer: 가수 이름
 * - time: 공연 시간 (예: "21:00~22:00")
 * - description: 가수 설명
 * - songList: 대표곡 리스트 (이미지, 곡명, 외부 URL 포함)
 *
 * @returns JSX.Element
 */

export default function PerformanceDetail() {
  const { state } = useLocation() as { state: PerformanceDetailsProps };
  const { backgroundUrl, singer, time, songList } = state;
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  const handleExit = () => {
    navigate('/main');
  };

  // 일차 정보 추출 (예: "20:00~20:20"에서 시간을 보고 일차 판단)
  const getDayInfo = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 18) return '3일차';
    if (hour < 21) return '2일차';
    return '1일차';
  };

  const dayInfo = getDayInfo(time);

  return (
    <S.DetailsContainer>
      {/* 상단 헤더 */}
      <NavBar
        isBack={true}
        title="공연 상세정보"
        isClose={true}
        backPath="/performance"
        onCloseClick={handleExit}
      />

      {/* 본문 */}
      <S.Fullscreen role="main">
        {/* 아티스트 정보 섹션 */}
        <S.ArtistInfoSection>
          <S.ArtistCircle>
            <S.ArtistCircleImage src={backgroundUrl} alt={singer} />
          </S.ArtistCircle>
          <S.ArtistTextSection>
            <S.ArtistName>{singer}</S.ArtistName>
            <S.ArtistGenre>K-POP / 댄스</S.ArtistGenre>
            <S.ArtistInfoBox>
              <S.InfoItem>
                <CalendarIcon width="1rem" height="1rem" />
                <S.InfoText>{dayInfo}</S.InfoText>
              </S.InfoItem>
              <S.InfoItem>
                <TimePerformanceIcon width="1rem" height="1rem" />
                <S.InfoText>{time}</S.InfoText>
              </S.InfoItem>
            </S.ArtistInfoBox>
          </S.ArtistTextSection>
        </S.ArtistInfoSection>

        <S.TitleSongWrap>
          <S.TitleSongText>대표곡</S.TitleSongText>
          <S.SongWrap>
            {songList.map((song, index) => (
              <S.SongBox key={index} onClick={() => window.open(song.url, '_blank')}>
                <S.Wrap>
                  <S.SongImage src={song.image} />
                  <S.SongName>{song.name}</S.SongName>
                </S.Wrap>
                <S.SongIcon>
                  <StageFillIcon width={'1.5rem'} height={'1.5rem'} />
                </S.SongIcon>
              </S.SongBox>
            ))}
          </S.SongWrap>
        </S.TitleSongWrap>
      </S.Fullscreen>
    </S.DetailsContainer>
  );
}
