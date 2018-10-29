import React from "react";
import Book from './Book'

const BookinShelf = (props) => (

  <div className="bookShelf">
        <h2 className="bookshelf-title">{props.shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.map(book => (
              <Book
                book={book}
                shelf={props.shelf}
                key={book.id}
                changeShelf={props.changeShelf}
              />
            ))}
          </ol>
        </div>
      </div>

);
export default BookinShelf;
