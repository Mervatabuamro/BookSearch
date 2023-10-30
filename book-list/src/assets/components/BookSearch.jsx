// BookSearch.js
import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import './BookSearch.css'
import Book from "./Book";
import Loading from "./Loading";
import SearchContext from "../context/SearchContext";


const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
 const data = useContext(SearchContext);
  const searchText = data.searchText;
  const [readBooks, setReadBooks] = useState([]);
  const [toReadBooks, setToReadBooks] = useState([]);


 useEffect(() => {
  const getData = async () => {
      try {
          const res = await axios.get(

              `https://gutendex.com/books/?page=${
                  import.meta.env.VITE_API_KEY
              }&s=${searchText}&page=1`
          );
          console.log(res);

          if (res.status === 200) {
            setError('');
            setBooks(res.data.results);
          } else {
              throw new Error(
                  `Failed to fetch books with status : ${res.status}`
              )
          }
      } catch (err) {
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };
  getData();
}, [searchText]);

 const toggleRead = (book) => {
     // Check if the book is already in readBooks
  const isBookRead = readBooks.some((b) => b.id === book.id);

  if (isBookRead) {
    // If the book is already marked as read, remove it from readBooks
    setReadBooks((prevReadBooks) => prevReadBooks.filter((b) => b.id !== book.id));
  } else {
    // If the book is not in readBooks, add it to readBooks
    setReadBooks((prevReadBooks) => [...prevReadBooks, book]);
  }

  };

  const toggleToRead = (book) => {
    
     // Check if the book is already in toReadBooks
  const isBookToRead = toReadBooks.some((b) => b.id === book.id);
  if (isBookToRead) {
    // If the book is already in toReadBooks, remove it from toReadBooks
    setToReadBooks((prevToReadBooks) => prevToReadBooks.filter((b) => b.id !== book.id));
  } else {
    // If the book is not in toReadBooks, add it to toReadBooks
    setToReadBooks((prevToReadBooks) => [...prevToReadBooks, book]);
  }

  };

return (
  <div className="book-list">
    {loading && <Loading/>}
      {error && <p className="error">{error}</p>}
      {!error &&
          books.map((book, index) => (
            <Book
            key={index}
            book={book}
            onToggleRead={toggleRead}
            onToggleToRead={toggleToRead}
          />
              
          ))}
  </div>
);
};

export default BookSearch;
