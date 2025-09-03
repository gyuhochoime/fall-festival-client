import { NavBar } from '@/components/nav-bar/NavBar';
import { BoothList } from '@/features/booth';
import { useNavigate } from 'react-router-dom';

import * as S from './Favorites.styles';

export default function Favorites() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/booth/search');
  };

  return (
    <S.Container>
      <NavBar hideLeft isSearch title="주점" onSearchClick={handleSearchClick} />
      <S.Main>
        <BoothList showFavoritesOnly={true} />
      </S.Main>
    </S.Container>
  );
}
