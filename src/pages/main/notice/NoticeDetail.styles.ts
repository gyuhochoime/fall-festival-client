import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.colors.grayScale.black};
  width: 100%;
  padding-top: 3.875rem;
  overflow: hidden;
`;

// 로딩 및 에러 텍스트 스타일
export const LoadingText = styled.p`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.grayScale.gy700};
  text-align: center;
  padding: 2rem;
  width: 100%;
`;

export const ErrorText = styled.p`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.secondary.rd500};
  text-align: center;
  padding: 2rem;
  width: 100%;
`;
