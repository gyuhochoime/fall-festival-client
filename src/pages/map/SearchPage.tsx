import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './SearchPage.styles';
import { NavBar } from '@/components/nav-bar';
import { Tabs } from '@/components/tabs';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { MapData, MapDataItem } from '@/constants/map/MapData';
import { useDebounce } from '@/hooks/useDebounce';
import SearchIcon from '@/assets/icons/search-gray.svg?react';
import CloseIcon from '@/assets/icons/close-search.svg?react';
import MapSearchIcon from '@/assets/icons/map-search.svg?react';
import MapCategoryIcon from '@/assets/icons/map-category-page.svg?react';
import MapSearchPageIcon from '@/assets/icons/map-search-page.svg?react';

interface AutocompleteItem {
  id: string;
  text: string;
  type: 'category' | 'location';
  category?: string; // 위치 검색어의 소속 카테고리
}

export default function MapSearch() {
  const setIsNav = useLayoutStore((state) => state.setIsNav);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [, setSearchResults] = useState<MapDataItem[]>([]);
  const debouncedSearchTerm = useDebounce(searchKeyword, 300);

  // 카테고리 목록
  const categories = useMemo(
    () => [
      '프로모션',
      '주점',
      '푸드트럭',
      '콘텐츠',
      '화장실',
      '의무실',
      '셔틀콕',
      '공연장',
      '흡연실',
      '주류 구매',
      '플리마켓',
    ],
    [],
  );

  // 자동완성 생성 (useMemo로 최적화)
  const autocompleteItems = useMemo(() => {
    if (!searchKeyword.trim()) return [];

    const autocomplete: AutocompleteItem[] = [];
    const query = searchKeyword.toLowerCase().trim();

    // 카테고리 자동완성
    categories.forEach((category) => {
      if (category.toLowerCase().includes(query)) {
        autocomplete.push({
          id: `category-${category}`,
          text: category,
          type: 'category',
        });
      }
    });

    // 위치 검색어 자동완성
    Object.entries(MapData).forEach(([categoryName, items]) => {
      items.forEach((item) => {
        if (item.title.toLowerCase().includes(query)) {
          autocomplete.push({
            id: `location-${item.id}`,
            text: item.title,
            type: 'location',
            category: categoryName,
          });
        }
      });
    });

    return autocomplete;
  }, [searchKeyword, categories]);

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
          if (item.title.includes(debouncedSearchTerm)) {
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

  const handleClearSearch = () => {
    setSearchKeyword('');
  };

  const handleRecommendedClick = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleAutocompleteClick = (item: AutocompleteItem) => {
    if (item.type === 'category') {
      // 카테고리 클릭 시 MapPage로 이동하면서 카테고리 선택 상태 전달
      navigate('/map', {
        state: {
          selectedCategory: item.text,
          showBottomSheet: true,
        },
      });
    } else {
      // 위치 검색어 클릭 시 검색어만 설정
      setSearchKeyword(item.text);
    }
  };

  return (
    <S.SearchPageContainer>
      <NavBar isBack={true} title="지도 검색" isClose={false} backPath="/map" />
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
        autocompleteItems.length > 0 ? (
          <S.SearchResultsContainer>
            {autocompleteItems.map((item) => (
              <S.AutocompleteItem key={item.id} onClick={() => handleAutocompleteClick(item)}>
                {item.type === 'category' ? (
                  <MapCategoryIcon width="1.5rem" height="1.5rem" />
                ) : (
                  <MapSearchPageIcon width="1.5rem" height="1.5rem" />
                )}
                <S.AutocompleteText>{item.text}</S.AutocompleteText>
                {item.type === 'location' && item.category && (
                  <S.AutocompleteCategory>{item.category}</S.AutocompleteCategory>
                )}
              </S.AutocompleteItem>
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
