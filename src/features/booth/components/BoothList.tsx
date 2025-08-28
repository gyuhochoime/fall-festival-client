import * as S from './BoothList.styles';
import { ImageTextFrameWithOrganization } from '@/components/image-text-frame';
import { Notification } from '@/components/notification';
import { useNavigate, useLocation } from 'react-router-dom';
import { BOOTH_LIST } from '@/constants/booth/booth';
import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';

import FavoriteOn from 'src/assets/icons/favorite-on.svg?react';
import FavoriteOff from 'src/assets/icons/favorite-off.svg?react';

export default function BoothList() {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <S.Container>
      <Notification title="[공지] 미취학 아동 입장 제한" width="100%" />
      <S.Header>
        <S.Count>전체 26개</S.Count>
      </S.Header>
      <S.BoothList>
        <S.BoothItem>
          {BOOTH_LIST.map((booth) => {
            const isFavorited = favorites.includes(booth.id); //주점 찜하기 추가

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
                    aria-label={isFavorited ? '찜 완료' : '찜하기'}
                  >
                    {isFavorited ? <FavoriteOn /> : <FavoriteOff />}
                    {isFavorited ? '찜 완료' : '찜하기'}
                  </S.FavoriteButton>
                </S.BoothItemWrapper>
                <S.HorizontalLine />
              </Fragment>
            );
          })}
        </S.BoothItem>
      </S.BoothList>
    </S.Container>
  );
}
