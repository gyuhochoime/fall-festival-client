import styled from 'styled-components';

export const FavoriteButton = styled.button<{
  $isFavorited: boolean;
  $variant: 'default' | 'large';
  $position: 'relative' | 'absolute';
  $mode?: 'favorite' | 'delete';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ $isFavorited, $mode, theme }) => {
    if ($mode === 'delete') return 'none';
    return $isFavorited ? 'none' : `1px solid ${theme.colors.primary.violet}`;
  }};
  background: ${({ $isFavorited, $mode, $variant, theme }) => {
    if ($mode === 'delete') return 'transparent';
    if ($variant === 'large') {
      return $isFavorited ? theme.colors.primary.violet : 'rgba(255, 255, 255, 0.9)';
    }
    return $isFavorited ? theme.colors.primary.violet : 'none';
  }};
  color: ${({ $isFavorited, $mode, theme }) => {
    if ($mode === 'delete') return theme.colors.grayScale.gy400;
    return $isFavorited ? '#ffffff' : theme.colors.primary.violet;
  }};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  position: ${({ $position }) => $position};

  ${({ $variant }) => {
    switch ($variant) {
      case 'large':
        return `
          width: 3.375rem;
          height: 4.4rem;
          flex-direction: column;
          gap: 0.4375rem;
          font-size: 0.75rem;
          top: 1.1rem;
        `;
      case 'default':
      default:
        return `
          flex-shrink: 0;
          width: 3.375rem;
          height: 4.5rem;
          flex-direction: column;
          gap: 0.4375rem;
          font-size: 0.75rem;
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

export const ButtonText = styled.span<{ $variant: 'default' | 'large' }>`
  ${(props) => props.theme.fonts.body.xsmall500};
  ${({ $variant }) => $variant === 'large' && 'text-align: center;'}
`;
