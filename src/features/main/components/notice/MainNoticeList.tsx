import React from 'react';
import * as S from './MainNoticeList.styles';
import { NoticeData } from '@/constants/main/Notice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface Notice {
  id: number;
  title: string;
  body: string; // Changed from content to body
  img: string[]; // Changed from images to img
}

// Helper function for text processing
const processContent = (content: string, maxLength: number = 25): string => {
  const singleLineContent = content.replace(/(\r\n|\n|\r)/gm, ' '); // Replace line breaks with spaces
  if (singleLineContent.length > maxLength) {
    return singleLineContent.substring(0, maxLength) + '...';
  }
  return singleLineContent;
};

const MainNoticeList: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const noticesToDisplay: Notice[] = NoticeData.sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <S.Container>
      {noticesToDisplay.map((notice) => (
        <S.NoticeItem key={notice.id} onClick={() => navigate(`/main/notice/${notice.id}`)}>
          {notice.img && notice.img.length > 0 && (
            <S.ImageThumbnail src={notice.img[0]} alt={notice.title} />
          )}
          <S.TextContentWrapper>
            <S.NoticeTitle>{notice.title}</S.NoticeTitle>
            <S.NoticeContent>{processContent(notice.body)}</S.NoticeContent>
          </S.TextContentWrapper>
        </S.NoticeItem>
      ))}
    </S.Container>
  );
};

export default MainNoticeList;
