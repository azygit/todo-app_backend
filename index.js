const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const { UserModel , TodoModel} = require("./db"); //importing
const { auth, JWT_SECRET } = require("./auth");

mongoose.connect("")

const app = express();
app.use(express.json()); // u need this while parsing the body



app.post('/signup', async function(req,res){

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    //we add await here bcoz if the user adds non unique email while signup , it will crash , and we dont want
        // user to get res.json meaage if it crashes
        // it can also display our json message even if the connect request is not complete 

    await UserModel.create({ 
        email : email,
        password : password,
        name : name

    })

    res.json({
        message : "You are singedup!"
    })

})

app.post('/signin', async function(req,res){

    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ // returns a promise
        email : email,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET);

        res.json({
            token: token
        })  
    }
    else{
        res.status(403).json({
            message: "Incorrect credentials!"
        })
    }

    
    
})

app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get('/todos',auth,async function(req,res){

    const userId = req.uderId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    }) 
})


app.listen(3000);