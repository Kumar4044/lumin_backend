
const express = require("express");
const zod = require("zod");
const { User} = require("../db/mongoose");
const jwt = require("jsonwebtoken");
const { JWT_Secret } = require("./config");


const router = express.Router();

router.use(express.json());

const SignupSchema = zod.object({
    UserName: zod.string().email(),
    Name: zod.string(),
    Password: zod.string(),
})

const SigninSchema = zod.object({
    UserName: zod.string().email(),
    Password: zod.string(),
})

router.post('/signup', async (req, res)=>{
    const body = req.body;
    // input validation
    const {success} = SignupSchema.safeParse(body);
    if(!success){
        return res.json({
            message:"incorrect formate",
        })
    }
    else{
        try{
            const userfind = await User.findOne({
                UserName: body.UserName
            })
            if(userfind){
                res.json({
                    message:`user allready exist with id ${userfind._id} `,
                })
            }
            else{
                const dbUser = await User.create({
                    UserName: body.UserName,
                    Name: body.Name,
                    Password: body.Password,
                    Cart:[]  //for cart (drone id);
                })
                const token = jwt.sign({
                    UserId: dbUser._id
                }, JWT_Secret)

                //initialization Cart
                // const UserId = dbUser._id;
                // await Cart.create({
                //     UserId,
                // })

                res.json({
                    message:"user created successfully",
                    token: "Bearer "+token,
                    UserName: dbUser.Name
                })
            }
        }
        catch(e){
            res.status(403).json({message:"wrong input"});
        }
    }
})

router.post('/signin', async (req, res)=>{
    const body = req.body;
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    const {success} = SigninSchema.safeParse(body);
    if(!success){
        res.json({
            response: "incorrect input"
        })
    }
    else{
        try{
            const userfind = await User.findOne({UserName:UserName});
            if((userfind) && (UserName == userfind.UserName) && (Password == userfind.Password)){
                const token = jwt.sign({
                    UserId: userfind._id,
                }, JWT_Secret)
                res.json({
                    response: "user login successfully",
                    token: "Bearer "+token,
                    UserName: userfind.Name
                })
            }
            else{
                res.json({
                    response: "wrong email or Password"
                })
            }
            
        }
    catch(e){
        res.status(500).json({
            response: "internal server down"
        })
    }
    }
})


module.exports = router;