import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    cName:{
        type:String
    },
    fName:{
        type:String,
        
    },
    emailID:[{
        type:String
    }],
    phNumber:[{
        type:Number
    }],
    address:{
        type:String
    }
})

const Client = mongoose.model('CLIENT',clientSchema);

export default Client;