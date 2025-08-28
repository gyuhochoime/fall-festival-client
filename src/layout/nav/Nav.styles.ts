import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Nav = styled.nav`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6.625rem;
  padding: 0.5rem 1.25rem 2rem;
  background-color: #ffffff84;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -2px 2px #dbc2e39b;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
`;

export const NavBtn = styled(motion.button)`
  all: unset;
  width: 3.75rem;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  text-decoration: none;
  text-decoration-line: none;
  border-radius: 0.5rem;
`;

export const NavBtnText = styled.p`
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${(props) => props.theme.colors.grayScale.gy800};
`;
