import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminUserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})



adminUserSchema.pre('save',async function(next){
    try{
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password , 12);
    }
    next();
    }catch(err){
        console.log(err);
    }
});
//generating token

adminUserSchema.methods.generateAuthToken = async function(){
try{
    let sessionToken = jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:sessionToken});
    await this.save();
    return sessionToken;
}catch(err){
    console.log(err);
}
};

const Admin = mongoose.model('ADMIN',adminUserSchema);

export default Admin