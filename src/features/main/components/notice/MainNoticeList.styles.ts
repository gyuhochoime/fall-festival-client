import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* Adjust gap as needed */
  width: 21rem;
`;

export const NoticeItem = styled.div`
  display: flex; /* Added flex display */
  align-items: center; /* Align items vertically */
  gap: 1rem; /* Gap between image and text */
  background-color: ${(props) => props.theme.colors.grayScale.white};
  border-radius: 16px;
  padding: 0.75rem 1rem;
  box-shadow: 0 0 12px 0 rgb(126 65 154 / 30%);
`;

export const ImageThumbnail = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 12px;
  background-color: transparent;
  object-fit: cover; /* Ensure image covers the area */
`;

export const TextContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Allow text content to take available space */
`;

export const NoticeTitle = styled.p`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.grayScale.black};
  margin-bottom: 0.25rem;
`;

export const NoticeContent = styled.p`
  ${(props) => props.theme.fonts.body.small400};
  color: ${(props) => props.theme.colors.grayScale.gy700};
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Add ellipsis for overflow */
`;
