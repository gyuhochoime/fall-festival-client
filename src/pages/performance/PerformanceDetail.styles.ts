import styled from 'styled-components';

export const DetailsContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100dvh;
  background: linear-gradient(
    180deg,
    rgb(249 235 255 / 20%) 13.46%,
    rgb(182 121 211 / 20%) 50%,
    rgb(255 255 255 / 20%) 74.52%
  );
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  height: 56px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  border-bottom: 1px solid ${(p) => p.theme.colors.grayScale.gy100};
`;

export const HeaderButton = styled.button`
  height: 100%;
  background: transparent;
  border: none;
  color: ${(p) => p.theme.colors.grayScale.gy900};
  ${(p) => p.theme.fonts.header.h3};
`;

export const HeaderTitle = styled.div`
  text-align: center;
  ${(p) => p.theme.fonts.header.h4};
  color: ${(p) => p.theme.colors.grayScale.gy900};
`;

export const Fullscreen = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: visible;
  min-height: 0;
  padding-bottom: 5rem;
`;

export const ArtistInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 5.875rem;
`;

export const ArtistCircleWrapper = styled.div`
  display: inline-flex;
  padding: 0.625rem;
  align-items: center;
  gap: 0.625rem;
`;

export const ArtistCircle = styled.div`
  width: 15rem;
  height: 15rem;
  flex-shrink: 0;
  background-color: #eee;
  border-radius: 50%;
  filter: drop-shadow(0 0 12px rgb(126 65 154 / 30%));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const ArtistCircleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const ArtistTextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const ArtistName = styled.h3`
  color: #1a1a1a;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 142%;
  letter-spacing: -0.025rem;
  margin: 0;
`;

export const ArtistGenre = styled.span`
  color: #616161;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.02rem;
`;

export const ArtistInfoBox = styled.div`
  display: flex;
  width: 100%;
  place-content: center center;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const InfoText = styled.span`
  color: #616161;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.014rem;
`;

export const ImageWrap = styled.div<{ $url: string }>`
  display: flex;
  width: 23.4375rem;
  height: 32.375rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-image:
    linear-gradient(180deg, rgb(23 23 27 / 0%) 0%, #17171b 100%), url(${(props) => props.$url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
`;

export const ImageTextWrap = styled.div`
  display: flex;
  width: 20.7011rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

export const SingerTimeBox = styled.div`
  display: flex;
  height: 3.625rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.1875rem;
`;

export const Singer = styled.p`
  ${(props) => props.theme.fonts.header.h1};
  color: ${(props) => props.theme.colors.grayScale.black};
`;

export const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0.375rem;
`;

export const Time = styled.p`
  ${(props) => props.theme.fonts.body.small400};
  color: ${(props) => props.theme.colors.grayScale.gy600};
  text-align: center;
  white-space: nowrap;
`;

export const Description = styled.p`
  ${(props) => props.theme.fonts.body.small400};
  color: ${(props) => props.theme.colors.grayScale.gy500};
`;
export const TitleSongWrap = styled.div`
  margin-top: 2.75rem;
  display: flex;
  width: 20.938rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const TitleSongText = styled.p`
  align-self: stretch;
  color: ${(props) => props.theme.colors.grayScale.black_1a1a};
  ${(props) => props.theme.fonts.header.h4_600};
`;

export const SongWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
`;

export const SongBox = styled.div`
  display: flex;
  padding: 0.75rem;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  border-radius: 1rem;
  background: ${(props) => props.theme.colors.grayScale.white};
  box-shadow: 0 0 0.75rem 0 rgb(126 65 154 / 30%);
  cursor: pointer;
  position: relative;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const SongImage = styled.img`
  width: 3rem;
  height: 3rem;
  aspect-ratio: 1/1;
  border-radius: 3.125rem;
  background: ${(props) => props.theme.colors.grayScale.gy200_eee};
`;

export const SongName = styled.p`
  overflow: hidden;
  color: ${(props) => props.theme.colors.grayScale.black_1a1a};
  text-overflow: ellipsis;
  ${(props) => props.theme.fonts.body.medium500};
`;

export const SongIcon = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
`;
