import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 1.25rem;
  background: ${(props) => props.theme.colors.grayScale.white};
`;

export const ModalTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  white-space: pre-line;
`;

export const ModalText = styled.p`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.grayScale.black};
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
`;

export const ConfirmButton = styled.button`
  padding: 0.5rem 1.2rem;
  background: ${(props) => props.theme.colors.primary.violet};
  border-radius: 1rem;
  border: none;
  color: ${(props) => props.theme.colors.grayScale.white};
  ${(props) => props.theme.fonts.body.medium500};
  cursor: pointer;
  transition: background-color 0.2s ease;

  /* content-fit width */
  width: auto;
  min-width: fit-content;
`;

export const CancelButton = styled.button`
  padding: 0.1rem;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.primary.violet};
  ${(props) => props.theme.fonts.body.medium500};
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;

  /* content-fit width */
  width: auto;
  min-width: fit-content;

  &:hover {
    color: ${(props) => props.theme.colors.secondary.vl800};
  }

  &:active {
    color: ${(props) => props.theme.colors.secondary.vl900};
  }
`;
