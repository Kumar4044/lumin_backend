
const jwt = require("jsonwebtoken");

const { JWT_Secret } = require("./routes/config");


const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.split(" ")[0]== 'Bearer'){
        res.json({
            response: "authentication failed",
        });
    }
    else{
        const token = authHeader.split(" ")[1];
        try{
            const decoded = jwt.verify(token, JWT_Secret);
            if(decoded.UserId){
                req.userId = decoded.UserId;
                next();
            }
            else{
                res.json({
                    response: "token invalid",
                })
            }
        }
        catch(e){
            return res.status(403).json({message:"not allow"})
        }
    }
}

module.exports = {authMiddleware};