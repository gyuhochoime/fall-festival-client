import * as S from './BoothList.styles';
import { ImageTextFrameWithOrganization } from '@/components/image-text-frame';
import { Notification } from '@/components/notification';
import { useNavigate, useLocation } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { useBooths } from '@/hooks/useBooth';

import FavoriteOn from 'src/assets/icons/favorite-on.svg?react';
import FavoriteOff from 'src/assets/icons/favorite-off.svg?react';
import TrashIcon from 'src/assets/icons/trash.svg?react';

interface BoothListProps {
  showFavoritesOnly?: boolean;
}

export default function BoothList({ showFavoritesOnly = false }: BoothListProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { booths, error } = useBooths();

  // 찜하기 기능 상태 관리 추가 (localStorage)
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('booth-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const handleToggleFavorite = (boothId: number, event: React.MouseEvent) => {
    event.stopPropagation();

    setFavorites((prev) => {
      const newFavorites = prev.includes(boothId)
        ? prev.filter((id) => id !== boothId)
        : [...prev, boothId];

      localStorage.setItem('booth-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // 찜한 주점들만 필터링 (showFavoritesOnly가 true일 때)
  const displayBooths = showFavoritesOnly
    ? booths.filter((booth) => favorites.includes(booth.id))
    : booths;

  if (error) {
    return (
      <S.Container>
        <div>{error}</div>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <Notification title="[공지] 미취학 아동 입장 제한" width="100%" />
      <S.TabContainer width="100%">
        <S.TabSlider $activeIndex={showFavoritesOnly ? 1 : 0} />
        <S.TabButton $active={!showFavoritesOnly} onClick={() => navigate('/booth')}>
          전체 주점
        </S.TabButton>
        <S.TabButton $active={showFavoritesOnly} onClick={() => navigate('/favorites')}>
          찜한 주점
        </S.TabButton>
      </S.TabContainer>
      <S.Header>
        <S.Count>전체 {displayBooths.length}개</S.Count>
      </S.Header>

      {showFavoritesOnly && displayBooths.length === 0 ? (
        <S.EmptyState>
          <S.EmptyText>
            아직 찜한 주점이 없습니다.{'\n'}
            마음에 드는 주점을 찜해보세요!
          </S.EmptyText>
        </S.EmptyState>
      ) : (
        <S.BoothList>
          <S.BoothItem>
            {displayBooths.map((booth) => {
              const isFavorited = favorites.includes(booth.id);

              return (
                <Fragment key={booth.id}>
                  <S.BoothItemWrapper>
                    <ImageTextFrameWithOrganization
                      key={booth.id}
                      width="100%"
                      image={booth.profileImage}
                      title={booth.pubName}
                      organization={booth.affiliation}
                      canPickup={booth.takeout}
                      onClick={() =>
                        navigate(`/booth/${booth.id}`, {
                          state: { from: location.pathname + location.search },
                        })
                      }
                    />
                    <S.FavoriteButton
                      onClick={(e) => handleToggleFavorite(booth.id, e)}
                      $isFavorited={isFavorited}
                      $isTrashMode={showFavoritesOnly}
                    >
                      {showFavoritesOnly ? (
                        <TrashIcon />
                      ) : isFavorited ? (
                        <FavoriteOn />
                      ) : (
                        <FavoriteOff />
                      )}
                      {showFavoritesOnly ? null : isFavorited ? '찜 완료' : '찜하기'}
                    </S.FavoriteButton>
                  </S.BoothItemWrapper>
                  <S.HorizontalLine />
                </Fragment>
              );
            })}
          </S.BoothItem>
        </S.BoothList>
      )}
    </S.Container>
  );
}
