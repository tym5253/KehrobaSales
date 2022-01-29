import express from "express";
import bodyParser from "body-parser";       
import dotenv from 'dotenv'
import router from './Routes/auth.js'
import path from 'path';

dotenv.config({path:'./config.env'});

const host = '0.0.0.0';
const port = process.env.PORT || 5000;
const app= express()
app.use(router);

if(process.env.NODE_ENV === "production"){
    const __dirname=path.resolve();
    app.use(express.static(path.join(__dirname,"/client/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(port,host,()=>{
    console.log(`Server Started Succesfully on port number ${port}`);
})  