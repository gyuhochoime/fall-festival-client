import styled from 'styled-components';
import HelpIcon from '@/assets/icons/nrk_help.svg?react';

export const PerformanceContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100dvh;
  max-height: 100dvh;
  background-color: ${(p) => p.theme.colors.grayScale.white};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.header`
  height: 56px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  border-bottom: 1px solid ${(p) => p.theme.colors.grayScale.gy100};
`;

export const HeaderButton = styled.button`
  height: 100%;
  background: transparent;
  border: none;
  color: ${(p) => p.theme.colors.grayScale.gy900};
  ${(p) => p.theme.fonts.header.h3};
`;

export const HeaderTitle = styled.div`
  text-align: center;
  ${(p) => p.theme.fonts.header.h4};
  color: ${(p) => p.theme.colors.grayScale.gy900};
`;

export const Fullscreen = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden auto;
  min-height: 0;
  padding-bottom: 16px;
  gap: 8px;
`;

export const InfoWrap = styled.div`
  display: flex;
  min-width: 20.9375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1rem;
`;

export const DayWrap = styled.div`
  display: flex;
  min-width: 20.9375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
  margin-top: 1.5rem;
`;

export const TabsHelpWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const HelpIconStyled = styled(HelpIcon)`
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
  fill: ${(props) => props.theme.colors.grayScale.gy300};
`;

export const Carousel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  margin-top: 1rem;
`;

export const TableNoteWrap = styled.div`
  display: flex;
  min-width: 20.9375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 2.5rem;
`;

export const FrameBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.44rem;
`;

export const NoteText = styled.p`
  align-self: stretch;
  ${(props) => props.theme.fonts.header.h3};
  color: ${(props) => props.theme.colors.grayScale.black};
`;
