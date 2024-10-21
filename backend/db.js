const mongoose = require("mongoose"); 

mongoose.connect ("mongodb+srv://bhanu:bhanu1999@bhanu.aeupceu.mongodb.net/")

const todoSchema = mongoose.Schema({
    title: String, 
    description: String, 
    completed: Boolean
})

const todo = mongoose.model('todo', todoSchema); 

module.exports = {todo}; 
