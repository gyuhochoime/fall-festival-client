import styled from 'styled-components';
import { ColorKey, PrimaryKeys, SecondaryKeys } from '@/components/colorbuttons/ColorButton.types';

interface StyledColorButtonProps {
  $backgroundColor: ColorKey | string;
}

export const StyledColorButton = styled.span<StyledColorButtonProps>`
  display: inline-flex;
  height: 1.5rem;
  padding: 0.0625rem 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  background-color: ${({ $backgroundColor, theme }) => {
    if ($backgroundColor in theme.colors.primary) {
      return theme.colors.primary[$backgroundColor as PrimaryKeys];
    }
    if ($backgroundColor in theme.colors.secondary) {
      return theme.colors.secondary[$backgroundColor as SecondaryKeys];
    }
    return $backgroundColor;
  }};
  color: ${(props) => props.theme.colors.grayScale.white};
  ${({ theme }) => theme.fonts.body.xsmall500};
`;
