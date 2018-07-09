import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {

  state = {
    booksFound: []
  }

  searchBook = (value) => {

    BooksAPI.search(value).then((results) => {

      if (results === undefined || results.error)
      {
        this.setState({booksFound:[]})
        return
      }          

      let booksFoundWithShelf = []
      let bookFoundWithShelf = null

      results.map((bookFound) => {
            
          bookFoundWithShelf = bookFound

          let bookShelf = this.props.myBooks.find(b => b.id == bookFound.id)

          if (bookShelf)
          {
            bookFoundWithShelf = {...bookFound, shelf: bookShelf.shelf}
          }
          
          booksFoundWithShelf.push(bookFoundWithShelf)

        })

        this.setState({booksFound:booksFoundWithShelf})
      
    }) 
  }

  render() {

    //let booksFound = this.props.booksFound
    let myBooks = this.props.myBooks
    let shelfs = this.props.shelfs

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"

              onChange={
                (event) => { this.searchBook(event.target.value) }
              }
            />

          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksFound.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : ""
                    }}></div>
                    <div className="book-shelf-changer">

                      <select defaultValue={book.shelf?book.shelf:"none"} onChange={
                        (event) => {
                          const elem = event.target
                          this.props.OnMoveBook(book, elem.options[elem.selectedIndex].value)
                        }
                      }>
                        <option value="move" disabled>Move to...</option>
                        {
                          shelfs.map((shelf, index) => (
                            <option key={index}
                              value={shelf.id}>{shelf.description}</option>
                          ))
                        }
                      </select>

                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors ? book.authors.join(', ') : ""}</div>
                </div>
              </li>

            ))}
          </ol>

        </div>
      </div>
    )
  }
}

export default SearchBooks