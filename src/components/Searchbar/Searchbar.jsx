import PropTypes from "prop-types";
import { useState } from "react";
import {
  SearchBar,
  SearchBtn,
  SearchBtnLabel,
  SearchForm,
  SearchInput,
} from "../styles/styled";

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={onSubmitHandler}>
        <SearchBtn type="submit">
          <SearchBtnLabel>Search</SearchBtnLabel>
        </SearchBtn>

        <SearchInput
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeHandler}
        />
      </SearchForm>
    </SearchBar>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
