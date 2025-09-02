import styled from 'styled-components';
import EventBannerBg from '@/assets/images/event-banner-bg.webp';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-image: url(${EventBannerBg});
  background-size: cover;
  box-shadow: 0 0 10px 0 #dbc2e3;
  border-radius: 1rem;
  margin: 0.8rem auto;
  height: 11rem;
  max-width: 21rem; /* 모바일에서 너무 커지는 것 방지 */
`;

export const HeaderSection = styled.div`
  display: flex;
  padding: 0.875rem 1.25rem 0.75rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const InfoSection = styled.div`
  display: flex;
  padding: 1.5rem 0rem;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  height: 100%;
  justify-content: center;
`;

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const EventTitle = styled.p`
  ${(props) => props.theme.fonts.header.h3}
  text-align: center;
  color: ${(props) => props.theme.colors.secondary.vl900};
  margin-bottom: 5px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  color: ${(props) => props.theme.colors.secondary.vl800};
  padding: 0.5rem 0;
`;

export const TextWrapper = styled.div`
  ${(props) => props.theme.fonts.header.h3}
  display: flex;
  text-align: center;
  gap: 0.25rem;

  .location-icon {
    path {
      stroke: ${(props) => props.theme.colors.secondary.vl800};
    }
  }
`;

export const EventText = styled.p`
  ${(props) => props.theme.fonts.body.xsmall500}
`;

export const Pill = styled.div`
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
  padding: 0.25rem 0.7rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.secondary.vl800}80;
  color: ${(props) => props.theme.colors.grayScale.white};
  ${(props) => props.theme.fonts.body.xsmall400}

  span {
    opacity: 0.7;
  }
`;
