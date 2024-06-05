import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import UpdateMoadl from './components/updatePopup.js';
import AddMoadl from './components/addPopup.js';
import Book from './components/Book.js';
import Add from './images/add.svg';
import Search from './images/search.svg';

function App() {

  const [modalAddActive, setModalAddActive] = useState(false);
  const [modalUpdateActive, setModalUpdateActive] = useState(false);

  const [books, setBooks] = useState([]);

  const [getId, setGetId] = useState(null);

  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');


   const searchOpen = () => {
      setSearchActive(!searchActive);
   };

  

  useEffect(() => {
    axios.get('http://localhost:8081/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [books]);
  
  const handleSearch = (event) => {
     setSearchValue(event.target.value);
   };
   
   const filteredBooks = searchValue.length > 0 ? books.filter(book => book.book_name.toLowerCase().includes(searchValue.toLowerCase())) : books;
 

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">Library</h1>
      </header>

      <section className="content__section container">
         <div className="content_header">
            <img className='add_button' alt='add' src={Add} onClick={setModalAddActive} />
            <h2>Books</h2>
            <div>
              <img className='search_button' alt='add' src={Search} onClick={searchOpen} />
              <input
                 type="text"
                 className='h_search_input'
                 name="title"
                 value={searchValue}
                 onChange={handleSearch}
                 placeholder='Поиск..'
              />
            </div>
         </div>
         <ul className="book_list">

         {filteredBooks.map(book => (
           <Book
              key={book.id}
              id={book.id}
              title={book.book_name}
              author={book.book_author}
              year={book.book_year}
              update={() => {
                setGetId(book.id);
                setModalUpdateActive(true);
              }}
            />
         ))}

         </ul>
      </section>

      <AddMoadl active={modalAddActive} setActive={setModalAddActive} />
      <UpdateMoadl active={modalUpdateActive} setActive={setModalUpdateActive} newId={getId} />

    </div>
  );
}

export default App;
