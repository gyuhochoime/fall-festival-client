import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavBar } from '@/components/nav-bar';
import * as S from './FortuneResult.styles';
import { useLayoutStore } from '@/stores/useLayoutStore';
import FortuneCardBack from '@/assets/images/fortune/FortuneCardBack_big.webp';
import ResultDummy from '@/assets/images/fortune/resultdummy.webp';

interface LocationState {
  selectedCardIndex: number;
  name: string;
  birthDate: string;
}

export default function FortuneResult() {
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const location = useLocation();
  const [isFlipped, setIsFlipped] = useState(false);

  const state = location.state as LocationState;
  const selectedCardIndex = state?.selectedCardIndex ?? 0;
  const name = state?.name || 'Username';

  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const handleCloseClick = () => {
    navigate('/main');
  };

  const handleCardClick = () => {
    setIsFlipped(true);
  };

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  return (
    <S.Container>
      <NavBar hideLeft isClose={true} onCloseClick={handleCloseClick} opacity={true} />

      <S.Content>
        <S.Title>
          {!isFlipped
            ? '선택된 카드를 클릭하여 \n 운세를 확인해보세요!'
            : `${month}월 ${day}일의 ${name}님은 \n 이만큼 행복할 거예요!`}
        </S.Title>

        <S.CardContainer>
          <S.Card
            src={isFlipped ? ResultDummy : FortuneCardBack}
            alt={`selected fortune card ${selectedCardIndex + 1}`}
            onClick={handleCardClick}
            $isFlipped={isFlipped}
          />
        </S.CardContainer>
      </S.Content>
    </S.Container>
  );
}
