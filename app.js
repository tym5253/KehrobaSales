import express from "express";
import bodyParser from "body-parser";       
import dotenv from 'dotenv'
import router from './Routes/auth.js'

dotenv.config({path:'./config.env'});

const PORT = process.env.PORT || 5000 ;
const app= express()
app.use(router);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}

app.listen(PORT,()=>{
    console.log(`Server Started Succesfully on port number ${PORT}`);
})  