const dotenv=require("dotenv")
dotenv.config()
const mongoose = require("mongoose");
const data=async ()=>{
    try{
       await  mongoose.connect(process.env.URI);
        console.log("database connected")
    }catch(e){
        console.log(e)
    }
}



const UserSchema = mongoose.Schema({
    UserName:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Cart : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drone"
        }
    ]
})

const DroneSchema = mongoose.Schema({
    Title:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    },
    Image:{
        type: String,
    },
    Video:{
        type: String,
    }
})

const CartSchema = mongoose.Schema({
    UserId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    DroneId:{
        type:mongoose.Schema.ObjectId,
        ref:"Drones",
        required:true
    },
    Title:{
        type:String,
        ref:"Drones",
        required:true
    },
    Count:{
        type: Number,
        default:0
    },
    Price:{
        type:Number,
        ref:"Drones",
    }
})
const OrderSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    OrderId:{
        type:String
    },
    product:{
        type:Array,
        default:true
    },
    address:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    referenceNo:{
        type:String
    },
    phoneNo:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    pincode:{
        type:Number,
        minLength:6
    }
})
const User = mongoose.model("User", UserSchema);
const Drone = mongoose.model("Drone", DroneSchema);
const Cart = mongoose.model("Cart", CartSchema);
const Order =mongoose.model("Order",OrderSchema)

module.exports = {
    User,
    Drone,
    Cart,
    Order,
    data
}