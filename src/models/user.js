const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    contact:{type:Number,required:true},
    password:{type:String,required:true},
    token:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
})

const User = mongoose.model("user",userSchema)
module.exports = User;