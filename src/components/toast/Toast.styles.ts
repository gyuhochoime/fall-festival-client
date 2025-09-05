import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translate(-50%, calc(-50% + 50px)); /* Start below center */
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%); /* End at center */
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translate(-50%, -50%); /* Start at center */
    opacity: 1;
  }
  to {
    transform: translate(-50%, calc(-50% + 50px)); /* End below center */
    opacity: 0;
  }
`;

export const ToastContainer = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;

  /* Set initial transform state for animation */
  transform: translate(-50%, calc(-50% + 50px));
  opacity: 0;
  padding: 0.8rem 1.2rem;
  background-color: ${(props) => props.theme.colors.secondary.vl100}cc;
  backdrop-filter: blur(10px);

  --webkit-backdrop-filter: blur(10px);

  color: ${(props) => props.theme.colors.primary.violet};
  border-radius: 999px; /* Pill shape */
  font-size: 14px;
  z-index: 1000;
  white-space: pre-line; /* Allow line breaks with \n */
  word-break: keep-all; /* Keep words intact */
  min-width: 5rem; /* Minimum width to prevent too narrow toast */
  max-width: 90%;
  text-align: center;
  animation: ${({ $show }) => ($show ? slideIn : slideOut)} 0.4s forwards ease-in-out;
  pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
  box-shadow: 0 0 10px 0 #dbc2e3;
`;
