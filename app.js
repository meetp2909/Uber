const express = require("express");
const app = express();
var cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./db/db')
const userRoutes = require('./Routes/user.route')
const dotenv = require('dotenv');
dotenv.config();

db();

app.use(cors()); 
app.use(cookieParser())

app.get('/',(req,res) =>{
    res.send("Hello World");
})

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use('/user', userRoutes);

module.exports = app;