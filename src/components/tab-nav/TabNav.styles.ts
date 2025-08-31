import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.grayScale.white};
  height: 2.75rem;
  display: flex;
  justify-content: center;
`;

export const Nav = styled.nav<{ $variant?: 'default' | 'timetable' }>`
  width: ${(props) => (props.$variant === 'timetable' ? 'auto' : '20.9375rem')};
  border-bottom: ${(props) =>
    props.$variant === 'timetable' ? 'none' : `2px solid ${props.theme.colors.grayScale.gy50}`};
  display: ${(props) => (props.$variant === 'timetable' ? 'flex' : 'block')};
  justify-content: ${(props) => (props.$variant === 'timetable' ? 'space-between' : 'initial')};
  align-items: ${(props) => (props.$variant === 'timetable' ? 'initial' : 'initial')};
  padding: ${(props) => (props.$variant === 'timetable' ? '0 1.25rem' : '0 1rem')};
`;

export const List = styled.ul<{ $variant?: 'default' | 'timetable' }>`
  display: flex;
  gap: ${(props) => (props.$variant === 'timetable' ? '0.625rem' : '0.5rem')};
`;

export const Item = styled(motion.li)<{
  $current: boolean;
  $variant?: 'default' | 'timetable';
}>`
  ${(props) =>
    props.$variant === 'timetable'
      ? `
    display: flex;
    padding: 0.625rem 2rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 3.125rem;
    background: ${props.$current ? props.theme.colors.primary.violet : 'transparent'};
    box-shadow: ${props.$current ? '0 0 0.75rem 0 rgba(126, 65, 154, 0.30)' : 'none'};
    color: ${props.$current ? props.theme.colors.grayScale.white : props.theme.colors.grayScale.black_1a1a};
    text-align: center;
    ${props.theme.fonts.body.medium500};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    
    &:hover {
      transform: ${props.$current ? 'none' : 'translateY(-1px)'};
    }
  `
      : `
    flex: 1;
    color: ${props.$current ? props.theme.colors.grayScale.gy900 : props.theme.colors.grayScale.gy200};
    ${props.theme.fonts.header.h4};
    position: relative;
    height: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `}
`;

export const Underline = styled(motion.div)`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${(props) => props.theme.colors.grayScale.gy800};
`;
