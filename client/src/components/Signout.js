import react ,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const Signout = () => {
    const navigate= useNavigate();
    const logoff= async ()=>{
        try{
        const res = await fetch('/logout',{
            method:'GET',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const data = await res.json();
        
        if(data){
            navigate('/Login')
            
        }else {
            const error = new Error(res.error);
            throw error;
        }
      }catch(err){
        console.log(err); 
    }
}
useEffect(()=>{
    logoff();
  },[])
  return(
      <h1></h1>
  
  )
};

export default Signout;
