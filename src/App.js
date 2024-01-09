import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';

class App extends Component {
  
  api = "https://openlibrary.org/search.json";
  testResponse = ['book1','book2','book3', 'book4', 'book5', 'book6', 'book7', 'book8', 'book9', 'book10', 'book11'];
  
  constructor(props){
    super(props);
      this.state = {
        query: '',
        books: [],
        offset: 0,
        perPage: 5,
        currentPage: 0
      }
  }

  componentDidMount(){}

  handleSearch = async (query) => {
    try {
      //const response = await fetch(`${this.api}?q=${this.state.query}`)
      //const books = await response.json();
      const books = this.testResponse;
      this.setState({books: books})
    } catch (error){
      console.error('Error querying api', error);
    }
  }
  
  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handlePageClick = (data) => {
    const { selected } = data;
    const offset = selected * this.state.perPage;

    this.setState({currentPage: selected, offset});
  }

  listResults(books){
    const { currentPage, perPage } = this.state;
    const offset = currentPage * perPage;

    return (
      <div className="books">
        {books.slice(offset, offset + perPage).map((book, index) => (
          <div key={index}>
            <h3>{book}</h3>
          </div>
        ))}
      </div>
    );
  }

  render(){
    const {books, query} = this.state;

    return (
    <div className="App search">
      <h1>Open Library Book Search</h1>
      <input type="text" value={query} onChange={this.handleInputChange} placeholder='Search...' className="search-bar"></input>
      <button className="search-button" onClick={this.handleSearch}>Search</button>
      {books && this.listResults(books)} 
      {books.length > 0 && (
        <ReactPaginate 
          previousLabel={"< Previous"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(books.length / this.state.perPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </div>
    );
  }
}

export default App;