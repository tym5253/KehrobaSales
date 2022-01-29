import React from 'react';
import {Button, Card,CloseButton,Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import moment from 'moment'

function ViewOpenTicket(props){
  const navigate= useNavigate();
  return (
    <Card style={{ width: '18rem' }} className="m-4 ticket">
    <Card.Body className='mt-0 '>
    <Row className='d-flex justify-content-end'><CloseButton className=' me-2' onClick={async ()=>{  try{
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
    }}/></Row>
      <Card.Text >{moment(props.delivery).format('DD/MM/YYYY') }</Card.Text>
      <Card.Title>{props.cname?props.cname:props.fname}</Card.Title>
      {props.status === "Pending"&&<Card.Subtitle className="mb-2" style={{color:"orange"}}>{props.status}</Card.Subtitle>}
      {props.status === "Not Done"&&<Card.Subtitle className="mb-2" style={{color:"red"}}>{props.status}</Card.Subtitle>}
      {props.status === "Done"&&<Card.Subtitle className="mb-2" style={{color:"green"}}>{props.status}</Card.Subtitle>}
      {props.status === "Outsourced"&&<Card.Subtitle className="mb-2" style={{color:"yellow"}}>{props.status}</Card.Subtitle>}
      <Card.Text>{props.system}</Card.Text>
      <Card.Text>
       {props.problem.slice(0,30)}
      </Card.Text>
            <Button className='cardButton me-1' onClick={async ()=>{
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
            }} >View</Button>
            <Button className='cardButton' variant='danger' onClick={async ()=>{
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
            }}>Delete</Button>
    </Card.Body>
  </Card>
  );
}

export default ViewOpenTicket;
