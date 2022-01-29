import { useEffect ,useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import ViewOpenTicket from "./ViewOpenTicket";


const Home = () => {
    const navigate=useNavigate();
    const [ticketData,setTicketData]=useState([]);
    const callHomePage = async () =>{
        try{
          const res = await fetch('/Home',{
              method:'GET',
              headers:{
                  Accept:"application/json",
                  "Content-Type":"application/json"
              },
              credentials:"include"
          });
          const data = await res.json();
          setTicketData(data);
          if(!res.status===200){
              const error = new Error(res.error);
              throw error;
          }
        }catch(err){
          console.log(err);
          navigate('/Login')
        }
      }
    
      useEffect(()=>{
        callHomePage();
      },[])


    return (
        <div>
          <h2 className="mt-5 ms-4">OPEN TICKETS</h2>
          {ticketData.map((val)=>{
            return(
          <ViewOpenTicket
            id={val._id}
            key={val._id} 
            cname={val.cName}
            fname={val.fName}
            problem={val.probTextArea}
            status={val.statusRadio}
            system={val.sysName}
            delivery={val.delDate}
          />);
          })
          } 
        </div>
        
    );
}

export default Home
