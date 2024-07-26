
const express = require("express");
const { authMiddleware } = require("../middleware");
const { User, Drone ,Cart} = require("../db/mongoose");
const router = express.Router();


router.post("/addtocart",authMiddleware,async(req,res)=>{
    const UserId = req.userId;
    const {DroneId}=req.body
    if(!UserId){
        return res.status(400).json({
            msg:"please login to add to cart"
        })
    }
    const data=await Cart.findOne({UserId:UserId,DroneId:DroneId})
    const drone=await Drone.findOne({_id:DroneId})
    console.log(data)
    if(data){
        const newdata=await Cart.findByIdAndUpdate({_id:data._id},{Count:data.Count+1,Price:(data.Price+drone.Price)},{new:true})
        console.log(newdata)
        return res.status(200).json({
            msg:"drone added successfully",
            data:newdata,
            success:true
        })
    }else{
        const drone=await Drone.findOne({_id:DroneId})
        const add=new Cart({UserId,DroneId,Title:drone.Title,Count:1,Price:drone.Price})
        const addeddata=await add.save()
        console.log(addeddata)
        return res.status(200).json({
            msg:"added to cart sucessfully",
            success:true,
            data:addeddata
        })
    }
})
router.post("/removefromcart",authMiddleware,async(req,res)=>{
    const UserId = req.userId;
    const {DroneId}=req.body;
    const drone=await Drone.findOne({_id:DroneId})
    const data=await Cart.findOne({UserId:UserId,DroneId:DroneId})
    console.log(data)
    
    if(data.Count===1){
        const dataa=await Cart.deleteOne({_id:data._id})
        const dataaa=await Cart.find({UserId})
        console.log(dataaa)
        return res.json({
            msg:"product removed from cart successfully",
            dataa:dataa,
            success:true,
            data:dataaa
        })
    }
    else{
        const newdata=await Cart.findByIdAndUpdate({_id:data._id},{Count:data.Count-1,Price:data.Price-drone.Price},{new:true})
        return res.status(200).json({
            msg:"one item removed successfully",
            data:newdata,
            // success:true
        })
    }
    
})
router.get("/getcart",authMiddleware,async(req,res)=>{
    const UserId = req.userId;
    if(!UserId){
        return res.json({
            msg:"please message"
        })
    }
    const data=await Cart.find({UserId})
    if(data.length===0){
        return res.json({
            msg:"nothing present in cart",
            data:data
        })
    }else{
        return res.json({
            data:data,
            success:true
        })
    }
})
router.get("/countofcart",authMiddleware,async(req,res)=>{
    const UserId = req.userId;
    if(!UserId){
        return res.status(200).json({
            count:0,
        })
    }else{
        let count=0;
        let amount=0;
        const data=await Cart.find({UserId})
        data.map((item)=>{
            count+=item.Count
            amount+=item.Price
        })
        return res.status(200).json({
            count:count,
            amount:amount,
            success:true
        })
    }
})
module.exports = router