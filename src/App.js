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
      this.setState({ books: results})
    }).catch(error => {
      //não pensei no que fazer para mostrar mensagem de erro
      console.log(error);
    })

  }

  
  MoveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      
      let currentBook = book;
      currentBook.shelf = shelf;
      let booksUpd = this.state.books.filter(b => b.id !== currentBook.id).concat([ currentBook ])
      this.setState( {books: booksUpd} )

    }).catch(error => {
      //não pensei no que fazer para mostrar mensagem de erro      
      console.log(error);
    })
  }

  render() {
    return (
      <div className="app">
        
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} OnMoveBook = {this.MoveBook} />          
        )}/>
 
        <Route path="/search" render={() => (<SearchBooks myBooks={this.state.books} 
                                                          OnMoveBook = {this.MoveBook}
                                                          />)}/>        
        
      </div>
    )
  }
}

export default BooksApp
