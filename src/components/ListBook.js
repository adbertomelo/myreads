import React, { Component } from 'react'


class ListBook extends Component {

  render() {

    let thisBook = this.props.book
    let shelfs = this.props.shelfs

    return (

    
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thisBook.imageLinks ? `url(${thisBook.imageLinks.thumbnail})` : "" }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={thisBook.shelf?thisBook.shelf:"none"} onChange={
              (event) => {
                this.props.OnMoveBook(thisBook, event.target.value)
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
        <div className="book-title">{thisBook.title}</div>
        <div className="book-authors">{thisBook.authors ? thisBook.authors.join(', ') : ""}</div>
      </div>
                   

    )
  }
}

export default ListBook