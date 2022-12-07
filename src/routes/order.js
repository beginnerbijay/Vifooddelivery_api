const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const stripe = require("stripe")("sk_test_51M91SzSFSN1DmySqstmuW4Q9LZlwzeVLYt4HKH1owFHJFm41G0A1Pv18qS3jjbGCNBCtQXAU0DksR8m5mTdbjiM400BIL3swgt");
const auth = require('../middlewares/auth') 

router.post("/create-checkout-session",async(req,res)=>{
  const YOUR_DOMAIN = 'http://127.0.0.1:5173';
  const {cart,user} = req.body
  const userid = JSON.parse(user)._id
  console.log(userid)
    try{
      const session = await stripe.checkout.sessions.create({
        line_items:cart?.map(item=>{
          return {
            price_data:{
              currency:"inr",
              product_data:{
                name:item.name,
              },
              unit_amount:Number(item.price*100),
            },
            quantity:item.quantity,
          }}),
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/myorder/${userid}?true`,
        cancel_url: `${YOUR_DOMAIN}/checkout`,
      });
        res.send(session.url)
    }catch(e){
        console.log(e)
    }
})

router.post("/neworder", auth,async(req,res)=>{
  try{
  const {user,cart,totalPrice,address} = req.body
  const userdata = JSON.parse(user)
  const addressdata = JSON.parse(address)
  const cartdata = JSON.parse(cart)
      const orderdata = new Order({
        name:userdata.username,
        email:userdata.email,
        userid:userdata._id,
        orderitems:cartdata,
        shippingAddress:addressdata,
        totalPrice:totalPrice,
      })
      const success = await orderdata.save()
      if(success){
        res.send(success)
      }else{
        res.send("order create fail")
      }
    }catch(e){
        console.log(e)
    }
})

router.get("/myorders/:id", auth,async(req,res)=>{
  try{
    const orders = await Order.find({userid:req.params.id}).sort({ time: -1 })
    if(orders){
      res.send(orders)
    }else{
      res.send("There is no order history")
    }
    }catch(e){
        console.log(e)
    }
})

router.get("/allorders", auth,async(req,res)=>{
  try{
    const orders = await Order.find()
    if(orders){
      res.send(orders)
    }else{
      res.send("There is no order history")
    }
    }catch(e){
        console.log(e)
    }
})

router.post("/deliver/:id", auth,async(req,res)=>{
  try{
    const orders = await Order.findOne({_id:req.params.id})
    if(!orders.isWay){
      orders.isWay = true
    }else{
      orders.isDelivered = true
    }
    const updateOrders = await orders.save()
    if(updateOrders){
      res.send(updateOrders)
    }else{
      res.send("There is no order history")
    }
    }catch(e){
        console.log(e)
    }
})



module.exports = router