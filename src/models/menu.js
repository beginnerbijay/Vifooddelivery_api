const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
    id:{type:String,required:true},
    itemId:{type:String,required:true},
    imgSrc:{type:String,required:true},
    name:{type:String,required:true},
    ratings:{type:Number,required:true},
    price:{type:Number,required:true}
})

const Menu = mongoose.model("menu",menuSchema)
module.exports = Menu