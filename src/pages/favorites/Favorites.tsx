import { NavBar } from '@/components/nav-bar/NavBar';
import { ImageTextFrameWithOrganization } from '@/components/image-text-frame';
import { useNavigate, useLocation } from 'react-router-dom';
import { BOOTH_LIST } from '@/constants/booth/booth';
import { Fragment } from 'react/jsx-runtime';
import { useFavorites } from '@/hooks/useFavorites';

import FavoriteOn from '@/assets/icons/trash.svg?react';

import * as S from './Favorites.styles';

export default function Favorites() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleToggleFavorite, isFavorited } = useFavorites();

  // 찜한 주점들만 필터링
  const favoriteBooths = BOOTH_LIST.filter((booth) => isFavorited(booth.id));

  return (
    <S.Container>
      <NavBar isBack title="찜한 주점 목록" />
      <S.Main>
        <S.Content>
          <S.Header>
            <S.Count>전체 {favoriteBooths.length}개</S.Count>
          </S.Header>

          {favoriteBooths.length === 0 ? (
            <S.EmptyState>
              <S.EmptyText>
                아직 찜한 주점이 없습니다.{'\n'}
                마음에 드는 주점을 찜해보세요!
              </S.EmptyText>
            </S.EmptyState>
          ) : (
            <S.FavoritesList>
              <S.FavoriteItem>
                {favoriteBooths.map((booth) => {
                  const isBoothFavorited = isFavorited(booth.id);

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
                          $isFavorited={isBoothFavorited}
                        >
                          {isBoothFavorited ? <FavoriteOn /> : ''}
                        </S.FavoriteButton>
                      </S.BoothItemWrapper>
                      <S.HorizontalLine />
                    </Fragment>
                  );
                })}
              </S.FavoriteItem>
            </S.FavoritesList>
          )}
        </S.Content>
      </S.Main>
    </S.Container>
  );
}
