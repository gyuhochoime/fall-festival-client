import * as S from './User.styles';
import { NavBar } from '@/components/nav-bar';

export default function User() {
  return (
    <S.Container>
      <NavBar />
      <S.Wrapper>
        <S.MessageBox>
          <S.Title>웨이팅 기능이 제거되었습니다</S.Title>
          <S.Description>축제를 즐겨주세요!</S.Description>
        </S.MessageBox>
      </S.Wrapper>
    </S.Container>
  );
}
