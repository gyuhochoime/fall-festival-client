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
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fromRef = useRef(location.state?.from || '/booth');
  const { booth, loading, error } = useBooth(Number(id) || 0);
  const { handleToggleFavorite, isFavorited } = useFavorites();

  const handleCloseClick = () => {
    navigate('/booth');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <S.Container>
        <NavBar
          isBack
          hideRight
          title="주점 정보"
          backPath={fromRef.current}
          onCloseClick={handleCloseClick}
        />
        <S.LoadingText>주점 정보를 불러오는 중...</S.LoadingText>
      </S.Container>
    );
  }

  if (error || !booth) {
    return (
      <S.Container>
        <NavBar isBack hideRight title="주점 정보" backPath={fromRef.current} />
        <S.LoadingText>{error || '주점을 찾을 수 없습니다.'}</S.LoadingText>
      </S.Container>
    );
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
