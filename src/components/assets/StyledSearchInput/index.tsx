import 'bootstrap/dist/css/bootstrap.min.css';

import { InputProps } from 'reactstrap';
import React from 'react';
import { SearchIcon } from '../SearchIcon';
import styled from 'styled-components';

export type StyledSearchInputPropsType = {
  placeholder: string;
  initialSearchBoxWidth?: string;
} & InputProps;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .collapsible-search-box__clz {
    transition: all 100ms ease-in-out;
  }

  .form-control__clz {
    border: none;
    padding-left: 40px;
    padding-right: 20px;
    background-color: #f3f3f9;
    border-radius: 10px;
  }

  .search-icon__clz {
    position: absolute;
    z-index: 10;
    left: 10px;
    fill: #74788d;
  }
`;

// eslint-disable-next-line
export function StyledSearchInput({
  placeholder,
  ...props
}: StyledSearchInputPropsType) {
  return (
    <Wrapper>
      <input
        type="text"
        className="form-control form-control__clz"
        placeholder={placeholder}
        {...props}
      />
      <SearchIcon className="search-icon__clz" height={15} width={15} />
    </Wrapper>
  );
}
// eslint-disable-next-line
export function StyledCollapsibleSearchInput({
  placeholder,
  initialSearchBoxWidth,
  ...props
}: StyledSearchInputPropsType) {
  const [searchBoxWidth, setSearchBoxWidth] = React.useState<
    string | undefined
  >(initialSearchBoxWidth === undefined ? '120px' : initialSearchBoxWidth);

  function handleTextFocus() {
    setSearchBoxWidth('100%');
  }

  function handleTextBlur() {
    setSearchBoxWidth(
      initialSearchBoxWidth === undefined ? '120px' : initialSearchBoxWidth
    );
  }

  return (
    <Wrapper
      className="collapsible-search-box__clz"
      style={{ width: searchBoxWidth }}
    >
      <input
        type="text"
        className="form-control form-control__clz"
        placeholder={placeholder}
        onFocus={handleTextFocus}
        onBlur={handleTextBlur}
        {...props}
      />
      <SearchIcon className="search-icon__clz" height={15} width={15} />
    </Wrapper>
  );
}
