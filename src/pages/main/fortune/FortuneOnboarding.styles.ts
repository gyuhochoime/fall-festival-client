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
  padding: 1rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  max-width: 500px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  margin-top: 35px;
  ${(props) => props.theme.fonts.header.h4};
  color: ${({ theme }) => theme.colors.grayScale.white};
  text-shadow: 0px 0px 6px ${({ theme }) => theme.colors.grayScale.white};
  text-align: center;
  line-height: 1.5;
  white-space: pre-line;
`;

export const Memo = styled.p`
  ${(props) => props.theme.fonts.body.xsmall400};
  color: ${({ theme }) => theme.colors.grayScale.white}75;
  text-shadow: 0px 0px 5px ${({ theme }) => theme.colors.grayScale.white}75;
  text-align: center;
  margin-top: 3px;
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  max-width: 400px;
  margin-top: 3px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2px;
`;

export const Input = styled.input`
  padding: 0.75rem 1.2rem;
  border: none;
  outline: none;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.grayScale.white}98;
  font-size: ${(props) => props.theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.primary.violet};

  &::placeholder {
    color: ${({ theme }) => theme.colors.primary.violet};
  }
`;

export const FortuneCard = styled.div`
  background: ${({ theme }) => theme.colors.secondary.vl100}40;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  height: 350px;
  max-width: 400px;
  text-align: center;
  margin-top: 30px;
`;

export const RefreshButton = styled.button`
  ${(props) => props.theme.fonts.header.h4};
  background: ${({ theme }) => theme.colors.primary.violet};
  width: 100%;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0px 0px 8px ${({ theme }) => theme.colors.primary.violet};
  margin-top: 5px;
`;
