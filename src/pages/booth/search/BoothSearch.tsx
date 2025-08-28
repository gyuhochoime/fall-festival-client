import { NavBar } from '@/components/nav-bar/NavBar';
import { ImageTextFrameWithOrganization } from '@/components/image-text-frame';
import { useNavigate, useLocation } from 'react-router-dom';
import { BOOTH_LIST } from '@/constants/booth/booth';
import { Fragment, useState, useMemo } from 'react';
import { useFavorites } from '@/hooks/useFavorites';

import FavoriteOn from '@/assets/icons/favorite-on.svg?react';
import FavoriteOff from '@/assets/icons/favorite-off.svg?react';
import SearchIcon from '@/assets/icons/search-gray.svg?react';
import CloseIcon from '@/assets/icons/close-search.svg?react';

import * as S from './BoothSearch.styles';

export default function BoothSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleToggleFavorite, isFavorited } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCloseClick = () => {
    navigate('/booth');
  };

  // 검색 결과 필터링 (주점명, 소속 단체 기준)
  const filteredBooths = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    return BOOTH_LIST.filter(
      (booth) =>
        booth.pubName.toLowerCase().includes(query) ||
        booth.affiliation.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <S.Container>
      <NavBar hideLeft isClose title="주점 검색" onCloseClick={handleCloseClick} />
      <S.Main>
        <S.Content>
          <S.SearchSection>
            <S.SearchInputWrapper>
              <S.SearchInput
                type="text"
                placeholder="검색어를 입력해 주세요"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <S.SearchIconWrapper
                $isClickable={searchQuery.trim() !== ''}
                onClick={searchQuery.trim() !== '' ? handleClearSearch : undefined}
              >
                {searchQuery.trim() !== '' ? (
                  <CloseIcon width="1rem" height="1rem" />
                ) : (
                  <SearchIcon width="1rem" height="1rem" />
                )}
              </S.SearchIconWrapper>
            </S.SearchInputWrapper>
          </S.SearchSection>

          {searchQuery.trim() === '' ? (
            <S.EmptyState>
              <S.EmptyText>찾고 싶은 주점을 검색해보세요!</S.EmptyText>
            </S.EmptyState>
          ) : filteredBooths.length === 0 ? (
            <S.NoResultsState>
              <S.NoResultsText>
                '{searchQuery}'에 대한 검색 결과가 없습니다.
                {'\n'}
                다른 키워드로 검색해보세요.
              </S.NoResultsText>
            </S.NoResultsState>
          ) : (
            <>
              <S.ResultsHeader>
                <S.Count>검색 결과 {filteredBooths.length}개</S.Count>
              </S.ResultsHeader>

              <S.ResultsList>
                <S.ResultItem>
                  {filteredBooths.map((booth) => {
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
                            aria-label={isBoothFavorited ? '찜 완료' : '찜하기'}
                          >
                            {isBoothFavorited ? <FavoriteOn /> : <FavoriteOff />}
                            {isBoothFavorited ? '찜 완료' : '찜하기'}
                          </S.FavoriteButton>
                        </S.BoothItemWrapper>
                        <S.HorizontalLine />
                      </Fragment>
                    );
                  })}
                </S.ResultItem>
              </S.ResultsList>
            </>
          )}
        </S.Content>
      </S.Main>
    </S.Container>
  );
}
