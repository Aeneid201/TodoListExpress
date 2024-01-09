const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
const PORT = 8000
require('dotenv').config()

let db, dbConnectionStr = process.env.DB_STRING, dbName = 'todolist'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection('todos').find().toArray()
    .then(data => {
        response.render('index.ejs', {todos : data})
    })
    .catch(err => console.error(err))
})

app.post('/addTodo', (request, response)=> {
    db.collection('todos').insertOne({task: request.body.task})
    .then(result => {
        console.log('Task added')
        response.redirect('/')
    })
    .catch(err => console.error(err))
})

app.delete('/deleteTodo', (request, response) => {
    db.collection('todos').deleteOne({task: request.body.task})
    .then(result => {
        console.log(result);
        console.log('Task deleted')
        response.json('Task deleted')
    })
    .catch(err => console.error(err))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})