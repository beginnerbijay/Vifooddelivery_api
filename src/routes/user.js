const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')

router.post("/registration",async(req,res)=>{
    try{
        const user = new User(req.body)
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password,salt)
        user.token = jwt.sign({_id:user._id},process.env.PRIVATE_KEY) 
        const userdata = await user.save();
        if(userdata){
            res.send(userdata)
        }else{
            res.send("registration fail at back")
        }
    }catch(e){
        console.log(e)
    }
})

router.post("/login",async(req,res)=>{
    try{
        const {username,password} = req.body
        const user = await User.findOne({username})
        if(user){
            const valid = await bcrypt.compare(password,user.password)
            if(valid){
            user.token = jwt.sign({_id:user._id},process.env.PRIVATE_KEY)
            res.send(user)
            }
            else{
                res.send("password did not match")
            }
        }else{
            res.send("")
        }
    }catch(e){
        console.log(e)
    }
})

module.exports = router