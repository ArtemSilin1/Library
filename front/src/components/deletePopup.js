import React, { useState } from 'react';
import axios from 'axios';

function DeleteModal({ active, setActive }) {
   const [id, setId] = useState('');

   const handleChange = (event) => {
      setId(event.target.value);
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8081/deletePopup', { id: id })
         .then(res => {
            console.log(res.data);
            setActive(false);
            alert('Успешно удалено');
         })
         .catch(err => {
            console.error(err);
            alert('Ошибка удаления');
         });
   }
   
   return (
      <div className={active ? "modal open" : "modal"} id="delete_modal" onClick={() => setActive(false)}>
         <div className="modal_container modal_delete_container" onClick={e => e.stopPropagation()}>
            <div className="modal_header">
               <h2 className="modal_title">Удаление книги</h2>
            </div>
            <form onSubmit={handleSubmit}>
               <div className="inputs__contaienr">
                  <input type="number" className="modal_input" placeholder="Введите id книги" onChange={handleChange} />
               </div>
               <div className="buttons__container buttons__container_delete">
                  <button className="button modal_button" type="submit">Удалить</button>
                  <button className="button modal_button" onClick={() => setActive(false)}>Вернуться</button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default DeleteModal;
