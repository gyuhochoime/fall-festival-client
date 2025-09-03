import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  width: 18.4375rem;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  border-radius: 1.25rem;
  background: ${(props) => props.theme.colors.grayScale.white};
`;

export const ModalTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
`;

export const ModalText = styled.p`
  ${(props) => props.theme.fonts.body.s500};
  color: ${(props) => props.theme.colors.grayScale.black};
  text-align: center;
`;
