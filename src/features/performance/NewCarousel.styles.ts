import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CarouselWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`;

export const CarouselItem = styled.div`
  flex-shrink: 0;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 12.25rem;
  height: 23.125rem;
`;

export const ArtistTimeBox = styled.div<{ fade: 'in' | 'out' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  opacity: ${(props) => (props.fade === 'in' ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export const ArtistName = styled.h3`
  ${(props) => props.theme.fonts.header.h4_600};
  color: ${(props) => props.theme.colors.grayScale.black_1a1a};
  text-align: center;
`;

export const TimeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  align-self: stretch;
`;

export const TimeText = styled.span`
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.grayScale.gy800};
`;

export const NorthStar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VerticalLine = styled.div`
  width: 0.0625rem;
  height: 4.5rem;
  background: ${(props) => props.theme.colors.primary.violet};
`;

export const ArtistCircle = styled.div<{ $isActive?: boolean }>`
  width: 12.25rem;
  height: 12.25rem;
  border-radius: 50%;
  background: ${(props) =>
    props.$isActive ? 'rgba(126, 65, 154, 0.2)' : props.theme.colors.grayScale.white};
  border: ${(props) =>
    props.$isActive ? `0.0625rem solid ${props.theme.colors.primary.violet}` : 'none'};
  box-shadow: ${(props) =>
    props.$isActive ? '0 0 1.5rem rgba(126, 65, 154, 0.8)' : '0 0 0.75rem rgba(126, 65, 154, 0.3)'};
  position: relative;
  overflow: hidden;
`;

export const ArtistImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
