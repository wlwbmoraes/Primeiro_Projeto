import React from 'react'
import * as BooksAPI from './Componentes/Servicos/BooksAPI';
import './App.css'
import { Link, Route } from "react-router-dom";
import BookinShelf from './Componentes/Livros/BookinShelf';
import ResearchedBooks from './Componentes/Livros/ResearchedBooks';


class BooksApp extends React.Component {
  state = {
    shelvedBooks: [],
     shelves: [
      {
        id: "currentlyReading",
        name: "Lendo Atualmente"
      },
      {
        id: "wantToRead",
        name: "Quero Ler"
      },
      {
        id: "read",
        name: "Leitura concluida"
      }
    ]
  };

  componentDidMount() {
    BooksAPI.getAll().then(shelvedBooks => {
      this.setState({ shelvedBooks });
    });
  }

  changeShelf = (bookToAdd, shelf) => {
    this.setState(state => {
          const nextState = state.shelvedBooks.filter(book => book.id !== bookToAdd.id).concat( [{...bookToAdd, shelf}] );
          return { shelvedBooks: nextState };
        });
      }

  render() {
    return (
      <div className="app">
        <Route path="/search"
          render={() => (
            <ResearchedBooks
              shelvedBooks={this.state.shelvedBooks}
              changeShelf={this.changeShelf}
            />
          )}
        />  
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {this.state.shelves.map(shelf => (
                  <BookinShelf
                    key={shelf.id}
                    shelf={shelf}
                    shelvedBooks={this.state.shelvedBooks}
                    books={this.state.shelvedBooks.filter(shelvedBooks => {
                      return shelvedBooks.shelf === shelf.id;
                    })}
                    changeShelf={this.changeShelf}
                  />
                ))}
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />  
      </div>
    );
  }
}

export default BooksApp
