import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #7e419a 0%, #2d1c46 49%);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 3.875rem;
`;

export const Content = styled.div`
  padding: 1rem 1.5rem 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  flex: 1;
  max-width: 500px;
  width: 100%;
`;

export const Title = styled.p`
  margin-top: 35px;
  ${(props) => props.theme.fonts.header.h4};
  color: ${({ theme }) => theme.colors.grayScale.white};
  text-shadow: 0px 0px 6px ${({ theme }) => theme.colors.grayScale.white};
  text-align: center;
  line-height: 1.5;
  white-space: pre-line;
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500px;
  margin-top: 0rem;
`;

export const Card = styled.img<{ $isFlipped: boolean }>`
  width: 295px;
  height: 440px;
  cursor: pointer;
  transition: all 0.8s ease;
  transform-style: preserve-3d;
  box-shadow:
    0 20px 40px rgb(0 0 0 / 30%),
    0 8px 16px rgb(0 0 0 / 20%);
  border-radius: 12px;
  border: none;
  background: transparent;

  ${({ $isFlipped }) =>
    $isFlipped &&
    `
    transform: scale(1.02);
  `}

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: ${({ $isFlipped }) => ($isFlipped ? 'scaleX(-1) scale(0.75)' : 'scale(0.75)')};
  }
`;
