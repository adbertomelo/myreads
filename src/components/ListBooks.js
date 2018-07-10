import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBook from './ListBook'

class ListBooks extends Component{


  render()
  {
    console.log(this.props)

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
                               <ListBook book={book} shelfs={shelfs} OnMoveBook={this.props.OnMoveBook} /> 
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