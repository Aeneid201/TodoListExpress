const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req, res) => {
        try{
            const todoItems = await Todo.find()
            const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('todos.ejs', {todos: todoItems, itemsLeft: itemsLeft})
            console.log(todoItems);
        }catch(err) {
            console.error(err)
        } 
        
    },

    createTodo: async (req, res) => {
        try{
            await Todo.create({task: req.body.task, completed: false})
            console.log('Todo created!')
            res.redirect('/todos')
        }catch(err) {
            console.error(err)
        } 
    },

    deleteTodo: async (req, res) => {
        try{
            await Todo.findOneAndDelete({_id: req.body.todoId})
            console.log('Todo deleted!')
            res.redirect('/todos')
        }catch(err) {
            console.error(err)
        } 
    },

    markComplete: async (req, res) => {
        try{
            await Todo.findOneAndUpdate({_id: req.body.todoId}, {completed: true})
            console.log('Marked complete')
            res.json('Marked complete')
        }catch(err) {
            console.error(err)
        } 
    },

    markIncomplete: async (req, res) => {
        try{
            await Todo.findOneAndUpdate({_id: req.body.todoId}, {completed: false})
            console.log('Marked incomplete')
            res.json('Marked incomplete')
        }catch(err) {
            console.error(err)
        } 
    }
}