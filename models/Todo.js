const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  })
  
module.exports = mongoose.model('todos', TodoSchema)