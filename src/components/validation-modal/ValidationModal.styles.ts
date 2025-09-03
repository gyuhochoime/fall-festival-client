import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${(props) => props.theme.colors.grayScale.white};
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
  white-space: pre-line;
`;

export const ModalText = styled.p`
  ${(props) => props.theme.fonts.body.small400};
  color: ${(props) => props.theme.colors.grayScale.black};
  text-align: center;
`;

export const ConfirmButton = styled.button`
  padding: 7px 20px;
  background: ${(props) => props.theme.colors.primary.violet};
  border-radius: 14px;
  border: none;
  color: ${(props) => props.theme.colors.grayScale.white};
  ${(props) => props.theme.fonts.body.small400};
  cursor: pointer;
`;
