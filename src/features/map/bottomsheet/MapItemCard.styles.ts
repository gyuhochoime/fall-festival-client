import styled from 'styled-components';

export const MapItemCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 20.9375rem;
  gap: 0.75rem;
  border-radius: 0.75rem;
  background-color: ${(props) => props.theme.colors.grayScale.white};
  cursor: pointer;
  overflow: hidden;
`;

export const BoothCardContainer = styled.div`
  display: flex;
  width: 20.9375rem; /* 335px */
  align-items: center;
  gap: 0.75rem; /* 12px */
  cursor: pointer;

  &:active {
    background-color: ${(props) => props.theme.colors.grayScale.gy50};
  }
`;

export const ItemImage = styled.img`
  width: 4.5rem; /* 72px */
  height: 4.5rem; /* 72px */
  flex-shrink: 0;
  border-radius: 0.439rem;
  object-fit: cover;
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ItemTitle = styled.h3`
  color: ${(props) => props.theme.colors.grayScale.gy900};
  font-size: 1rem;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.02rem;
  margin: 0.0938rem 0 0;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemCategory = styled.span`
  color: ${(props) => props.theme.colors.grayScale.gy700};
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.015rem;
  margin: 0.1563rem 0 0;
`;

// 주점용 스타일 컴포넌트들 (ImageTextFrameWithTime에서 복사)
export const BoothContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  flex: 1;
  flex-grow: 1;
  min-width: 0;
  gap: 0.25rem;
`;

export const BoothTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  overflow: hidden;
  min-width: 0;
`;

export const BoothTitle = styled.p`
  ${(props) => props.theme.fonts.header.h4}
  color: ${(props) => props.theme.colors.grayScale.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 0 1 auto;
`;

export const BoothTitleDivider = styled.div`
  width: 0.063rem;
  height: 1rem;
  background-color: ${(props) => props.theme.colors.grayScale.gy100};
  flex-shrink: 0;
  margin: 0 0.125rem;
`;

export const BoothSubTitle = styled.span`
  ${(props) => props.theme.fonts.body.medium400}
  color: ${(props) => props.theme.colors.grayScale.gy200};
  white-space: nowrap;
  flex: 0 0 auto;
`;

export const BoothContentsFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
`;

export const BoothTimeWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

export const BoothTime = styled.p`
  ${(props) => props.theme.fonts.body.small400}
  color: ${(props) => props.theme.colors.grayScale.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 10rem;
`;

export const BoothLinkToDetail = styled.div`
  display: flex;
  width: 3.75rem;
  height: 1.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.625rem;
  background-color: ${(props) => props.theme.colors.secondary.pk100};
  ${(props) => props.theme.fonts.body.xsmall400};
  border-radius: 0.375rem;
  color: ${(props) => props.theme.colors.grayScale.white};
  flex-shrink: 0;
`;
