import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #7e419a 0%, #2d1c46 49%);
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  padding-top: 3.875rem;
`;

export const Content = styled.div`
  padding: 1rem 1.5rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: 1;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`;

export const Subtitle = styled.p`
  margin-top: 1rem;
  ${(props) => props.theme.fonts.header.h4};
  color: ${({ theme }) => theme.colors.grayScale.white};
  text-shadow: 0px 0px 6px ${({ theme }) => theme.colors.grayScale.white};
  text-align: center;
  line-height: 1.5;
  white-space: pre-line;
`;

export const Memo = styled.p`
  width: calc(100% - 2rem);
  max-width: 400px;
  ${(props) => props.theme.fonts.body.xsmall400};
  color: ${({ theme }) => theme.colors.grayScale.white}75;
  text-shadow: 0px 0px 5px ${({ theme }) => theme.colors.grayScale.white}75;
  text-align: center;
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  max-width: 400px;
  margin-top: 1rem;
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

export const Fortunelotties = styled.div`
  background: transparents;
  border-radius: 16px;
  padding: 0rem;
  width: 100%;
  height: 350px;
  max-width: 400px;
  text-align: center;
  margin: 0rem;
`;

export const RefreshButton = styled.button`
  ${(props) => props.theme.fonts.header.h4};
  background: ${({ theme }) => theme.colors.primary.violet};
  width: calc(100% - 2.5rem);
  max-width: 400px;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0px 0px 8px ${({ theme }) => theme.colors.primary.violet};
  position: fixed;
  bottom: 3.7rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;
