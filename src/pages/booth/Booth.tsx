import { NavBar } from '@/components/nav-bar/NavBar';
import { BoothList } from '@/features/booth';
import { useNavigate } from 'react-router-dom';

import * as S from './Booth.styles';

export default function Booth() {
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    navigate('/favorites');
  };

  const handleSearchClick = () => {
    navigate('/booth/search');
  };

  return (
    <S.Container>
      <NavBar
        isFavorite
        isSearch
        title="주점"
        onFavoriteClick={handleFavoriteClick}
        onSearchClick={handleSearchClick}
      />
      <S.Main>
        <BoothList />
      </S.Main>
    </S.Container>
  );
}
