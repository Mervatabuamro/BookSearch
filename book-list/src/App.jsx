// App.js
import React from "react";
import BookSearch from "./assets/components/BookSearch";
import './App.css'
import { useState } from "react";
import SearchContext from "./assets/context/SearchContext";
import SearchBar from "./assets/components/SearchBar";


const App = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <div className="App">

      <SearchContext.Provider
      value={{
        searchText: searchText,
        setSearchText: setSearchText,
        title: 'books',
      }}
      >
        <SearchBar />
        <BookSearch />
      </SearchContext.Provider>
     
      
    </div>
  );
};

export default App;

