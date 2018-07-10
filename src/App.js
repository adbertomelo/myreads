import React from 'react'
import ListBooks from './components/ListBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBooks';
import { Route} from 'react-router-dom'

class BooksApp extends React.Component {
  
  state = {
    books: [],
    shelfs: []        
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

  Refresh = () => {
    BooksAPI.getAll().then((results) => {

      this.setState({ books: results})

    })

  }

  MoveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      this.Refresh()
    })
  }

  render() {
    return (
      <div className="app">
        
        <Route exact path="/" render={() => (
          <ListBooks shelfs={this.state.shelfs} books={this.state.books} OnMoveBook = {this.MoveBook} />          
        )}/>
 
        <Route path="/search" render={() => (<SearchBooks shelfs={this.state.shelfs} 
                                                          myBooks={this.state.books} 
                                                          OnMoveBook = {this.MoveBook}
                                                          />)}/>        
        
      </div>
    )
  }
}

export default BooksApp
