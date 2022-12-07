const express = require('express')
const router = express.Router()
const Menu = require('../models/menu')
const auth = require('../middlewares/auth')

router.get("/", auth,async(req,res)=>{
    try{
        const Items = await Menu.find()
        if(Items){
            res.send(Items)
        }
    }catch(e){
        console.log(e)
    }
})

router.post("/addmenu", auth,async(req,res)=>{
    try{
        const {small_id,itemId,imgSrc,name,ratings,price} = req.body
        const newmenu = new Menu({
            id:small_id,
            itemId,
            imgSrc,
            name,
            ratings,
            price
        })
        const Items = await newmenu.save()
        if(Items){
            res.send(Items)
        }
    }catch(e){
        console.log(e)
    }
})

router.get("/singlemenu/:id", auth,async(req,res)=>{
    try{
        const Items = await Menu.findOne({_id:req.params.id})
        if(Items){
            res.send(Items)
        }else{
            console.log("no menu")
        }
    }catch(e){
        console.log(e)
    }
})

router.patch("/editmenu/:id", auth,async(req,res)=>{
    try{
        const {itemId,imgSrc,name,ratings,price} = req.body
        const Items = await Menu.findByIdAndUpdate({_id:req.params.id},{itemId,imgSrc,name,ratings,price},{
            new:true
        })
        if(Items){
            res.send(Items)
        }
    }catch(e){
        console.log(e)
    }
})

router.delete("/deletemenu/:id", auth,async(req,res)=>{
    try{
        const Items = await Menu.findByIdAndDelete({_id:req.params.id})
        if(Items){
            res.send(Items)
        }
    }catch(e){
        console.log(e)
    }
})
module.exports = router