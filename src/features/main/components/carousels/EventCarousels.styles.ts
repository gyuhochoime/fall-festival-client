import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CardWrap = styled.div`
  position: relative;
  width: 100dvw;

  /* slick-track가 두 줄로 깨지는 현상 방지 */
  .slick-track {
    display: flex !important;
    flex-wrap: nowrap !important;
  }
`;
