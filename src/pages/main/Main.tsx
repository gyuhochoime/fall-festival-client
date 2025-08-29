import { EventCardData } from '@/types/eventCardData.type';

// import { NavBar } from '@/components/nav-bar';
import * as S from './Main.styles';
import { EventCarousels } from '@/features/main/components/carousels';
import { Menu } from '@/features/main/components/menu/index';
import MainNoticeList from '@/features/main/components/notice/MainNoticeList';
import Right from '@/assets/icons/right-arrow.svg?react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '@/features/main/components/user';
import { useEffect } from 'react';
import { ensureSessionCookie } from '@/utils/session';
import AppInstallPrompt from '@/features/main/components/user/AppInstallPrompt';

import logo from '@/assets/images/espero-logo.png';

const sampleEvents: EventCardData[] = [
  {
    id: '1',
    title: '한 대 빵!!',
    startTime: '11:00',
    endTime: '17:00',
    location: '잔디공터',
    date: '9.12~9.13',
  },
  {
    id: '2',
    title: '삐에로 아저씨',
    startTime: '13:00',
    endTime: '17:00',
    location: '잔디 공터 일대',
    date: '9.12~9.13',
  },
  {
    id: '3',
    title: 'KINO',
    startTime: '17:00',
    endTime: '17:30',
    location: '공연장',
    date: '9.12~9.13',
  },
  {
    id: '4',
    title: '학생 특별공연',
    startTime: '17:30',
    endTime: '18:00',
    location: '공연장',
    date: '9.12~9.13',
  },
  {
    id: '5',
    title: 'NCT 마크',
    startTime: '18:15',
    endTime: '18:45',
    location: '공연장',
    date: '9.12~9.13',
  },
];

export default function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    // 첫 방문이 아니어도 세션 쿠키 없으면 보충
    ensureSessionCookie();
  }, []);
  return (
    <S.Container>
      <AppInstallPrompt />
      <S.Layout />
      {/* <NavBar opacity={true} /> */}
      <div style={{ padding: '1.3rem 1rem 0' }}>
        <img src={logo} style={{ position: 'relative' }} width="150px" height="49px" />
      </div>
      <S.Main>
        <section>
          <S.TitleWrapper style={{ marginBottom: 0 }}>
            <S.Title>진행 중인 이벤트</S.Title>
          </S.TitleWrapper>
          <S.CarouselsBox>
            <EventCarousels events={sampleEvents} />
          </S.CarouselsBox>
        </section>
        {/* !isLoggedIn && <UserLogin /> */}
        <section>
          <S.TitleWrapper>
            <S.Title>공지사항</S.Title>
            <S.MoreButton whileTap={{ scale: 0.95 }} onClick={() => navigate('/main/notice')}>
              <S.BtnText>전체 보기</S.BtnText>
              <Right width={'1rem'} height={'1rem'} />
            </S.MoreButton>
          </S.TitleWrapper>
          <MainNoticeList />
        </section>
        <Menu />
        <Footer />
      </S.Main>
    </S.Container>
  );
}
