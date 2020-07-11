const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const Router = express.Router()
const PORT = 4000

let Todo = require('./model')

app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/", { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("Mongodb database connected successfully.")
    }
})

app.get('/', (req, res) => {
    res.send("Hello there :)")
})


Router.route('/').get((req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err)
        } else {
            res.json(todos)
        }
    })
})

Router.route('/:id').get((req, res) => {
    let id = req.params.id
    Todo.findById(id, (err, todo) => {
        if (err) {
            console.log(err)
        } else {
            res.json(todo)
        }
    })
})

Router.route('/add').post((req, res) => {
    let todo = new Todo(req.body)
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'})
        })
        .catch(err => {
            res.status(400).send('adding new todo failed')
        })
})

Router.route('/update/:id').post((req, res) => {
    let newTodo = new Todo(req.body)
    Todo.findById(req.params.id, (err, todo) => {
        if (err) {
            res.status(400).send('data is not found')
        } else {
            todo.todo_description = newTodo.todo_description
            todo.todo_responsible = newTodo.todo_responsible
            todo.todo_priority = newTodo.todo_priority
            todo.todo_completed = newTodo.todo_completed

            todo.save().then(todo => {
                console.log(todo)
                res.json('Todo updated')
            })
            .catch(err => {
                res.status(400).send('update not possible')
            })
        }
    })
})

app.use('/todos', Router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
})