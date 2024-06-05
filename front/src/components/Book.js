import React, { useState } from "react";
import axios from 'axios';
import Trash from '../images/trash.svg';
import Edit from '../images/edit.svg';

function Book({ id, title, author, year, update, newIdd }) {

  const [selected, setSelected] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/deletePopup', { id: id })
       .then(res => {
          console.log(res.data);
       })
       .catch(err => {
          console.error(err);
       });
  }

  const handleSelect = () => {
    setSelected(!selected);
  };

  const handleUpdate = () => {
    update(newIdd);
  };

  return (
    <li className='book_item' onClick={handleSelect}>
      <div className={selected ? "delete_box opened_d_box" : 'delete_box'}>
        <div className="delete_box_container">
          <img src={Edit} className="update_book_button" alt="delete" onClick={handleUpdate} />
          <img src={Trash} className="delte_book_button" alt="delete" onClick={handleSubmit} />
        </div>
      </div>
      <div className="book_content">
        <p className="book_id">id: {id}</p>
        <h4 className="book_name">{title}</h4>
        <p className="book_author">{author}</p>
        <p className="book_year">{year}</p>
      </div>
    </li>
  );
}

export default Book;
