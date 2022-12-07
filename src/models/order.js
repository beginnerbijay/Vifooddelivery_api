const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    orderitems:[],
    shippingAddress:{type:Object},
    totalPrice:{type:Number,required:true},
    isWay:{type:Boolean,default:false},
    isDelivered:{type:Boolean,default:false},
    time:{type:Date,default:Date.now()}
})

const Order = mongoose.model("order",orderSchema)
module.exports = Order;