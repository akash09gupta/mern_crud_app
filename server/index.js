const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/User');
const app = express();
require('dotenv').config();


const mongo_url = process.env.MONGO_CONN || "mongodb://localhost:27017/crud";
const port = process.env.PORT || 5000;
//enables cors for communicating with frontend request that is comming from different origin
app.use(cors({origin:'http://localhost:5173'})); 
//this is used for making data available for req.body
app.use(express.json());

mongoose.connect(mongo_url)
.then(()=>console.log('mongodb is connected'))
.catch((err)=>console.log(err));

app.get('/', async (req, res)=>{
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

app.post('/createUser', async (req, res)=>{
    try {
        const {name, email, age} = req.body;
        const createdUser = await UserModel.create({
            name,
            email,
            age
        });
        console.log(createdUser);
        res.status(201).json(createdUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

app.get('/getusers/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const users = await UserModel.findById({_id:id});
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

app.put('/updateUser/:id', async (req, res)=>{
    const { name, email, age } = req.body;
    const id = req.params.id;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate({_id: id}, {
            name,
            email,
            age
        },
    {new: true});
    res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

app.delete('/delete/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        const deletedUser = await UserModel.findByIdAndDelete({_id:id});
        res.status(200).json(deletedUser);
    }
    catch(err) {
        res.status(500).json(err);
    }
})

app.listen(port, ()=>console.log("Server running on port: ",port));