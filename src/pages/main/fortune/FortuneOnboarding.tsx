import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/nav-bar';
import * as S from './FortuneOnboarding.styles';
import { useLayoutStore } from '@/stores/useLayoutStore';
import Lottie from 'react-lottie-player';
import fortuneAnimation from '@/assets/lotties/Background_Size.json';
import FortuneBall from '@/assets/images/fortune/Ball.webp';

export default function FortuneOnboarding() {
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleCloseClick = () => {
    navigate('/main');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자만 허용
    setBirthDate(value);
  };

  const handleFortuneClick = () => {
    if (name.trim() && birthDate.length === 8) {
      navigate('/main/fortune/selecting', {
        state: { name, birthDate },
      });
    } else {
      alert('이름과 생년월일 8자리를 모두 입력해주세요.');
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
      <NavBar hideLeft isClose={true} onCloseClick={handleCloseClick} opacity={true} />

      <S.Content>
        <S.Subtitle>
          오늘은 어떤 하루가 될까요? {'\n'} 당신을 알려주시면 행운이 반짝일거예요!
        </S.Subtitle>
        <S.Fortunelotties>
          <Lottie
            loop
            animationData={fortuneAnimation}
            play
            style={{ width: '100%', height: '100%' }}
          />
          <img src={FortuneBall} />
        </S.Fortunelotties>
        <S.InputSection>
          <S.InputGroup>
            <S.Input
              type="text"
              placeholder="이름을 입력해주세요."
              value={name}
              onChange={handleNameChange}
            />
          </S.InputGroup>
          <S.InputGroup>
            <S.Input
              type="text"
              placeholder="생년월일 8자리를 입력해주세요."
              value={birthDate}
              onChange={handleBirthDateChange}
              maxLength={8}
            />
          </S.InputGroup>
          <S.RefreshButton onClick={handleFortuneClick}>오늘의 운세 보러가기</S.RefreshButton>
          <S.Memo>입력하신 정보는 축제가 끝나면 깨끗하게 사라져요</S.Memo>
        </S.InputSection>
      </S.Content>
    </S.Container>
  );
}
