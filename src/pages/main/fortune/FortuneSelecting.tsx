import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavBar } from '@/components/nav-bar';
import * as S from './FortuneSelecting.styles';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useToastStore } from '@/stores/useToastStore';
import { useFortune } from '@/hooks/useFortune';
import FortuneCardBack from '@/assets/images/fortune/FortuneCardBack.webp';

interface LocationState {
  name: string;
  birthDate: string;
}

export default function FortuneSelecting() {
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const location = useLocation();
  const { getFortune, loading } = useFortune();
  const showToast = useToastStore((state) => state.showToast);

  const state = location.state as LocationState;
  const { name, birthDate } = state || { name: '', birthDate: '' };

  const handleCloseClick = () => {
    navigate('/main');
  };

  const handleCardClick = async (cardIndex: number) => {
    if (loading) return;

    try {
      const imageUrl = await getFortune({ name, birth: birthDate });
      navigate('/main/fortune/result', {
        state: {
          selectedCardIndex: cardIndex,
          name,
          birthDate,
          fortuneImageUrl: imageUrl,
        },
      });
    } catch {
      showToast('동시 접속자가 너무 많아\n잠시 후 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  return (
    <S.Container>
      <NavBar
        isBack
        isClose={true}
        onCloseClick={handleCloseClick}
        opacity={true}
        whiteIcons={true}
      />

      <S.Content>
        <S.Title>지금 이 순간 마음이 이끌리는 {'\n'} 카드 한 장을 뽑아주세요!</S.Title>

        <S.CardSection>
          <S.CardRow>
            <S.Card src={FortuneCardBack} alt="fortune card 1" onClick={() => handleCardClick(0)} />
            <S.Card src={FortuneCardBack} alt="fortune card 2" onClick={() => handleCardClick(1)} />
          </S.CardRow>
          <S.CardRow>
            <S.Card src={FortuneCardBack} alt="fortune card 3" onClick={() => handleCardClick(2)} />
            <S.Card src={FortuneCardBack} alt="fortune card 4" onClick={() => handleCardClick(3)} />
            <S.Card src={FortuneCardBack} alt="fortune card 5" onClick={() => handleCardClick(4)} />
          </S.CardRow>
        </S.CardSection>
      </S.Content>
    </S.Container>
  );
}
