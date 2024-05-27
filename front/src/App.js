import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import UpdateMoadl from './components/updatePopup.js';
import DeleteMoadl from './components/deletePopup.js';
import AddMoadl from './components/addPopup.js';
import Book from './components/Book.js';

function App() {

  const [modalAddActive, setModalAddActive] = useState(false);
  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  const [modalUpdateActive, setModalUpdateActive] = useState(false);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [books]);

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">Library</h1>
      </header>
      <section className="main">
         <div className="control_panel container">
            <ul className="control_panel_list">
               <li className="c_p_list_item" id="open_add_modal" onClick={() => setModalAddActive(true)}>
                  <p className="button">Добавить</p>
               </li>
               <li className="c_p_list_item"  id="open_update_modal" onClick={() => setModalUpdateActive(true)}>
                  <p className="button">Обновить</p>
               </li>
               <li className="c_p_list_item" id="open_delete_modal" onClick={() => setModalDeleteActive(true)}>
                  <p className="button">Удалить</p>
               </li>

            </ul>
         </div>

         <div className="content__section container">
            <div className="content_header">
               <h2>Books</h2>
            </div>

            <ul className="book_list">

            {books.map(book => (
              <Book
                key={book.id}
                id={book.id}
                title={book.book_name}
                author={book.book_author}
                year={book.book_year}
              />
            ))}

            </ul>
         </div>
      </section>


      <AddMoadl active={modalAddActive} setActive={setModalAddActive} />
      <UpdateMoadl active={modalUpdateActive} setActive={setModalUpdateActive} />
      <DeleteMoadl active={modalDeleteActive} setActive={setModalDeleteActive} />

    </div>
  );
}

export default App;
