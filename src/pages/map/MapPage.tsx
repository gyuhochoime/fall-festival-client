import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPageBottomSheet } from '@/features/map';
import { NavBar } from '@/components/nav-bar';
import { Tabs } from '@/components/tabs';
import SearchBar from '@/components/search-bar/SearchBar';
import DaySelectorModal from '@/components/day-selector-modal/DaySelectorModal';
import { DAYS, CATEGORIES } from '@/constants/map';
import { FESTIVAL_START_DATE, FESTIVAL_TOTAL_DAYS } from '@/constants/festival/dates';
import { getCurrentFestivalDay } from '@/utils/dateUtils';
import * as S from './MapPage.styles';
import { useLayoutStore } from '@/stores/useLayoutStore';
import ReCenterButtonIcon from '@/assets/icons/re-center.svg?react';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { MapData, MapDataItem } from '@/constants/map/MapData';

export default function Map() {
  // URL에서 itemId 파라미터 가져오기
  const { itemId: itemIdParam } = useParams<{ itemId?: string }>();
  // 파라미터를 숫자로 변환
  const itemId = itemIdParam ? Number(itemIdParam) : undefined;
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);

  // 현재 날짜에 기반한 페스티벌 일차 계산
  const currentDay = getCurrentFestivalDay(FESTIVAL_START_DATE, FESTIVAL_TOTAL_DAYS) as DAYS;
  console.log(
    `[MapPage] 현재 날짜: ${new Date().toLocaleDateString()}, 페스티벌 시작 일차: ${FESTIVAL_START_DATE}, 페스티벌 일차: ${currentDay}`,
  );

  // 날짜 및 카테고리 관련 상태
  const [selectedDay, setSelectedDay] = useState<DAYS>(currentDay);
  const [selectedCategory, setSelectedCategory] = useState<CATEGORIES | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  // 지도 카테고리 상태
  const [selectedMapCategory, setSelectedMapCategory] = useState<string>('');

  // 모달 상태
  const [isDayModalOpen, setIsDayModalOpen] = useState<boolean>(false);

  // 카테고리 매핑
  const categoryMapping: Record<string, CATEGORIES | null> = {
    이벤트: '프로모션',
    주점: '주점',
    푸드트럭: '푸드트럭',
    의무실: '콘텐츠',
    화장실: '화장실',
    흡연실: '흡연구역',
    셔틀콕: '셔틀콕',
  };

  // 카카오맵 커스텀 훅 사용
  const { moveToCurrentLocation, showItemMarker, kakaoMap } = useKakaoMap(
    {
      mapRef,
      center: { lat: 37.294711, lng: 126.833163 }, // 대운동장
      level: 3,
      draggable: true,
      zoomable: true,
      scrollwheel: true,
      isBottomSheetOpen,
    },
    selectedMapCategory ? categoryMapping[selectedMapCategory] : selectedCategory,
    selectedDay,
  );
  console.log('[MapPage] useKakaoMap 훅 초기화 완료');

  // 헤더 관련 상태 (제거됨)

  // itemId가 있을 경우 해당 아이템 자동 선택
  useEffect(() => {
    if (itemId && kakaoMap) {
      // 모든 카테고리에서 아이템 찾기
      let foundItem: MapDataItem | undefined;
      let foundCategory: CATEGORIES | null = null;

      // 모든 카테고리를 순회하며 itemId와 일치하는 항목 찾기
      Object.entries(MapData).some(([category, items]) => {
        const item = items.find((item) => item.id === itemId);
        if (item) {
          foundItem = item;
          foundCategory = category as CATEGORIES;
          return true; // 찾았으면 순회 중단
        }
        return false;
      });

      if (foundItem && foundCategory) {
        // 카테고리 설정 (이것이 바텀시트를 열고 마커 표시를 트리거함)
        setSelectedCategory(foundCategory);

        // 잠시 후 항목의 마커를 클릭한 효과를 보여줌
        setTimeout(() => {
          showItemMarker(foundItem as MapDataItem);
        }, 500); // 카테고리가 설정되고 마커가 표시될 시간을 주기 위해 지연
      }
    }
  }, [itemId, kakaoMap, showItemMarker]);

  useEffect(() => {
    if (selectedCategory) {
      setIsBottomSheetOpen(true);
    } else {
      setIsBottomSheetOpen(false);
    }
  }, [selectedCategory]);

  // 바텀시트가 열리면 하단 네비게이션 숨김 및 지도 리사이즈
  useEffect(() => {
    if (isBottomSheetOpen) {
      useLayoutStore.getState().setIsNav(false);
    } else {
      useLayoutStore.getState().setIsNav(true);
    }

    // 카카오맵 리사이즈 (timeout을 통해 DOM 업데이트 이후 실행)
    const timeoutId = setTimeout(() => {
      if (kakaoMap) {
        kakaoMap.relayout();
      }
    }, 300); // 바텀시트 애니메이션이 완료되는 시간과 맞춤

    // cleanup 함수로 timeout 제거
    return () => clearTimeout(timeoutId);
  }, [isBottomSheetOpen, kakaoMap]);

  // 페이지를 벗어날 때 네비게이션 바를 원상복구
  useEffect(() => {
    return () => {
      // 언마운트 시 네비게이션 바를 다시 표시
      useLayoutStore.getState().setIsNav(true);
    };
  }, []);

  // 날짜 바꾸면 카테고리 초기화
  useEffect(() => {
    setSelectedCategory(null);
  }, [selectedDay]);

  // 헤더 핸들러 (제거됨)

  const handleSearchClick = () => {
    navigate('/map/search');
  };

  const handleDayChange = (day: string) => {
    if (day === 'open-modal') {
      setIsDayModalOpen(true);
    } else {
      // 선택된 날짜를 상태로 업데이트
      setSelectedDay(day as DAYS);
      console.log('[MapPage] 선택된 날짜:', day);
    }
  };

  const handleDayModalClose = () => {
    setIsDayModalOpen(false);
  };

  const handleMapCategoryChange = (category: string) => {
    console.log('[MapPage] 카테고리 변경:', category, '이전:', selectedMapCategory);
    // 같은 카테고리를 클릭하면 선택 해제, 다른 카테고리를 클릭하면 선택
    const newCategory = category === selectedMapCategory ? '' : category;
    setSelectedMapCategory(newCategory);
    console.log('[MapPage] 매핑된 카테고리:', newCategory ? categoryMapping[newCategory] : 'none');
  };

  // 현재 위치로 이동 핸들러
  const handleReCenterClick = () => {
    moveToCurrentLocation(); // 현재 위치로 이동
  };

  console.log('[지도] MapPage 컴포넌트가 렌더링되었습니다.');

  return (
    <S.MapContainer>
      <S.MapWrapper ref={mapRef} $isBottomSheetOpen={isBottomSheetOpen} />
      <S.ReCenterButton $isBottomSheetOpen={isBottomSheetOpen} onClick={handleReCenterClick}>
        <ReCenterButtonIcon />
      </S.ReCenterButton>
      <S.ContentContainer>
        <NavBar hideLeft={true} title="지도" isClose={false} opacity={true} />
        <S.SearchBarContainer>
          <SearchBar
            selectedDay={`${selectedDay}`}
            onSearchClick={handleSearchClick}
            onDayChange={handleDayChange}
          />
        </S.SearchBarContainer>
        <S.CategoryTabsContainer>
          <Tabs
            tabs={['이벤트', '주점', '푸드트럭', '의무실', '화장실', '흡연실', '셔틀콕']}
            activeTab={selectedMapCategory}
            onTabClick={handleMapCategoryChange}
            autoWidth={true}
            margin="0.75rem"
          />
        </S.CategoryTabsContainer>
        {isBottomSheetOpen && (
          <S.BottomSheetContainer>
            <MapPageBottomSheet
              selectedCategory={selectedCategory}
              selectedDay={selectedDay}
              onItemClick={showItemMarker}
            />
          </S.BottomSheetContainer>
        )}
      </S.ContentContainer>

      <DaySelectorModal
        isOpen={isDayModalOpen}
        selectedDay={`${selectedDay}`}
        onDaySelect={handleDayChange}
        onClose={handleDayModalClose}
      />
    </S.MapContainer>
  );
}
