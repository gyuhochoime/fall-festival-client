import { NavBar } from '@/components/nav-bar/NavBar';
import { BoothList } from '@/features/booth';
import { useNavigate } from 'react-router-dom';

import * as S from './Booth.styles';

export default function Booth() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/booth/search');
  };

  return (
    <S.Container>
      <NavBar hideLeft isSearch title="주점" onSearchClick={handleSearchClick} />
      <S.Main>
        <BoothList />
      </S.Main>
    </S.Container>
  );
}
