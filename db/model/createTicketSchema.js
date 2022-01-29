import mongoose from "mongoose";
import moment from 'moment';

const date=moment(new Date()).format('YYYY-MM-DD');
const  ticketSchema = new mongoose.Schema({
    cName:{
        type:String,
        required:true
    },
    emailID:{
        type:String
    },
    phNumber:{
        type:Number,
        required:true
    },
    sysName:{
        type:String
    },
    probTextArea:{
        type:String
    },
    pSolutionTextArea:{
        type:String
    },
    quotaionTextArea:{
        type:String
    },
    statusRadio:{
        type:String
    },
    delDate:{
        type:Date
    },
    fSolutionTextArea:{
        type:String
    },
    commentTextArea:{
        type:String
    },
    closed:{
        default:false,
        type:Boolean
    },
    creationDate:{
        default:date,
        type:Date
    }
})
const Ticket = mongoose.model('TICKET', ticketSchema)

export default Ticket