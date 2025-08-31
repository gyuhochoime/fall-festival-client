import * as S from './SearchBar.styles';
import DropDownIcon from '@/assets/icons/drop-down.svg?react';
import { SearchBarProps } from './SearchBar.types';

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '검색어를 입력해 주세요',
  selectedDay = '1일차',
  onSearchClick,
  onDayChange,
}) => {
  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSearchClick?.();
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDayChange?.('open-modal');
  };

  return (
    <S.Container>
      <S.SearchInput onClick={handleSearchClick}>
        <S.Placeholder>{placeholder}</S.Placeholder>
      </S.SearchInput>
      <S.Separator />
      <S.DropdownContainer onClick={handleDropdownClick}>
        <S.DropdownText>{selectedDay}</S.DropdownText>
        <S.DropdownIcon $isOpen={false}>
          <DropDownIcon width="16" height="16" />
        </S.DropdownIcon>
      </S.DropdownContainer>
    </S.Container>
  );
};

export default SearchBar;
