import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import * as S from './BottomSheet.styles';
import { BottomSheetProps } from './BottomSheet.types';
import { Notification } from '@/components/notification';
import { MapData } from '@/constants/map/MapData';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { CATEGORY_NOTIFICATIONS } from '@/constants/map/CategoryNotifications';
import { days } from '@/constants/map';
import { MapItemCard } from './MapItemCard';

/**
 * 바텀시트 컴포넌트
 *
 * 모바일 인터페이스에서 화면 하단에서 올라오는 시트 컴포넌트입니다.
 * 헤더 부분을 드래그하여 위아래로 이동 가능하며, 콘텐츠 영역은 스크롤이 가능합니다.
 * 카테고리 선택 시 관련 정보를 표시하거나 커스텀 콘텐츠를 children으로 전달할 수 있습니다.
 *
 * @component
 * @param {Object} props - 컴포넌트 속성
 * @param {CATEGORIES|null} props.selectedCategory - 선택된 카테고리
 * @param {DAYS} [props.selectedDay=days[0]] - 선택된 날짜 (기본값: 첫 번째 날)
 * @param {ReactNode} [props.children] - 바텀시트 내부에 표시할 커스텀 컨텐츠
 *
 * @example
 * // 기본 사용법
 * <BottomSheet selectedCategory="주점" selectedDay="1일차" />
 *
 * @example
 * // 커스텀 콘텐츠를 포함한 사용법
 * <BottomSheet selectedCategory="주점" selectedDay="1일차">
 *   <CustomContent />
 * </BottomSheet>
 */
export default function BottomSheet({
  selectedCategory,
  selectedDay = days[0],
  children,
  onItemClick,
  selectedItemId,
}: BottomSheetProps) {
  const navigate = useNavigate();
  const { sheet, content, header } = useBottomSheet();
  const { isNotificationClosed, closeNotification } = useNotificationStore();
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // 선택된 카테고리의 알림 표시 상태 관리
  useEffect(() => {
    if (selectedCategory) {
      const notification = CATEGORY_NOTIFICATIONS[selectedCategory];
      const isClosed = isNotificationClosed(selectedCategory);
      setShowNotification(!!notification && !isClosed);
    } else {
      setShowNotification(false);
    }
  }, [selectedCategory, isNotificationClosed]);

  // selectedCategory가 null이 아닌 경우에만 데이터 필터링
  // closeDay 배열에 현재 선택된 날짜가 포함된 항목은 제외
  // selectedItemId가 있으면 해당 아이템만 표시
  const filteredData = selectedCategory
    ? MapData[selectedCategory]?.filter((item) => {
        // 날짜 필터링
        const isNotClosed = !item.closeDay || !item.closeDay.includes(selectedDay);

        // 특정 아이템이 선택된 경우 해당 아이템만 표시
        if (selectedItemId !== null && selectedItemId !== undefined) {
          return isNotClosed && item.id === selectedItemId;
        }

        return isNotClosed;
      }) || []
    : [];

  console.log('[BottomSheet] 필터링된 데이터:', {
    selectedCategory,
    selectedDay,
    totalItems: selectedCategory ? MapData[selectedCategory]?.length || 0 : 0,
    filteredItems: filteredData.length,
    data: filteredData,
  });

  // 알림 클릭 핸들러 - 경로로 이동
  const handleNotificationClick = useCallback(() => {
    if (selectedCategory && CATEGORY_NOTIFICATIONS[selectedCategory]?.path) {
      navigate(CATEGORY_NOTIFICATIONS[selectedCategory].path);
    }
  }, [selectedCategory, navigate]);

  // 알림 닫기 핸들러
  const handleCloseNotification = useCallback(() => {
    if (selectedCategory) {
      closeNotification(selectedCategory);
      setShowNotification(false);
    }
  }, [selectedCategory, closeNotification]);

  /**
   * 개발 모드에서 모든 알림 상태 초기화 핸들러
   * 모든 알림을 다시 표시 가능한 상태로 초기화합니다.
   */
  const handleResetAllNotifications = useCallback(() => {
    useNotificationStore.getState().resetAllNotifications();
    // 모든 알림 초기화 후 현재 카테고리 알림 상태 업데이트
    if (selectedCategory) {
      setShowNotification(!!CATEGORY_NOTIFICATIONS[selectedCategory]);
    }
    alert('모든 알림 상태가 초기화되었습니다.');
  }, [selectedCategory]);

  if (!selectedCategory) {
    console.log('[BottomSheet] selectedCategory가 null이므로 바텀시트를 렌더링하지 않습니다.');
    return null;
  }

  console.log(
    '[BottomSheet] 바텀시트 렌더링 - selectedCategory:',
    selectedCategory,
    'selectedDay:',
    selectedDay,
  );

  // 카테고리별 알림 데이터 가져오기
  const notification = CATEGORY_NOTIFICATIONS[selectedCategory];

  return (
    <>
      <S.BottomSheetMotionDiv ref={sheet}>
        <S.BottomSheetHeader ref={header}>
          <S.Handle />
        </S.BottomSheetHeader>
        <S.BottomSheetContent ref={content}>
          {children ? (
            children
          ) : (
            <>
              {/* 기본 바텀시트 내용 (children이 없을 경우) */}
              {/* 카테고리별 공지사항 - onClick으로 경로 이동 처리 */}
              {showNotification && notification && (
                <Notification
                  title={notification.title}
                  onClick={handleNotificationClick}
                  onClose={handleCloseNotification}
                  width="100%"
                />
              )}

              {filteredData.length > 0
                ? filteredData.map((item, index) => (
                    <S.ContentUnitWrap key={index} $isLastItem={index === filteredData.length - 1}>
                      <MapItemCard
                        item={item}
                        onItemClick={onItemClick}
                        category={selectedCategory}
                      />
                    </S.ContentUnitWrap>
                  ))
                : selectedCategory && (
                    <S.NoDataMessage>해당 카테고리의 데이터가 없습니다.</S.NoDataMessage>
                  )}

              {/* 개발 환경에서만 표시되는 디버그 기능 */}
              {import.meta.env.DEV && (
                <S.DevSection>
                  <S.DevButton onClick={handleResetAllNotifications}>
                    🔄 개발자: 알림 상태 초기화
                  </S.DevButton>
                </S.DevSection>
              )}
            </>
          )}
        </S.BottomSheetContent>
      </S.BottomSheetMotionDiv>
    </>
  );
}
