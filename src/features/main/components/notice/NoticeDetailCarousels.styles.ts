import styled from 'styled-components';

export const CarouselWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: calc(100dvh - 15rem);
  object-fit: contain;
  background-color: transparent;
`;

export const Pill = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.25rem 0.7rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.secondary.vl800}80;
  color: ${(props) => props.theme.colors.grayScale.white};
  ${(props) => props.theme.fonts.body.xsmall400}

  span {
    opacity: 0.7;
  }
`;
