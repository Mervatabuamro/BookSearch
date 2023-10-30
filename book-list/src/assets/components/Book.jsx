import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types';

import './Book.css'


const Book = ({ book}) => {
    const [read, setRead] = useState(false);
    const [toRead, setToRead] = useState(false);

    const toggleRead = () => {
        setRead((prevRead) => !prevRead);
    };

    const toggleToRead = () => {
        setToRead((prevToRead) => !prevToRead);
    };

    return (
        <div className={`book-container ${read? 'yes' : 'no'}`}>
            <div className="book-cover">
            <img
          src={book.formats['image/jpeg'] || book.formats['image/png'] || book.formats['image/gif'] || ''}
          alt={book.title}
        />
            </div>
            <div className="book-details">
                <h2>{book.title}</h2>
                <h2>{book.authors[0]?.name}</h2>
                <p>
                {book.subjects.join(', ')}
                </p>
            </div>
            <div className='container-button'>
        <button onClick={toggleRead} className={`read-btn ${read ? 'read' : ''}`}>
          {read ? 'Mark Unread' : 'Mark Read'}
        </button>
        <button onClick={toggleToRead} className={`to-read-btn ${toRead ? 'to-read' : ''}`}>
          {toRead ? 'Remove from To Read' : 'Add to To Read'}
        </button>
      </div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(
            PropTypes.shape({
                name:PropTypes.string.isRequired,
            })
        ).isRequired,
        subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
        formats: PropTypes.object.isRequired
    })
};

export default Book;