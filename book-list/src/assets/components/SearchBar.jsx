import React, { useContext, useState } from 'react';
import SearchContext from '../context/SearchContext';

const SearchBar = () => {
  const { setSearchText } = useContext(SearchContext);
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchText(searchInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Search for a book..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
