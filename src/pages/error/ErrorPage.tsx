import { useNavigate } from 'react-router-dom';
import * as S from './ErrorPage.styles';

import BackIcon from '@/assets/icons/left-arrow.svg?react';
import ErrorIcon from '@/assets/icons/error.svg?react';
import { AccentButton } from '@/components/accentbuttons';

interface ErrorPageProps {
  mainText?: string;
  subText?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

const ErrorPage = ({
  mainText = '오류가 발생했습니다',
  subText = '',
  showBackButton = false,
  showHomeButton = true,
}: ErrorPageProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <S.ErrorPageContainer>
      {showBackButton ? (
        <S.BackButton>
          <BackIcon
            style={{ cursor: 'pointer' }}
            width={'0.95rem'}
            height={'0.95rem'}
            onClick={handleGoBack}
          />
        </S.BackButton>
      ) : (
        <S.MainLogo />
      )}
      <S.ErrorContent>
        <S.ErrorIconWrapper>
          <ErrorIcon width="4rem" height="4rem" />
        </S.ErrorIconWrapper>
        <S.ErrorMainText>{mainText}</S.ErrorMainText>
        {subText ? <S.ErrorSubText>{subText}</S.ErrorSubText> : <br />}
        {showHomeButton && <AccentButton onClick={() => navigate('/')} label="홈으로 가기" />}
      </S.ErrorContent>
    </S.ErrorPageContainer>
  );
};

export default ErrorPage;
