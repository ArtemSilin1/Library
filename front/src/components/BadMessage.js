import React from 'react';

function BadMessage({ active, setActive }) {
    return (
       <div className={active ? "message bad_message open" : "message bad_message"} id='bad_message' onClick={() => setActive(false)}>
            <h4 className='message_title'>Ошибка выполненения!</h4>
       </div>
    );
 }
 
 export default BadMessage;