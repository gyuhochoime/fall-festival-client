import { NavBar } from '@/components/nav-bar/NavBar';
import { BoothList } from '@/features/booth';
import * as S from './Booth.styles';

export default function Booth() {
  return (
    <S.Container>
      <NavBar />
      <S.Main>
        <BoothList />
      </S.Main>
    </S.Container>
  );
}
