import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './SearchPage.styles';
import { NavBar } from '@/components/nav-bar';
import { Tabs } from '@/components/tabs';
import { ImageTextFrameWithTime } from '@/components/image-text-frame';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { MapData, MapDataItem } from '@/constants/map/MapData';
import { useDebounce } from '@/hooks/useDebounce';
import SearchIcon from '@/assets/icons/search-gray.svg?react';
import CloseIcon from '@/assets/icons/close-search.svg?react';
import MapSearchIcon from '@/assets/icons/map-search.svg?react';

export default function MapSearch() {
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<MapDataItem[]>([]);
  const debouncedSearchTerm = useDebounce(searchKeyword, 300);

  // 내비바 숨기기 및 언마운트 시 내비바 보이기
  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  // 디바운스된 검색어로 검색 실행
  useEffect(() => {
    if (debouncedSearchTerm) {
      const results: MapDataItem[] = [];

      // 모든 카테고리의 아이템을 검색
      Object.values(MapData).forEach((items) => {
        items.forEach((item) => {
          if (
            item.title.includes(debouncedSearchTerm) ||
            (item.subtitle && item.subtitle.includes(debouncedSearchTerm))
          ) {
            results.push(item);
          }
        });
      });

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleResultClick = useCallback(
    (item: MapDataItem) => {
      if (item.id) {
        navigate(`/map/${item.id}`, { replace: true });
      }
    },
    [navigate],
  );

  const handleClearSearch = () => {
    setSearchKeyword('');
  };

  const handleRecommendedClick = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <S.SearchPageContainer>
      <NavBar isBack={true} title="지도 검색" isClose={false} backPath="/main" />
      <S.SearchSection>
        <S.SearchInputWrapper>
          <S.SearchInput
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={searchKeyword}
            onChange={handleInputChange}
          />
          <S.SearchIconWrapper
            $isClickable={searchKeyword.trim() !== ''}
            onClick={searchKeyword.trim() !== '' ? handleClearSearch : undefined}
          >
            {searchKeyword.trim() !== '' ? (
              <CloseIcon width="1rem" height="1rem" />
            ) : (
              <SearchIcon width="1rem" height="1rem" />
            )}
          </S.SearchIconWrapper>
        </S.SearchInputWrapper>
      </S.SearchSection>
      {searchKeyword ? (
        searchResults.length > 0 ? (
          <S.SearchResultsContainer>
            {searchResults.map((item, index) => (
              <React.Fragment key={item.id}>
                <ImageTextFrameWithTime
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle || ''}
                  time={item.time}
                  onClick={() => handleResultClick(item)}
                />
                {index < searchResults.length - 1 && <S.Divider />}
              </React.Fragment>
            ))}
          </S.SearchResultsContainer>
        ) : (
          <S.NoResultsState>
            <MapSearchIcon width="2.25rem" height="2.25rem" />
            <S.NoResultsText>
              앗, 검색 결과가 없어요.
              {'\n'}
              검색어를 다시 한번 확인해 주세요!
            </S.NoResultsText>
          </S.NoResultsState>
        )
      ) : (
        <S.RecommendedSearchSection>
          <S.RecommendedSearchHeader>추천 검색어</S.RecommendedSearchHeader>
          <S.CustomTabsWrapper>
            <Tabs
              tabs={['화장실', '주류 구매', '셔틀콕']}
              activeTab=""
              onTabClick={handleRecommendedClick}
              autoWidth={true}
              margin="0"
              gap="0.5rem"
            />
          </S.CustomTabsWrapper>
        </S.RecommendedSearchSection>
      )}
    </S.SearchPageContainer>
  );
}
