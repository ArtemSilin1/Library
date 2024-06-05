import React, { useState } from 'react';
import axios from 'axios';

function UpdateModal({ active, setActive, newId }) {

   const [values, setValues] = useState({
      title: '',
      author: '',
      year: ''
   });

   const handleChange = (event) => {
      setValues({...values, [event.target.name]: event.target.value})
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      const updatedData = {
        id: newId,
        title: values.title,
        author: values.author,
        year: values.year
      };
      axios.post('http://localhost:8081/updatePopup', updatedData)
        .then(res => {
          console.log(res.data);
          setValues({
            title: '',
            author: '',
            year: ''
          });
          setActive(false);
        })
        .catch(err => {
          console.error(err);
        });
   }

   return (
      <div className={active ? "modal open" : "modal"} id="update_modal" onClick={() => setActive(false)}>
         <div className="modal_container modal_update_container" onClick={e => e.stopPropagation()}>
            <div className="modal_header">
               <h2 className="modal_title">Обновление книги</h2>
            </div>
            <form onSubmit={handleSubmit}>
               <div className="inputs__contaienr">
                  <input
                     type="text"
                     className="modal_input"
                     placeholder="Введите новое название"
                     onChange={handleChange}
                     name="title"
                     required
                  />
                  <input
                     type="text"
                     className="modal_input"
                     placeholder="Введите новое имя автора"
                     onChange={handleChange}
                     name="author"
                     required
                  />
                  <input
                     type="number"
                     className="modal_input"
                     placeholder="Введите новый год издания"
                     onChange={handleChange}
                     name="year"
                     required
                  />
               </div>
               <div className="buttons__container">
                  <button className="button modal_button" type="submit">Обновить</button>
                  <button className="button modal_button" onClick={() => setActive(false)}>Вернуться</button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default UpdateModal;
