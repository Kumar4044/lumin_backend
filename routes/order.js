const express=require("express")
const router=express.Router()
router.use(express.json());
const { authMiddleware } = require("../middleware");
const {Order,User}=require("../db/mongoose")
router.post("/addorder",authMiddleware,async(req,res)=>{
    try{
        const UserId=req.userId
        console.log(UserId)
        const product=req.body.product
        const {address,phoneNo,pincode,OrderId,referenceNo}=req.body
        const data=await User.findOne({_id:UserId})
        console.log(data)
        const arr=[...product]
        console.log(arr)
        const order=new Order({address,phoneNo,pincode,product,Name:data.Name,userId:UserId,OrderId,referenceNo})
        const neworder=await order.save()
        res.json({
            msg:"Order Placed",
            data:neworder,
            success:true
        })
    }catch(e){
        res.json({
            msg:"somethin went wrong while placing order",
            e,
            success:false
        })
    }
})

router.get("/getorder",authMiddleware,async(req,res)=>{
    try{
        const UserId=req.userId
        const data=await Order.find({userId:UserId})
        console.log(data)
        if(data.length===0){
            return res.json({
                data:[],
                success:true
            })
        }
        return res.json({
            data:data,
            success:true
        })
    }catch(e){
        res.json({
            msg:"somethin went wrong while geting order",
            e,
            success:false
        })
    }
})

router.put("/updatestatus/:id",authMiddleware,async(req,res)=>{
    try{
        const {id}=req.params
        const {msg}=req.body
        const data=await Order.findByIdAndUpdate({_id:id},{status:msg},{new:true})
        console.log(data)
        const dataa=await Order.find({})
        let arr=dataa.map((item)=>{
            if(item._id===data._id){
                return data
            }else{
                return item
            }
        })

        res.json({
            arr,
            success:true
        })
    }catch(e){
        res.json({
            msg:"something went wrong while updating",
            e,
            success:false
        })
    }
})


module.exports=router