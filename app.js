import express from "express";
import bodyParser from "body-parser";       
import dotenv from 'dotenv'
import router from './Routes/auth.js'
import path from 'path';

dotenv.config({path:'./config.env'});

const port = process.env.PORT || 5000 ;
const app= express()
app.use(router);

if(process.env.NODE_ENV === "production"){
    __dirname=path.resolve();
    app.use(express.static(path.join(__dirname,"/client/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(port,()=>{
    console.log(`Server Started Succesfully on port number ${port}`);
})  