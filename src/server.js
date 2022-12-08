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
const corsOptions = {
    origin: 'https://vifood-delivery-app.onrender.com',
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL,
    { 
        useNewUrlParser: true,
         useUnifiedTopology: true
    }).then(()=>console.log("db connected")).catch(e=>console.log("db disconnected"))
app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "https://vifood-delivery-app.onrender.com");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        next();
      });
app.use("/user",user)
app.use("/menu",menu)
app.use("",order)
app.listen(port,()=>console.log('listenning at the port '+ port))