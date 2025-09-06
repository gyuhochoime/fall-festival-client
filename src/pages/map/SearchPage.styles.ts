import styled from 'styled-components';

export const SearchPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100vw;
  height: 100vh;
  padding-bottom: auto;
`;

export const SearchHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.25rem 0;
  gap: 1rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  rotate: 180deg;
`;

export const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 4.375rem;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 20.9375rem; /* 335px */
  height: 2.8125rem; /* 45px */
  flex-shrink: 0;
  padding: 1rem 1.5625rem;
  border: transparent;
  background: ${(props) => props.theme.colors.grayScale.gy100}; /* #E9E9EA */
  border-radius: 0.75rem; /* 12px */
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary.violet};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale.gy500};
    ${(props) => props.theme.fonts.body.small400};
  }
`;

export const SearchIconWrapper = styled.div<{ $isClickable?: boolean }>`
  position: absolute;
  right: 1.5625rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: ${({ $isClickable }) => ($isClickable ? 'auto' : 'none')};
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  color: ${(props) => props.theme.colors.grayScale.gy500};
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 2.25rem;
  height: 1.5rem;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
`;

export const RecommendedSearchSection = styled.div`
  display: flex;
  width: 20.9375rem; /* 335px */
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  margin-top: 1rem;
`;

export const RecommendedSearchHeader = styled.h3`
  align-self: stretch;
  color: ${(props) => props.theme.colors.grayScale.black}; /* #1A1A1A */
  font-family: Pretendard, sans-serif;
  font-size: 1rem; /* 16px */
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.02rem; /* -0.32px */
`;

export const CustomTabsWrapper = styled.div`
  & > div > button {
    display: flex;
    padding: 0.5rem 0.75rem; /* 8px 12px */
    justify-content: center;
    align-items: center;
    gap: 0.25rem; /* 4px */
    border-radius: 3.125rem; /* 50px */
    background: ${(props) => props.theme.colors.primary.violet}20; /* rgba(126, 65, 154, 0.20) */
    border: none;

    & > p {
      color: ${(props) => props.theme.colors.primary.violet};
      text-align: center;
      font-family: Pretendard, sans-serif;
      font-size: 0.875rem; /* 14px */
      font-style: normal;
      font-weight: 400;
      line-height: 142%;
      letter-spacing: -0.0175rem;
    }
  }
`;

export const SearchResultsContainer = styled.div`
  display: flex;
  width: 20.9375rem;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0.75rem;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.grayScale.gy50};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 0;
`;

export const EmptyText = styled.p`
  ${(props) => props.theme.fonts.body.medium500};
  color: ${(props) => props.theme.colors.grayScale.gy400};
  text-align: center;
`;

export const NoResultsState = styled.div`
  display: flex;
  width: 13rem; /* 208px */
  flex-direction: column;
  align-items: center;
  gap: 0.75rem; /* 12px */
  margin-top: 11.75rem; /* 검색창에서 11.75rem 아래 */
`;

export const NoResultsText = styled.p`
  align-self: stretch;
  color: ${(props) => props.theme.colors.primary.violet}; /* #7E419A */
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-size: 1rem; /* 16px */
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.02rem; /* -0.32px */
  white-space: pre-line;
`;
export const AutocompleteContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.colors.grayScale.white};
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 1rem rgb(0 0 0 / 10%);
  z-index: 1000;
  margin-top: 0.25rem;
  max-height: 12.5rem;
  overflow-y: auto;
`;

export const AutocompleteItem = styled.div`
  display: flex;
  padding: 0.625rem 0;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: background-color 0.2s ease;
`;

export const AutocompleteText = styled.span`
  color: ${(props) => props.theme.colors.grayScale.black};
  font-size: 1rem;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.02rem;
  flex: 1;
`;

export const AutocompleteCategory = styled.span`
  color: ${(props) => props.theme.colors.grayScale.gy550};
  text-align: right;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.0175rem;
`;
