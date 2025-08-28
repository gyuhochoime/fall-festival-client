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
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  box-shadow: inset 0 2px 0px ${(props) => props.theme.colors.secondary.vl100};
  background-color: ${(props) => props.theme.colors.grayScale.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
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
