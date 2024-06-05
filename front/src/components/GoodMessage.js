import React from 'react';

function GoodMessage({ active, setActive }) {
    return (
       <div className='message good_message' id='good_mes'>
            <h4 className='message_title'>Успешно выполнено!</h4>
            <p className='message_button'>Ok</p>
       </div>
    );
 }
 
 export default GoodMessage;