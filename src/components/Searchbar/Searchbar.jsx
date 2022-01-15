import PropTypes from "prop-types";
import { useState } from "react";
import {
  SearchBar,
  SearchBtn,
  SearchBtnLabel,
  SearchForm,
  SearchInput,
  SearchIcon,
} from "../styles/styled";

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onSubmit(searchQuery);
    event.currentTarget.searchQuery.value = "";
    setSearchQuery("");
  };

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={onSubmitHandler}>
        <SearchBtn type="submit">
          <SearchIcon />
          <SearchBtnLabel>Search</SearchBtnLabel>
        </SearchBtn>

        <SearchInput
          name="searchQuery"
          type="text"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeHandler}
        />
      </SearchForm>
    </SearchBar>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
