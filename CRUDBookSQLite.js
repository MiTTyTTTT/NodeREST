const express = require('express')
const sqlite3 = require('sqlite3')
const app = express()

const db = new sqlite3.Database('./Database/Book.sqlite')

app.use(express.jason())

db.run(`CREATE TABLE IF NOT EXITSTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
)`)

app.get('/books',(req,res)=>{
    db.all('SELECT * FROM books',(err,rows)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.json(rows)
        }
    })
})

app.get('/books/:id',(req,res) => {
    db.get('SELECT * FROM books WHERE id = ?' , req.params.id (err,row) =>{
        if(err){
            res.status(500).send(err)
        }else{
            if(!row){
                res.status(404).send('Book not found')
            }else{
                res.json(row)
            }
        }
    })
})



