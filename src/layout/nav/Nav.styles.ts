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
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  border-radius: 1rem 1rem 0 0;
  background-color: #ffffffbd;
  box-shadow: 0 -2px 2px #dbc2e39b;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
`;

export const NavBtn = styled(motion.button)<{ $isActive?: boolean }>`
  all: unset;
  width: 60px;
  height: hug;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  text-decoration: none;
  text-decoration-line: none;
  border-radius: 12px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.secondary.vl50 : 'transparent'};
`;

export const NavBtnText = styled.p<{ $isActive?: boolean }>`
  ${(props) => props.theme.fonts.body.xsmall500};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.violet : theme.colors.grayScale.gy800};
`;
