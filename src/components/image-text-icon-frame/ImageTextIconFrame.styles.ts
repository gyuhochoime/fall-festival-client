import styled from 'styled-components';

interface ImageProps {
  $hasImage?: boolean;
}

export const Container = styled.div<ImageProps>`
  display: flex;
  width: 20.9375rem;
  padding: ${({ $hasImage }) =>
    $hasImage ? '0.7rem 0.6rem 0.7rem 0.85rem' : '0.87rem 0.6rem 0.87rem 1.225rem'};
  align-items: center;
  gap: 1.25rem;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.grayScale.white};
  cursor: pointer;
  box-shadow: 0 0 12px 0 rgb(126 65 154 / 30%);

  &:active {
    background-color: ${(props) => props.theme.colors.grayScale.white};
  }
`;

export const Image = styled.img`
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: transparent;
`;

export const TextWrap = styled.div<ImageProps>`
  display: flex;
  flex-direction: column;
  width: ${({ $hasImage }) => ($hasImage ? '12.1875rem' : '16.5625rem')};
  gap: 0.125rem;
`;

export const TitleText = styled.p`
  ${(props) => props.theme.fonts.header.h4};
  align-self: stretch;
  color: ${(props) => props.theme.colors.grayScale.black};
`;

export const DescriptionText = styled.p`
  ${(props) => props.theme.fonts.body.xsmall400};
  align-self: stretch;
  color: ${(props) => props.theme.colors.grayScale.black};
`;

export const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 20px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
`;
