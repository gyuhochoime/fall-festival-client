import * as S from './Polaroid.styles';
import { NavBar } from '@/components/nav-bar';

/**
 * 폴라로이드 페이지 컴포넌트
 * 프레임이 씌워진 사진을 촬영할 수 있는 기능을 제공합니다.
 * @returns {JSX.Element} 폴라로이드 페이지 컴포넌트
 */
export default function Polaroid() {
  return (
    <S.Container>
      <NavBar isBack={true} title="폴라로이드" backPath="/main" />
      <S.Content>
        <S.Title>축제 폴라로이드 📸</S.Title>
        <S.Description>축제의 추억을 특별한 프레임으로 담아보세요!</S.Description>
        <S.ComingSoon>Coming Soon...</S.ComingSoon>
      </S.Content>
    </S.Container>
  );
}
