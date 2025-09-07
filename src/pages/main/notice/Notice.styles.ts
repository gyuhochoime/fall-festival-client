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
  width: 21rem;
  gap: 0.375rem;
`;

export const NoticeTabsWrapper = styled.div`
  margin-bottom: 0.5rem;

  button[data-active='false'] {
    background-color: ${({ theme }) => theme.colors.grayScale.gy50} !important;
    border-color: transparent !important;

    p {
      color: ${({ theme }) => theme.colors.grayScale.gy800} !important;
      font-weight: 400;
    }
  }

  button[data-active='true'] {
    background-color: ${({ theme }) => theme.colors.primary.violet} !important;

    p {
      color: ${({ theme }) => theme.colors.grayScale.white} !important;
      font-weight: 600;
    }
  }
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
