const express = require("express");
const cors = require("cors")
const mainRouter = require("./routes/index");
const {data}=require("./db/mongoose")
const app = express();

app.use("/api/v1",mainRouter)
app.use(express.json())
app.use(cors());

app.use(express.json());
data().then(
    app.listen(3000,()=>{
        console.log("online");
    })
).catch((e)=>{
    console.log(e)
})
