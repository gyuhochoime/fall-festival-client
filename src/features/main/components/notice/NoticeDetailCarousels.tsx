import * as S from './NoticeDetailCarousels.styles';
import { useEffect, useRef, useState } from 'react';
import { useLayoutStore } from '@/stores/useLayoutStore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/**
 * 공지사항 상세 페이지 - 인스타그램 스타일 캐러셀
 * @param {string[]} img - 이미지 URL 배열
 * @returns {JSX.Element}
 */

export default function NoticeDetailCarousels({ img }: { img: string[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const isSwipingRef = useRef(false);
  const setIsNav = useLayoutStore((state) => state.setIsNav);

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  // react-slick 설정
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    initialSlide: 0,
    beforeChange: () => {
      isSwipingRef.current = true;
    },
    afterChange: (current: number) => {
      setCurrentPage(current);
      setTimeout(() => {
        isSwipingRef.current = false;
      }, 100);
    },
  };

  return (
    <S.CarouselWrapper>
      <Slider {...settings}>
        {img.map((src, index) => (
          <div key={index}>
            <S.Image src={src} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <S.Pill>
        {currentPage + 1} <span>/</span> {img.length}
      </S.Pill>
    </S.CarouselWrapper>
  );
}
