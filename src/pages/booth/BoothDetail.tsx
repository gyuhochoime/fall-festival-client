import { useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/nav-bar';
import * as S from './BoothDetail.styles';
import { BoothInfo, BoothLocation, MenuList } from '@/features/booth';
import FavoriteOn from 'src/assets/icons/favorite-on.svg?react';
import FavoriteOff from 'src/assets/icons/favorite-off.svg?react';
import { useFavorites } from '@/hooks/useFavorites';
import { useBooth } from '@/hooks/useBooth';

export default function BoothDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const fromRef = useRef(location.state?.from || '/booth');
  const { booth, error } = useBooth(Number(id) || 0);
  const { handleToggleFavorite, isFavorited } = useFavorites();

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

  const isBoothFavorited = isFavorited(booth.id);

  return (
    <S.Container>
      <NavBar isBack hideRight title="주점 정보" backPath={fromRef.current} />
      <S.BackgroundImg src={booth.posterImage} />
      <S.FavoriteButton
        onClick={(e) => handleToggleFavorite(booth.id, e)}
        $isFavorited={isBoothFavorited}
        aria-label={isBoothFavorited ? '찜 완료' : '찜하기'}
      >
        {isBoothFavorited ? <FavoriteOn /> : <FavoriteOff />}
        {isBoothFavorited ? '찜 완료' : '찜하기'}
      </S.FavoriteButton>
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
