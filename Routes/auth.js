import express from 'express';
import connection from '../db/conn.js';
import admin from '../db/model/adminAuthSchema.js';
import ticket from '../db/model/createTicketSchema.js';
// import client from '../db/model/clientSchema.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticate from '../middleware/authenticate.js';
import cookieParser from 'cookie-parser';
const router=express.Router();

router.use(cookieParser());
router.use(express.json());
bodyParser.urlencoded({ extended: true }); 
dotenv.config({path:'./config.env'});
connection();

const date = new Date();



router.post('/register', async (req,res)=>{

  
    const {cName,fName,emailID,phNumber,sysName,probTextArea,pSolutionTextArea,quotaionTextArea,statusRadio,delDate,fSolutionTextArea,commentTextArea}=req.body;
    
    try{
    const clientTicket = await ticket({cName,fName,emailID,phNumber,sysName,probTextArea,pSolutionTextArea,quotaionTextArea,statusRadio,delDate,fSolutionTextArea,commentTextArea})

    const createTicket=await clientTicket.save();
    if (createTicket){
        res.status(201).json({message:"Ticket Created Succesfully!"})
    }else{
        res.status(500).json({error:"failed to enter data!"})
    }

    // const clientExists= client.findOne({cName:cName});
    // const newClient = client({cName,fName,emailID,phNumber});
    //     if(clientExists){
    //         const clientUpdated=client.updateOne({cName:cName},{$addToSet: { emailID:[emailID] }})
    //             if(clientUpdated){
    //                 res.status(201).json({message:"client Updated"})
    //             }
    //         }else{
    //         const newClientCreated= await newClient.save();
    //         if(newClientCreated){
    //             res.status(201).json({message:"client Created Succesfully!"})
    //         }
    //     }
}catch(err){
    console.log(err)
}
})

router.post('/signin', async (req,res)=>{
    try{
        const { username,password }= req.body;
        
        if(!username || !password){
            return res.status(400).json({error:"Please Fill Details!"});
        }

        const adminLogin = await admin.findOne({username:username});

        if(adminLogin){
            const passMatch = await bcrypt.compare(password, adminLogin.password)
            
            

            if(passMatch){
            const token = jwt.sign({_id:adminLogin._id},process.env.SECRET_KEY);
            res.cookie('jwtToken',token,{
                expires: new Date(Date.now()+86400000),
                httpOnly:true
                });
            res.status(201).json({message:"Login Successfull!!"});
            }else{
                res.status(500).json({error:"Invalid Credentials!"});
            }
        }else{
            res.status(500).json({error:"Invalid Credentials!"}); 
        }
       
    }catch (err){
        console.log(err);
    }
})

router.get('/logout', (req,res)=>{
    res.clearCookie('jwtToken');
    res.status(200).json("Succesfully Signed Out!");
})


// router.post("/admin",async (req,res)=>{

//     const {username,password}=req.body;
//     try{
//     const newAdmin= admin({username,password});  
//     const newAdminCreated = await newAdmin.save();
//     if(newAdminCreated){
//         res.status(210).json({messsage:"New Admin Created"})
//     }
//     }catch(err){
//         console.log(err);    
//     }

// })

router.get('/Home',authenticate, async (req,res)=>{
    try{   
    const openTicket = await ticket.find({closed:false},{cName:1,fName:1,statusRadio:1,sysName:1,probTextArea:1,delDate:1});
    if(openTicket){
        res.status(200).json(openTicket);
    }
    }catch(err){
        console.log(err);
    }
})

router.get('/References',authenticate,(req,res)=>{
})

router.get('/ViewTicket',authenticate,async (req,res)=>{
    try{
        const getClosedTicket = await ticket.find({closed:true},{cName:1,fName:1,sysName:1,probTextArea:1,creationDate:1});
        if(getClosedTicket){
            res.status(200).json(getClosedTicket);
        }
    }catch(err){
        console.log(err);
    }   
})

router.get('/CreateTicket',authenticate, async (req,res)=>{
    res.status(200).json({message:"authenticated"});
})

let updateId="";
router.post('/ViewUpdateTicket',(req,res)=>{
    updateId=req.body;
    if(updateId){
        res.status(200).json({message:"received Id"});
    }

})
router.get('/ViewTicketData',authenticate,async (req,res)=>{
    try{
    const data = await ticket.findOne({_id:updateId.id});
    if(data){
    res.status(200).json(data);
    }
    }catch(err){
        console.log(err);
    }
})

router.post('/UpdateTicketData', async (req,res)=>{
    const data =req.body;
    try{
        const updatedTicket = await ticket.updateOne({_id:data.id},data);
        if(updatedTicket){
            res.status(200).json({message:"updated ticket succesfully"});
        }
    }catch(err){
        console.log(err);
    }
});

router.post('/DeleteTicket',async (req,res)=>{
    const id = req.body;
    try{
        const deleteTicket = await ticket.deleteOne({_id:id.id});
    
        if(deleteTicket){
            res.status(200).json({message:"succesfully deleted"})
        }
    }catch(err){
        console.log(err);
    }
});

router.post('/CloseTicket', async (req,res)=>{
    const id = req.body;
    try{
        const closeTicket = await ticket.updateOne({_id:id.id},{closed:true});
    
        if(closeTicket){
            res.status(200).json({message:"succesfully closed"})
        }
    }catch(err){
        console.log(err);
    }
});

 let closedTicketId="";
router.post('/ViewClosedTicketData',async(req,res)=>{
    closedTicketId = req.body;
    if(closedTicketId){
        res.status(200).json({message:"received Id"});
    }
});

router.get('/ViewClosedTicketData',authenticate,async(req,res)=>{
    try{
        
        const closeTicket = await ticket.findOne({_id:closedTicketId.id});
        if(closeTicket){
            res.status(200).json(closeTicket)
        }
    }catch(err){
        console.log(err);
    }
})

router.post('/ReopenClosedTicket',async(req,res)=>{
    const reopenID = req.body;
    const reopen= await ticket.updateOne({_id:reopenID.id},{closed:false,currentDate:date});
    if(reopen){
        res.status(200).json({message:"Reopened Ticket"});
    }
});
router.post('/searchClosedTicketData',async (req,res)=>{
    const {Name,cDate}=req.body;
    try{
    if(Name===""){
        const searchDate = await ticket.find({closed:true,creationDate:cDate});
        console.log(searchDate);
        if(searchDate){
            res.status(200).json(searchDate)
        }else{
            res.status(500).json({message:'date not found'});
        }
    }else if(cDate===""){

        const searchName = await ticket.find({closed:true,cName:Name});
        if(searchName){
            res.status(200).json(searchName);
        }else{
            res.status(500).json({message:'date not found'});
        }  
    }else{
        const search = await ticket.find({closed:true,cName:Name,creationDate:cDate});
        if(search){
            res.status(200).json(search);
        }else{
            res.status(500).json({message:'data not found'})    
        }
    }
    }catch(err){
        console.log(err);
    }
})
export default router;