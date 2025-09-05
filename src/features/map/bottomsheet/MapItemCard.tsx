import { MapDataItem } from '@/constants/map/MapData';
import * as S from './MapItemCard.styles';
import TimeIcon from '@/assets/icons/clock.svg?react';
import { useNavigate } from 'react-router-dom';

interface MapItemCardProps {
  item: MapDataItem;
  onItemClick?: (item: MapDataItem) => void;
  category?: string; // 카테고리 정보를 전달받기 위한 prop 추가
}

export function MapItemCard({ item, onItemClick, category }: MapItemCardProps) {
  const navigate = useNavigate();

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 중지
    if (item.path) {
      navigate(item.path);
    }
  };

  // 주점 카테고리인 경우 booth 스타일 사용 (border 없이)
  if (category === '주점') {
    return (
      <S.BoothCardContainer
        onClick={() => {
          if (onItemClick && item.lat && item.lng) {
            onItemClick(item);
          }
        }}
      >
        <S.ItemImage src={item.image} alt={item.title} />
        <S.BoothContentsWrap>
          <S.BoothTitleWrap>
            <S.BoothTitle>{item.title}</S.BoothTitle>
            {item.subtitle && (
              <>
                <S.BoothTitleDivider />
                <S.BoothSubTitle>{item.subtitle}</S.BoothSubTitle>
              </>
            )}
          </S.BoothTitleWrap>
          <S.BoothContentsFooter>
            <S.BoothTimeWrap>
              <TimeIcon width="1.25rem" height="1.25rem" fill="#17171B" />
              <S.BoothTime>{item.time}</S.BoothTime>
            </S.BoothTimeWrap>
            {item.path && (
              <S.BoothLinkToDetail onClick={handleDetailClick}>상세보기</S.BoothLinkToDetail>
            )}
          </S.BoothContentsFooter>
        </S.BoothContentsWrap>
      </S.BoothCardContainer>
    );
  }

  // 주점이 아닌 경우 새로운 디자인 사용
  return (
    <S.MapItemCardContainer
      onClick={() => {
        if (onItemClick && item.lat && item.lng) {
          onItemClick(item);
        }
      }}
    >
      <S.ItemImage src={item.image} alt={item.title} />
      <S.ItemContent>
        <S.ItemTitle>{item.title}</S.ItemTitle>
        <S.ItemCategory>{category}</S.ItemCategory>
      </S.ItemContent>
    </S.MapItemCardContainer>
  );
}
