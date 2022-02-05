import React from 'react';
import moment from 'moment';
import { CloseButton,Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const ViewOpenTicketTableView = (props) => {
  const navigate=useNavigate();
  return (
    <tr>
      <td className='text-center'>{<CloseButton className='me-2' onClick={async ()=>{  try{
              const id= props.id;
              const res=await fetch('/CloseTicket',{
                  method:"POST",
                  headers:{
                      "Content-Type":"application/json"
                  },
                    body:JSON.stringify({
                        id
                  })
                  });
            const data= res.status;
            if(data===200){
                console.log("Closed Ticket Succesfully");
                window.location.reload();  
            }
              }catch(err){
                console.log(err);
              }
    }}/>}</td>
      <td>{props.delivery? moment(props.delivery).format('DD/MM/YYYY') : " " }</td>
      <td>{props.cname}</td>
      <td>{props.system}</td>
      <td>{props.problem.slice(0,30)+"..."}</td>
      <td>{props.billraised===true?'✔':'✘'}</td>
      <td>{props.payment===true?'✔':'✘'}</td>
      <td> <Button  onClick={async ()=>{
              const id= props.id;
              try{
              navigate('/ViewTicketData');
              const res=await fetch('/ViewUpdateTicket',{
                  method:"POST",
                  headers:{
                      "Content-Type":"application/json"
                  },
                    body:JSON.stringify({
                        id
                  })
        });
            const data= res.status;
            if(data===200){
                console.log("received id");
            }
              }catch(err){
                console.log(err);
              }
            }} >View</Button></td>
      <td><Button   variant='danger' onClick={async ()=>{
              try{
              const id= props.id;
              const res=await fetch('/DeleteTicket',{
                  method:"POST",
                  headers:{
                      "Content-Type":"application/json"
                  },
                    body:JSON.stringify({
                        id
                  })
                  });
            const data= res.status;
            if(data===200){
                console.log("Deleted Ticket");
                window.location.reload();    
            }
              }catch(err){
                console.log(err);
              }
            }}>Delete</Button></td>
    </tr>

  );
};

export default ViewOpenTicketTableView;
