import styled from 'styled-components';
import { motion } from 'framer-motion';
import CloseBtn from '@/assets/icons/nrk_close.svg?react';
import HelpIcon from '@/assets/icons/nrk_help.svg?react';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0 0 0 / 70%);
`;

export const ModalWrapper = styled(motion.div)`
  display: flex;
  width: 18.4375rem;
  padding-bottom: 1rem;
  flex-direction: column;
  gap: 0.75rem;
  border-radius: 1.25rem;
  background: ${(props) => props.theme.colors.grayScale.white};
  box-shadow: 0 0 0.75rem 0 rgb(126 65 154 / 30%);
`;

export const ModalTab = styled.div`
  display: flex;
  height: 3.375rem;
  padding: 0.5rem 0.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem 1.25rem 0 0;
  border-bottom: 0.0625rem solid ${(props) => props.theme.colors.grayScale.gy300};
  background: ${(props) => props.theme.colors.grayScale.white};
  position: relative;
`;

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const ModalTitleText = styled.span`
  ${(props) => props.theme.fonts.header.h4_600};
  color: ${(props) => props.theme.colors.grayScale.black};
`;

export const Help = styled(HelpIcon)``;

export const ModalCloseBtn = styled(CloseBtn)`
  position: absolute;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
