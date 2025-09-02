import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3.875rem;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 21rem;
  gap: 0.375rem;
`;

// 로딩, 에러, 빈 목록 메시지용 스타일
export const LoadingWrapper = styled.div`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.grayScale.gy700};
  text-align: center;
  padding: 2rem 0;
  width: 21rem;
  margin-top: 1rem;
`;

export const ErrorWrapper = styled.div`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.secondary.rd500};
  text-align: center;
  padding: 2rem 0;
  width: 21rem;
  margin-top: 1rem;
`;

export const NoNoticesWrapper = styled.div`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.grayScale.gy700};
  text-align: center;
  padding: 2rem 0;
  width: 21rem;
`;
