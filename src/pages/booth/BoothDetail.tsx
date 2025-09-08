import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/nav-bar';
import * as S from './BoothDetail.styles';
import { BoothInfo, BoothLocation, MenuList } from '@/features/booth';
import { useBooth } from '@/hooks/useBooth';

export default function BoothDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const handleBackClick = () => {
    const from = location.state?.from;
    // 검색에서 온 경우에만 검색으로 돌아가기, 그 외에는 주점 메인으로
    if (from === '/booth/search') {
      navigate('/booth/search');
    } else {
      navigate('/booth');
    }
  };
  const { booth, error } = useBooth(Number(id) || 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error || !booth) {
    navigate('/error', {
      state: {
        mainText: '서버가 힘들어하고 있어요.',
        subText: '멋사가 금방 고쳐올테니, 잠시 후에 다시 와주세요!',
        showBackButton: true,
        showHomeButton: true,
      },
    });
    return null;
  }

  return (
    <S.Container>
      <NavBar isBack hideRight title="주점 정보" onBackClick={handleBackClick} />
      <S.BackgroundImg src={booth.posterImage} />
      <S.Section style={{ marginTop: '-2rem' }}>
        <BoothInfo id={booth.id} />
      </S.Section>
      <S.HorizontalLine />
      <S.BorderSection>
        <MenuList id={booth.id} />
      </S.BorderSection>
      <S.HorizontalLine />
      <S.BorderSection data-section="location">
        <BoothLocation id={booth.id} boothLocation={booth.locate} />
      </S.BorderSection>
      <S.HorizontalLine />
      <S.BottomPadding />
    </S.Container>
  );
}
