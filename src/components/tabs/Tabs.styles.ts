import styled from 'styled-components';

export const TabsContainer = styled.div<{ $autoWidth?: boolean; $gap?: string }>`
  display: flex;
  width: ${(props) => (props.$autoWidth ? 'auto' : '100%')};
  gap: ${(props) => props.$gap || '0.5rem'};
  overflow: auto hidden;

  /* 스크롤바 안 보이게 설정 */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  /* 부드러운 스크롤 */
  scroll-behavior: smooth;

  /* 스크롤 스냅 */
  scroll-snap-type: x proximity;
`;

export const Tab = styled.button<{
  $isActive: boolean;
  $isFirst?: boolean;
  $isLast?: boolean;
  $margin?: string;
  $isFirstDay?: boolean;
}>`
  display: flex;
  padding: 0.35rem 0.7rem;
  margin-left: ${(props) => (props.$isFirst ? props.$margin : '0')};
  margin-right: ${(props) => (props.$isLast ? props.$margin : '0')};
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  cursor: pointer;
  border: ${(props) => (props.$isFirstDay ? 'none' : '1px solid')};
  border-color: ${(props) => {
    if (props.$isFirstDay) {
      return 'transparent';
    }
    return props.$isActive ? 'transparent' : props.theme.colors.primary.violet;
  }};
  background-color: ${(props) => {
    if (props.$isActive) {
      return props.theme.colors.primary.violet;
    }
    if (props.$isFirstDay) {
      return props.theme.colors.grayScale.gy200_eee;
    }
    return props.theme.colors.grayScale.white;
  }};

  &:active {
    background-color: ${(props) => props.theme.colors.grayScale.offwhite};
  }
`;

export const TabText = styled.p<{ $isActive: boolean; $isFirstDay?: boolean }>`
  ${(props) =>
    props.$isFirstDay ? props.theme.fonts.body.small400 : props.theme.fonts.body.small400};
  color: ${(props) => {
    if (props.$isActive) {
      return props.theme.colors.grayScale.white;
    }
    if (props.$isFirstDay) {
      return props.theme.colors.grayScale.black_1a1a;
    }
    return props.theme.colors.primary.violet;
  }};
  text-align: center;
  white-space: nowrap;
  transition: color 0.3s ease;
`;
