const express = require('express'); 
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');

const app = express();   //Initialize express app

app.use(express.json()); // makes sure all the post endpoints will work correctly if json body is passed.

//create todo
app.post('/todo', async (req, res)=>{
    const createPayload = req.body; 
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload){
        res.status(411).json({
            msg: "You sent wrong inputs"
        })
        return;
    }
    //put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description, 
        completed: false
    })

    res.json({
        msg: "Todo Created!"
    })
}); 

//read todo
app.get('/todos', async (req,res)=>{
    const todos = await todo.find({});
    res.json({todos}); 
}); 

//mark as complete
app.put('/completed', async(req, res)=>{
    const updatePayload = req.body; 
    const parsedPayload = updateTodo.safeParse(updatePayload); 
    if(!parsedPayload){
        res.status(411).json({
            msg: "You sent wrong inputs"
        })
        return;
    }
    //enter in mongodb
    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    });

    res.json({
        msg: "Completed the todo"
    });
}); 




