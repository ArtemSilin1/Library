

function Book({ id, title, author, year }) {
   return (
      <li className="book_item">
         <p className="book_id">id: {id}</p>
         <h4 className="book_name">{title}</h4>
         <p className="book_author">{author}</p>
         <p className="book_year">{year}</p>
      </li>
   );
}

export default Book;