import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.header<{ $opacity?: boolean }>`
  display: flex;
  width: 100%;
  height: 3.875rem;
  padding: 0rem 1.25rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background-color: ${({ theme, $opacity }) =>
    $opacity ? 'transparent' : theme.colors.grayScale.white};
  position: fixed;
  top: 0;
  z-index: 99;
`;

export const LeftSection = styled.div<{ $opacity?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  margin-left: 8.5px;

  svg {
    filter: ${({ $opacity }) => ($opacity ? 'brightness(0) invert(1)' : 'none')};
  }
`;

export const RightSection = styled.div<{ $opacity?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  margin-top: 3px;
  margin-right: 3px;

  svg {
    filter: ${({ $opacity }) => ($opacity ? 'brightness(0) invert(1)' : 'none')};
  }
`;

export const Title = styled.p`
  ${(props) => props.theme.fonts.header.h4}
  text-align: center;
  color: ${(props) => props.theme.colors.grayScale.black};
`;

export const InputWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 18.4375rem;
  height: 2.5rem;
  background-color: ${(props) => props.theme.colors.grayScale.offwhite};
  border: 1px solid ${(props) => props.theme.colors.grayScale.gy100};
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;

  input {
    ${(props) => props.theme.fonts.body.medium500}
    flex: 1;
    width: 100%;
    background-color: ${(props) => props.theme.colors.grayScale.offwhite};
    border: none;
    color: ${(props) => props.theme.colors.grayScale.black};

    &::placeholder {
      color: ${(props) => props.theme.colors.grayScale.gy900};
    }

    &:focus {
      outline: none;
    }
  }
`;

export const Btn = styled(motion.button)`
  display: flex;
  border: 0;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  padding: 0;
  background-color: inherit;
`;

export const InputIcon = styled.button`
  display: flex;
  border: 0;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
`;

export const SearchWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2.5rem;
  background-color: ${(props) => props.theme.colors.grayScale.offwhite};
  border: 1px solid ${(props) => props.theme.colors.grayScale.gy100};
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;

  input {
    ${(props) => props.theme.fonts.body.medium500}
    flex: 1;
    width: 100%;
    background-color: ${(props) => props.theme.colors.grayScale.offwhite};
    border: none;
    color: ${(props) => props.theme.colors.grayScale.black};

    &::placeholder {
      color: ${(props) => props.theme.colors.grayScale.gy900};
    }

    &:focus {
      outline: none;
    }
  }
`;
