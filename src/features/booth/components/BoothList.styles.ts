import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.9375rem;
  gap: 1.5rem;
  padding: 1rem 0rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Count = styled.p`
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.grayScale.gy500};
`;

export const BoothList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0rem 0rem 13.12rem;
  margin: 0;
`;

export const BoothItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.grayScale.gy200};
`;

export const BoothItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;
`;

export const FavoriteButton = styled.button<{ $isFavorited: boolean }>`
  flex-shrink: 0;
  gap: 0.4375rem;
  border: ${({ $isFavorited, theme }) =>
    $isFavorited ? 'none' : `1px solid ${theme.colors.primary.violet}`};
  background: ${({ $isFavorited, theme }) => ($isFavorited ? theme.colors.primary.violet : 'none')};
  border-radius: 0.75rem;
  width: 3.375rem;
  height: 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: ${({ $isFavorited, theme }) => ($isFavorited ? '#ffffff' : theme.colors.primary.violet)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;
