import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AddMoadl({ active, setActive }) {

  const [isMouseDown, setIsMouseDown] = useState(false);

   const [values, setValues] = useState({
      title: '',
      author: '',
      year: ''
   })

   const handleChange = (event) => {
      setValues({...values, [event.target.name]: event.target.value})
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8081/addPopup', values)
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
   
    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = (event) => {
      setIsMouseDown(false);
      if (event.target.closest('.modal_container')) {
        event.stopPropagation();
      }
    };

    const handleCloseModal = () => {
      if (!isMouseDown) {
        setActive(false);
      }
    };
   
// ----------------------

    const handleKeyEsc = (event) => {
      if (event.key === 'Escape') {
         setActive(false);
      }
    };

    useEffect(() => {
      document.addEventListener('keydown', handleKeyEsc);
      return () => {
         document.removeEventListener('keydown', handleKeyEsc);
      };
    }, []);

    const handleKeyEnter = (event) => {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    };

    useEffect(() => {
      document.addEventListener('keyup', handleKeyEnter);
      return () => {
        document.removeEventListener('keyup', handleKeyEnter);
      };
    }, []);

   return (
      <div className={active ? "modal open" : "modal"} id="add_modal" onClick={handleCloseModal}>
        <div className="modal_container modal_add_container"  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onClick={e => e.stopPropagation()}>
          <div className="modal_header">
            <h2 className="modal_title">Добавление книги</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs__contaienr">
              <input
                type="text"
                className="modal_input"
                placeholder="Введите название"
                onChange={handleChange}
                name="title"
              />
              <input
                type="text"
                className="modal_input"
                placeholder="Введите имя автора"
                onChange={handleChange}
                name="author"
              />
              <input type="number"
                className="modal_input"
                placeholder="Введите год издания"
                onChange={handleChange}
                name="year"
              />
            </div>
            <div className="buttons__container">
              <button className="button modal_button" type="submit">Добавить</button>
              <button className="button modal_button" onClick={() => setActive(false)}>Вернуться</button>
            </div>
          </form>
        </div>
      </div>
   );
}

export default AddMoadl;