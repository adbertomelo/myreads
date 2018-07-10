import React from 'react'
import ListBooks from './ListBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import { Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfs: []        
  }

  refresh(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  componentDidMount(){
    BooksAPI.getAll().then((results) => {

      this.setState({ books: results, shelfs: [
        { "id": "currentlyReading", "description": "Currently Reading" },
        { "id": "wantToRead", "description": "Want To Read" },
        { "id": "read", "description": "Read" },
        { "id": "none", "description": "None" }
      ] })

    })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      this.refresh()
    })
  }

  render() {
    return (
      <div className="app">
        
        <Route exact path="/" render={() => (
          <ListBooks shelfs={this.state.shelfs} books={this.state.books} OnMoveBook={this.moveBook} />          
        )}/>
 
        <Route path="/search" render={() => (<SearchBooks shelfs={this.state.shelfs} 
                                                          myBooks={this.state.books} 
                                                          OnMoveBook={this.moveBook}/>)}/>        
        
      </div>
    )
  }
}

export default BooksApp
