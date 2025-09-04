import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

export const CardWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  padding: 0;

  /* 슬라이더 전체 컨테이너 */
  .slick-slider {
    display: flex;
    justify-content: center;
    width: 100%;
    overflow: visible;
    margin: 0 auto;
  }

  /* slick-track 설정 */
  .slick-track {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 0 auto !important; /* 중요: 트랙을 완벽히 중앙에 배치 */
  }

  .slick-list {
    width: 100%;
    margin: 0 auto; /* 리스트도 중앙 정렬 */
    overflow: visible;
  }
`;

export const FloatingPill = styled.div`
  position: absolute;
  bottom: 1.6rem;
  right: 2.5rem;
  padding: 0.25rem 0.7rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.secondary.vl800}80;
  color: ${(props) => props.theme.colors.grayScale.white};
  ${(props) => props.theme.fonts.body.xsmall400}
  z-index: 10;
  backdrop-filter: blur(4px);

  span {
    opacity: 0.7;
  }
`;
