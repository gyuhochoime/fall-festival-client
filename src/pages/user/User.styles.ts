import styled from 'styled-components';

export const Container = styled.div``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.25rem 6.25rem;
  height: calc(100vh - 4.375rem);
  overflow-y: auto;
  justify-content: center;
  align-items: center;
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.grayScale.gy500};
`;
