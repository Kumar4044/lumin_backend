const express = require("express");
const { Drone } = require("../db/mongoose");
const { authMiddleware } = require("../middleware");
const router = express.Router();

router.use(express.json());
router.get("/item/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const itemfind = await Drone.find({_id:id});
        res.status(200).json({
            Drone: itemfind,
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message: "internal server down"
        })
    }
})
router.get("/",async(req,res)=>{
    try{
        const itemfind = await Drone.find({});
        res.status(200).json({
            Drone: itemfind,
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message: "internal server down"
        })
    }
})
router.post("/add",authMiddleware ,async (req , res)=>{
    const Title = req.body.Title;
    const Description = req.body.Description;
    const Image = req.body.Image;
    const Price = req.body.Price;
    const Video = req.body.Video;
    try{
        await Drone.create({
            Title,
            Description,
            Price,
            Image,
            Video
        })
        res.status(200).json({
            response : "drone added"
        })
    }
    catch(e){
        res.status(500).json({
            response: "drone added failed"
        })
    }
})

module.exports = router;