import styled from 'styled-components';

interface ImageProps {
  $hasImage?: boolean;
}

export const Container = styled.div<ImageProps>`
  display: flex;
  width: 20.9375rem;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.grayScale.white};
  cursor: pointer;
  box-shadow: 0 0 12px 0 rgb(126 65 154 / 30%);
  overflow: hidden; /* Add overflow hidden to clip the image within border-radius */

  &:active {
    background-color: ${(props) => props.theme.colors.grayScale.white};
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px; /* Match container border-radius */
  background-color: transparent;
`;
