import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1; /* 레이아웃 Main 위 */
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
  min-height: 0; /* 헤더 높이 고려한 내부 스크롤 이슈 방지 */
  padding-bottom: 16px; /* 하단 여백 추가 */
  gap: 8px; /* 요소간 간격 추가 */
`;

// Intro swiper
export const SwipeWrap = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  overflow: auto hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px 0px;
  scroll-snap-align: start;
`;

export const PlaceholderImage = styled.div`
  width: 70%;
  max-width: 320px;
  aspect-ratio: 3/4;
  border-radius: 12px;
  background: ${(p) => p.theme.colors.grayScale.gy100};
  display: grid;
  place-items: center;
  color: ${(p) => p.theme.colors.grayScale.gy500};
`;

export const SlideText = styled.p`
  ${(p) => p.theme.fonts.body.medium500};
  color: ${(p) => p.theme.colors.grayScale.gy700};
  text-align: center;
  white-space: pre-line;
  line-height: 1.5;
`;

export const Dots = styled.div`
  display: flex;
  gap: 6px;
  padding: 8px 0 16px;
`;

export const Dot = styled.span<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) =>
    p.$active ? p.theme.colors.primary.violet : p.theme.colors.grayScale.gy300};
`;

// Buttons
const buttonBase = css`
  min-height: 48px;
  border-radius: 12px;
  padding: 12px 16px;
  width: calc(100% - 32px);
  margin: 0 16px 16px;
  border: none;
`;

export const PrimaryButton = styled.button`
  ${buttonBase};
  background: ${(p) => p.theme.colors.primary.violet};
  color: white;
  border-radius: 100px;
  ${(p) => p.theme.fonts.body.medium500};
`;

export const SecondaryButton = styled.button`
  ${buttonBase};
  background: ${(p) => p.theme.colors.grayScale.gy100};
  color: ${(p) => p.theme.colors.grayScale.gy800};
  border-radius: 100px;
  ${(p) => p.theme.fonts.body.medium500};
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 0 16px 16px;

  & > button {
    margin: 0;
    width: 100%;
  }
`;

// Frame preview
export const FramePreview = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  padding: 24px 16px 8px;
  max-height: 70vh;
  overflow: visible;
  min-height: 200px;
`;

export const PolaroidCard = styled.div<{ $shaking?: boolean }>`
  position: relative;
  background: ${(p) => p.theme.colors.grayScale.white};
  border: 1px solid ${(p) => p.theme.colors.grayScale.gy200};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 6%);
  transition: transform 0.3s ease;

  /* 흔들기 애니메이션 */
  ${(p) =>
    p.$shaking &&
    `
    animation: shake 1s ease-in-out;
  `}

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-10px) rotate(-2deg);
    }

    20%,
    40%,
    60%,
    80% {
      transform: translateX(10px) rotate(2deg);
    }
  }

  /* width/height는 inline-style로 제어 (정확한 비율 유지) */
`;

export const PhotoWindow = styled.div`
  position: absolute;
  overflow: hidden;
  background: ${(p) => p.theme.colors.grayScale.gy100};
`;

export const Photo = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.15s ease-out;
`;

export const FramePicker = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  padding: 16px 20px;
  width: 100%;
  overflow: auto hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const FrameOption = styled.button<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: none;
  background: transparent;
  flex-shrink: 0;
  scroll-snap-align: center;

  img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
    border: 2px solid
      ${(p) => (p.$selected ? p.theme.colors.primary.violet : p.theme.colors.grayScale.gy200)};
  }

  span {
    ${(p) => p.theme.fonts.body.small400};
    font-size: 12px;
    color: ${(p) => (p.$selected ? p.theme.colors.primary.violet : p.theme.colors.grayScale.gy600)};
    font-weight: ${(p) => (p.$selected ? '600' : '400')};
    white-space: nowrap;
  }
`;

export const CategoryPicker = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid ${(p) => p.theme.colors.grayScale.gy200};
`;

export const CategoryTab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 16px;
  border: none;
  border-bottom: 2px solid ${(p) => (p.$active ? p.theme.colors.primary.violet : 'transparent')};
  ${(p) => p.theme.fonts.body.medium500};
  background: transparent;
  color: ${(p) => (p.$active ? p.theme.colors.primary.violet : p.theme.colors.grayScale.gy500)};
  transition: all 0.2s ease;
  font-weight: ${(p) => (p.$active ? '600' : '400')};
`;

export const SubtleText = styled.p`
  ${(p) => p.theme.fonts.body.medium400};
  color: ${(p) => p.theme.colors.grayScale.gy600};
  text-align: center;
  margin: 8px 16px 16px;
  font-size: x-small;
`;

// 흔들기 관련 스타일
export const ShakeInstructions = styled.div`
  text-align: center;
  padding: 16px;
  margin: 16px 0;
`;

export const ShakeText = styled.p`
  ${(p) => p.theme.fonts.body.medium500};
  color: ${(p) => p.theme.colors.grayScale.gy700};
  margin-bottom: 16px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  max-width: 280px;
  height: 6px;
  background: ${(p) => p.theme.colors.grayScale.gy200};
  border-radius: 3px;
  overflow: hidden;
  margin: 0 auto 12px;
`;

export const ProgressFill = styled.div<{ $width: number }>`
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  width: ${(p) => p.$width}%;
  transition: width 0.3s ease;
  border-radius: 3px;
`;

export const ShakeCounter = styled.p`
  ${(p) => p.theme.fonts.body.small400};
  color: ${(p) => p.theme.colors.grayScale.gy600};
  text-align: center;
`;

export const PermissionButton = styled.button`
  background: linear-gradient(
    45deg,
    ${(p) => p.theme.colors.primary.violet},
    ${(p) => p.theme.colors.primary.bl400}
  );
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin: 16px auto;
  display: block;
  box-shadow: 0 4px 15px rgb(0 0 0 / 20%);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgb(0 0 0 / 30%);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ErrorMessage = styled.div`
  background: rgb(255 107 107 / 10%);
  color: ${(p) => p.theme.colors.secondary.rd500};
  padding: 15px;
  border-radius: 10px;
  margin: 16px;
  text-align: center;
  ${(p) => p.theme.fonts.body.small400};
  border: 1px solid rgb(255 107 107 / 20%);
`;

export const SuccessMessage = styled.div`
  background: rgb(146 71 171 / 10%);
  color: ${(p) => p.theme.colors.primary.violet};
  padding: 15px;
  border-radius: 10px;
  margin: 16px;
  text-align: center;
  ${(p) => p.theme.fonts.body.small400};
  border: 1px solid rgb(146 71 171 / 30%);
  animation: fade-in 0.5s ease;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
