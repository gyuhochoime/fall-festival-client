/**
 * NavBar 컴포넌트의 Props 타입 정의
 */
export interface NavBarProps {
  isBack?: boolean;
  isSearch?: boolean;
  isFavorite?: boolean;
  isClose?: boolean;
  hideLeft?: boolean;
  hideRight?: boolean;
  title?: string;
  onSearchClick?: () => void;
  onFavoriteClick?: () => void;
  onCloseClick?: () => void;
  onBackClick?: () => void;
  backPath?: number | string;
  opacity?: boolean;
  whiteIcons?: boolean;
  isSearchMode?: boolean; // 검색 모드 여부
}

export interface SearchNavBarProps {
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value?: string;
  backPath?: number | string;
}
