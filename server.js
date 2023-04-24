const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Task = require('./models/task.js')
const bodyParser = require("body-parser");
const taskRoute = require("./routes/tasks.js")



app.use(express.urlencoded({extended:true}));

app.use(express.json());
const url = "mongodb+srv://1thejusjoshi:taskapi@cluster0.vrrpbft.mongodb.net/?retryWrites=true&w=majority"

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


app.use("/v1/tasks", taskRoute);


mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Connected to database"))

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})