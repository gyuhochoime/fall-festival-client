import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background-color: ${(props) => props.theme.colors.grayScale.white};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1.5rem;
  overflow: hidden;
`;

export const Title = styled.h1`
  ${(props) => props.theme.fonts.header.h2};
  color: ${(props) => props.theme.colors.grayScale.gy900};
  text-align: center;
  margin: 0;
`;

export const Description = styled.p`
  ${(props) => props.theme.fonts.body.medium400};
  color: ${(props) => props.theme.colors.grayScale.gy600};
  text-align: center;
  line-height: 1.6;
  margin: 0;
`;

export const ComingSoon = styled.div`
  ${(props) => props.theme.fonts.header.h3};
  color: ${(props) => props.theme.colors.primary.bl400};
  text-align: center;
  padding: 0.75rem 1.5rem;
  border: 2px solid ${(props) => props.theme.colors.primary.bl400};
  border-radius: 2rem;
  background-color: ${(props) => props.theme.colors.grayScale.gy50};
  margin: 0;
`;
