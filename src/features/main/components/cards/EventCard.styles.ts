import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 20rem;
  flex-direction: column;
  align-items: flex-start;
  background-color: #dfc9ffff;
  box-shadow: 0 0 10px 0 #dbc2e3;
  border-radius: 15px;
  margin: 15px;
`;

export const HeaderSection = styled.div`
  display: flex;
  padding: 0.875rem 1.25rem 0.75rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const InfoSection = styled.div`
  display: flex;
  padding: 1.5rem 0rem;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const EventTitle = styled.p`
  ${(props) => props.theme.fonts.header.h3}
  text-align: center;
  color: ${(props) => props.theme.colors.grayScale.gy950};
  margin-bottom: 5px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  color: ${(props) => props.theme.colors.grayScale.gy800};
  padding: 0.5rem 0;
`;

export const TextWrapper = styled.div`
  ${(props) => props.theme.fonts.header.h3}
  display: flex;
  text-align: center;
  gap: 0.25rem;
`;

export const EventText = styled.p`
  ${(props) => props.theme.fonts.body.xsmall500}
`;
