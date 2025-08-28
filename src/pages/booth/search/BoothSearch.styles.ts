import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.grayScale.white};
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  flex: 1;
  overflow-y: auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.9375rem;
  gap: 1.5rem;
  padding: 1rem 0rem;
`;

export const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  padding: 1rem 3rem 1rem 1rem;
  border: transparent;
  background: ${(props) => props.theme.colors.grayScale.gy100};
  border-radius: 12px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary.violet};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale.gy500};
    ${(props) => props.theme.fonts.body.small400};
  }
`;

export const SearchIconWrapper = styled.div<{ $isClickable?: boolean }>`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: ${({ $isClickable }) => ($isClickable ? 'auto' : 'none')};
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  color: ${(props) => props.theme.colors.grayScale.gy500};
`;

export const ResultsHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Count = styled.p`
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.grayScale.gy500};
`;

export const ResultsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0rem 0rem 13.12rem;
  margin: 0;
`;

export const ResultItem = styled.li`
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

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 0;
`;

export const EmptyText = styled.p`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.grayScale.gy400};
  text-align: center;
`;

export const NoResultsState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 0;
`;

export const NoResultsText = styled.p`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.grayScale.gy400};
  text-align: center;
`;
