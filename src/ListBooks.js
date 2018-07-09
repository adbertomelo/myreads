import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends Component{

  handleChange(event) {
    const elem = event.target
    console.log(elem.options[elem.selectedIndex].value);
  }
  
  render()
  {

    let books = this.props.books
    
    let shelfs = this.props.shelfs

    return(

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
              <div>

                {shelfs.filter(shelf => shelf.id !== "none").map((shelf) => (
                  <div key={shelf.id} className="bookshelf">
                    <h2 className="bookshelf-title">{shelf.description}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                      {books
                        .filter(book => book.shelf === shelf.id)
                        .map((book) =>(
                          <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select defaultValue={book.shelf} onChange={
                                  (event) => {
                                    const elem = event.target
                                    this.props.OnMoveBook(book, elem.options[elem.selectedIndex].value)
                                    }
                                  }>
                                  <option value="move" disabled>Move to...</option>
                                  {
                                    shelfs.map((shelf, index) =>(
                                      <option key={index} 
                                        value={shelf.id}>{shelf.description}</option>
                                     ))
                                  }
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors.join(', ')}</div>
                          </div>
                        </li>                  
                      ))}
                      </ol>
                    </div>
                  </div>
                ))}

              </div>

        </div>
        <div className="open-search">
              
              <Link
                to="/search">Add a book</Link>

        </div>

      </div>

    )
  }
}

export default ListBooks