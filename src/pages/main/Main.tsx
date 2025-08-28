import { EventCardData } from '@/types/eventCardData.type';

// import { NavBar } from '@/components/nav-bar';
import * as S from './Main.styles';
import { EventCarousels } from '@/features/main/components/carousels';
import { Menu } from '@/features/main/components/menu/index';
import { NoticeSlider } from '@/features/main/components/slider';
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
    tags: [{ color: 'ye200', text: '콘텐츠' }],
    title: '한 대 빵!!',
    startTime: '11:00',
    endTime: '17:00',
    location: '잔디공터',
    isSun: true,
  },
  {
    id: '2',
    tags: [{ color: 'ye200', text: '콘텐츠' }],
    title: '삐에로 아저씨',
    startTime: '13:00',
    endTime: '17:00',
    location: '잔디 공터 일대',
    isSun: true,
  },
  {
    id: '3',
    tags: [{ color: 'or100', text: '공연무대' }],
    title: 'KINO',
    startTime: '17:00',
    endTime: '17:30',
    location: '공연장',
    isSun: true,
  },
  {
    id: '4',
    tags: [{ color: 'or100', text: '공연무대' }],
    title: '학생 특별공연',
    startTime: '17:30',
    endTime: '18:00',
    location: '공연장',
    isSun: true,
  },
  {
    id: '5',
    tags: [{ color: 'or100', text: '공연무대' }],
    title: 'NCT 마크',
    startTime: '18:15',
    endTime: '18:45',
    location: '공연장',
    isSun: false,
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
      <div style={{ padding: '1.3rem 1rem' }}>
        <img src={logo} style={{ position: 'relative' }} width="150px" />
      </div>
      <S.Main>
        <section>
          <S.TitleWrapper style={{ margin: '0px auto' }}>
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
            <S.BlackButton whileTap={{ scale: 0.95 }} onClick={() => navigate('/main/notice')}>
              <S.BtnText>모두 보기</S.BtnText>
              <Right width={'1rem'} height={'1rem'} />
            </S.BlackButton>
          </S.TitleWrapper>
          <NoticeSlider />
        </section>

        <Menu />
        <Footer />
      </S.Main>
    </S.Container>
  );
}
