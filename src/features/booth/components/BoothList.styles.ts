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
  position: relative;
  width: 100%;
`;

export const FavoriteButton = styled.button<{ $isFavorited: boolean }>`
  position: absolute;
  top: 12px;
  right: 0px;
  gap: 7px;
  border: ${({ $isFavorited, theme }) =>
    $isFavorited ? 'none' : `1px solid ${theme.colors.primary.violet}`};
  background: ${({ $isFavorited, theme }) => ($isFavorited ? theme.colors.primary.violet : 'none')};
  border-radius: 12px;
  width: 54px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ $isFavorited, theme }) => ($isFavorited ? '#ffffff' : theme.colors.primary.violet)};
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  margin-right: 0;
`;
