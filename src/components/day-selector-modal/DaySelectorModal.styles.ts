import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 16.5rem; /* 264px */
  padding: 0 1.25rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  border-radius: 1.25rem 1.25rem 0 0; /* 20px 20px 0 0 */
  background: ${(props) => props.theme.colors.grayScale.white};
  box-shadow: 0 -0.125rem 0.125rem #dbc2e39b;
`;

export const HandleBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.colors.grayScale.gy700}; /* #616161 */
  font-family: Pretendard, sans-serif;
  font-size: 0.875rem; /* 14px */
  font-style: normal;
  font-weight: 400;
  line-height: 142%;
  letter-spacing: -0.0175rem; /* -0.28px */
  margin-bottom: 1.75rem; /* 28px */
  align-self: flex-start;
  margin-left: 1.75rem; /* 3rem - 1.25rem(패딩) = 1.75rem */
`;

export const DayList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.625rem;
  align-self: flex-start;
  margin-left: 1.75rem; /* 3rem - 1.25rem(패딩) = 1.75rem */
`;

export const DayItem = styled.div`
  display: flex;
  width: calc(100% - 3.5rem); /* 전체 너비에서 좌우 패딩 제외 */
  padding: 0.625rem 0; /* 좌우 패딩 제거, 상하만 유지 */
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

export const DayText = styled.span<{ $isSelected: boolean }>`
  color: ${(props) =>
    props.$isSelected
      ? props.theme.colors.primary.violet /* #7E419A */
      : props.theme.colors.grayScale.gy500}; /* #9E9E9E */

  font-family: Pretendard, sans-serif;
  font-size: 1rem; /* 16px */
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.02rem; /* -0.32px */
`;

export const CheckIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
