import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.colors.grayScale.black};
  width: 100%;
  padding-top: 3.875rem;
  overflow: hidden;
`;
