import mongoose from "mongoose";

 const conn= async  ()=>{
    const db= process.env.DATABASE;

return mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connection succesfull")
}).catch((err)=>{
    console.log(err);
})

}
export default conn