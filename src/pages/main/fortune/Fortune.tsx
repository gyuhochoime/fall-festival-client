import { useEffect } from 'react';
import { NavBar } from '@/components/nav-bar';
import * as S from './Fortune.styles';
import { useLayoutStore } from '@/stores/useLayoutStore';
// 하냥이 캐릭터 이미지 - 실제 이미지 경로로 수정 필요
// import HanyangCharacter from '@/assets/images/hanyang_character.png';

/**
 * Fortune 컴포넌트 - 오늘의 운세를 보여주는 페이지
 * MadeBy처럼 전체 화면 사용, navbar 숨김
 * @returns {JSX.Element}
 */
export default function Fortune() {
  const setIsNav = useLayoutStore((state) => state.setIsNav);

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  return (
    <S.Container>
      <NavBar title="오늘의 운세" isBack={true} backPath="/main" />

      <S.Content>
        <S.Title>🔮 하냥이의 운세 점</S.Title>
        <S.Subtitle>하냥이가 여러분의 운세를 알려드려요!</S.Subtitle>

        <S.FortuneCard>
          <S.FortuneIcon>🌟</S.FortuneIcon>
          <S.FortuneType>오늘의 운세</S.FortuneType>
          <p>내용</p>

          <S.LuckyItem>
            <S.LuckyLabel>Label</S.LuckyLabel>
            <S.LuckyValue>Value</S.LuckyValue>
          </S.LuckyItem>
        </S.FortuneCard>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <S.RefreshButton>다시 운세 보기</S.RefreshButton>
        </div>
      </S.Content>
    </S.Container>
  );
}
