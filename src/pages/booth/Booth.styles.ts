import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  position: relative;
  padding-top: 3.875rem;
`;

export const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const TabNavContainer = styled.div`
  position: fixed;
  top: 3.875rem;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.grayScale.white};
  z-index: 100;
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 24px;
  gap: 0.5rem;
  margin: 0 auto 1rem;
  width: 360px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.grayScale.gy50};
`;

export const TabButton = styled.button<{ $active: boolean }>`
  ${(props) => props.theme.fonts.body.xsmall400};
  width: 200px;
  height: 40px;
  border-radius: 24px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary.violet : 'transparent')};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.grayScale.white : theme.colors.grayScale.gy600};

  &:hover {
    opacity: 0.8;
  }
`;
