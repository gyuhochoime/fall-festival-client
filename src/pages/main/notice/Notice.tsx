import { NavBar } from '@/components/nav-bar';
import * as S from './Notice.styles';
// import { NoticeData } from '@/constants/main/Notice'; // 기존 하드코딩 데이터 (주석 처리)
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoticeBox } from '@/features/main/components/notice/index';
import { fetchNotices, NoticeItem } from '@/services/noticeService';

interface Notice {
  id: number;
  title: string;
  body: string;
  img: string[];
}

// API 응답 데이터를 컴포넌트에서 사용하는 형식으로 변환
const mapApiNoticeToUi = (apiNotice: NoticeItem): Notice => {
  return {
    id: apiNotice.id,
    title: apiNotice.title,
    body: apiNotice.content,
    img: apiNotice.images, // images 배열을 그대로 사용
  };
};

export default function Notice() {
  const navigate = useNavigate();
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const apiNotices = await fetchNotices();
        // id 기준 내림차순 정렬
        const uiNotices = apiNotices.map(mapApiNoticeToUi).sort((a, b) => b.id - a.id);
        setNotices(uiNotices);
        setLoading(false);
      } catch (err) {
        console.error('공지사항을 불러오는데 실패했습니다:', err);
        setError('공지사항을 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    getNotices();
  }, []);

  const handleDetail = useCallback(
    (id: string) => {
      navigate(`/main/notice/${id}`);
    },
    [navigate],
  );

  return (
    <>
      <NavBar title="공지사항" isBack={true} />
      <S.Container>
        {loading ? (
          <S.LoadingWrapper>공지사항을 불러오는 중...</S.LoadingWrapper>
        ) : error ? (
          <S.ErrorWrapper>{error}</S.ErrorWrapper>
        ) : (
          <S.Flex>
            {notices.length > 0 ? (
              notices.map((notice) => (
                <NoticeBox
                  key={notice.id}
                  id={notice.id}
                  img={notice.img[0]}
                  title={notice.title}
                  body={notice.body}
                  onClick={handleDetail}
                />
              ))
            ) : (
              <S.NoNoticesWrapper>공지사항이 없습니다.</S.NoNoticesWrapper>
            )}
          </S.Flex>
        )}
      </S.Container>
    </>
  );
}
