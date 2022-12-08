const express = require('express')
const cors = require('cors')
const app = express()
const user  = require('./routes/user')
const order  = require('./routes/order')
const menu  = require('./routes/menu')
require('dotenv').config()
const { default: mongoose } = require('mongoose')
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());

mongoose.connect(process.env.MONGO_URL,
    { 
        useNewUrlParser: true,
         useUnifiedTopology: true
    }).then(()=>console.log("db connected")).catch(e=>console.log("db disconnected"))
app.use("/user",user)
app.use("/menu",menu)
app.use("",order)
app.listen(port,()=>console.log('listenning at the port '+ port))