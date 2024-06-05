const express = require('express')
const { Client } = require('pg')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json());

const db = new Client({
   host: '92.118.170.201',
   user: 'username8',
   password: 'Ep6KLJ8W',
   database: 'username8_db'
})

db.connect()
   .then(() => console.log('Connected to PostgreSQL database'))
   .catch(err => console.error('Error connecting to PostgreSQL database', err));

app.post('/addPopup', (req, res) => {
   const pgsql = "INSERT INTO webbooks(book_name, book_author, book_year) VALUES($1, $2, $3)"
   const values = [
      req.body.title,
      req.body.author,
      req.body.year,
   ]
   db.query(pgsql, values, (err, data) => {
      if(err) {
         return res.json(err);
      } else {
         return res.json(data);
      }
   })
})

app.post('/updatePopup', (req, res) => {
   const pgsql = "UPDATE webbooks SET book_name = $2, book_author = $3, book_year = $4 WHERE id = $1"
   const values = [
      req.body.id,
      req.body.title,
      req.body.author,
      req.body.year
    ]
    
   db.query(pgsql, values, (err, data) => {
      if(err) {
         return res.json(err);
      } else {
         return res.json(data);
      }
   })
})

app.post('/deletePopup', (req, res) => {
   const pgsql = "DELETE FROM webbooks WHERE id = $1"
   const values = [
      req.body.id
   ]
   db.query(pgsql, values, (err, data) => {
      if(err) {
         return res.json(err);
      } else {
         return res.json(data);
      }
   })
})

app.get('/books', (req, res) => {
   db.query('SELECT * FROM webbooks ORDER BY id', (err, data) => {
      if(err) {
         return res.status(500).send(err);
      }
      res.send(data.rows);
   });
});



app.listen(8081, () => {
   console.log("Listening..")
})
