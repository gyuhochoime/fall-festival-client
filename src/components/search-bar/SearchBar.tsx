import { useState } from 'react';
import * as S from './SearchBar.styles';
import DropDownIcon from '@/assets/icons/drop-down.svg?react';
import { SearchBarProps } from './SearchBar.types';

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '검색어를 입력해 주세요',
  selectedDay = '1일차',
  onSearchClick,
  onDayChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSearchClick?.();
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDaySelect = (day: string) => {
    onDayChange?.(day);
    setIsDropdownOpen(false);
  };

  return (
    <S.Container>
      <S.SearchInput onClick={handleSearchClick}>
        <S.Placeholder>{placeholder}</S.Placeholder>
      </S.SearchInput>
      <S.Separator />
      <S.DropdownContainer onClick={handleDropdownClick}>
        <S.DropdownText>{selectedDay}</S.DropdownText>
        <S.DropdownIcon $isOpen={isDropdownOpen}>
          <DropDownIcon width="16" height="16" />
        </S.DropdownIcon>
      </S.DropdownContainer>
      {isDropdownOpen && (
        <S.DropdownMenu>
          <S.DropdownItem onClick={() => handleDaySelect('1일차')}>1일차</S.DropdownItem>
          <S.DropdownItem onClick={() => handleDaySelect('2일차')}>2일차</S.DropdownItem>
          <S.DropdownItem onClick={() => handleDaySelect('3일차')}>3일차</S.DropdownItem>
        </S.DropdownMenu>
      )}
    </S.Container>
  );
};

export default SearchBar;
