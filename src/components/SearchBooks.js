import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import ListBook from './ListBook'
import  * as shelfsTypes from '../constants/shelfsTypes'

class SearchBooks extends Component {

  state = {
    booksFound: [],
    query:""
  }

  updateQuery = (query) =>{

      if(!query){
        this.setState({query:"", booksFound:[]})
        return
      }

      this.setState({
        query: query,
        booksFound:[]
      }, () =>{
        this.searchBook()
      })

  }

  searchBook = () => {

    const text = this.state.query

    if(text.trim() === ""){
      this.setState({query:"", booksFound:[]})
      return
    }

    BooksAPI.search(text).then((results) => {


      if (!this.state.query || results === undefined || results.error)
      {
        this.setState({booksFound:[]})
        return
      }          

      let booksFoundWithShelf = []
      let bookFoundWithShelf = null

      results.forEach((bookFound) => {
            
          bookFoundWithShelf = bookFound

          let bookShelf = this.props.myBooks.find(b => b.id === bookFound.id)

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

    let shelfs = shelfsTypes.SHELFS

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"

              onChange={
                (event) => { this.updateQuery(event.target.value) }
              }
            />

          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksFound.map((book) => (
              
              <li key={book.id}>
                <ListBook book={book} shelfs={shelfs} OnMoveBook={this.props.OnMoveBook} /> 
              </li>

            ))}
          </ol>

        </div>
      </div>
    )
  }
}

export default SearchBooks