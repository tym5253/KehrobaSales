import React ,{useEffect,useState} from 'react';
import { Container, Form ,Col,Row,Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ViewTicketData = () => {
    const [ticketData,setTicketData] = useState({});
    
    const {register,handleSubmit,formState:{errors},reset} = useForm({defaultValues:{
        cName:"",
        emailID:"",
        phNumber:"",
        sysName:"",
        probTextArea:"",
        pSolutionTextArea:"",
        quotaionTextArea:"",
        statusRadio:"",
        delDate:"",
        fSolutionTextArea:"",
        commentTextArea:""
      }});
      const navigate=useNavigate();
      const callHomePage = async () =>{
          try{
            const res = await fetch('/ViewTicketData',{
                method:'GET',
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data = await res.json();
            if(data.delDate){
            const updatedData={...data,delDate:moment(data.delDate).format('YYYY-MM-DD')}
            setTicketData(updatedData);
            }else{
              setTicketData(data);
            }
            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }
            
          }catch(err){
            console.log(err);
            navigate('/Login')
          }
        }
        useEffect( ()=>{
          callHomePage();
        },[]);
    
        
        useEffect( ()=>{
         reset(ticketData); 
        },[ticketData])
    
    
    return(
    <Container>
    <h2 className="mt-5" style={{fontWeight:"Bold"}}>UPDATE TICKET</h2>
    <Container  className="p-4  " style={{border: "1px solid #000000",boxSizing: "border-box",boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",borderRadius: "5px"}}>
      <Form method='POST'onSubmit={handleSubmit(async (values)=>{
          try{
            
          const {cName,emailID,phNumber,sysName,probTextArea,pSolutionTextArea,quotaionTextArea,statusRadio,delDate,fSolutionTextArea,commentTextArea}=values;
          const id= ticketData._id;
          const res=await fetch('/UpdateTicketData',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id,cName,emailID,phNumber,sysName,probTextArea,pSolutionTextArea,quotaionTextArea,statusRadio,delDate,fSolutionTextArea,commentTextArea
            })
        });
    const data= res.status;
    if(data===200){
        window.alert("Ticket Updated");
        console.log("Updated Ticket successfull");
        navigate("/")
    }else{
        window.alert("Please try again later")
    }
}catch(err){
    console.log(err);
}

        })}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formName">
              <Form.Label className="formLabel">Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" name="fName" {...register("cName",{required:'Please Fill Value'})}/>    
              <p className="error">{errors.cName?.message}</p>  
            </Form.Group>
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label className="formLabel">Email:</Form.Label>
              <Form.Control type="Email" placeholder="Enter Email" name="emailID" {...register("emailID",{pattern:{
                value:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message:"Enter Valid Email ID"}})} />
                <p className="error">{errors.emailID?.message}</p>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPhNumber">
              <Form.Label className="formLabel">Phone Number:</Form.Label>
              <Form.Control type="Number" placeholder="Phone Number" name="phNumber"  {...register("phNumber",{required:"Please Fill Value",minLength:{
                value:10,
                message:'Enter Valid 10 digit Number'
              }})}/>
              <p className="error">{errors.phNumber?.message}</p>
            </Form.Group>
            <Form.Group as={Col} controlId="formSysName">
              <Form.Label className="formLabel">System Name:</Form.Label>
              <Form.Control type="Text" placeholder="Enter System Name" name="sysName"  {...register("sysName")} />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="mb-3" controlId="formProblemTextArea">
            <Form.Label className="formLabel">Problem:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Type Problem here"
                style={{ height: '100px' }}
                name="probTextArea"
                {...register("probTextArea")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formProposedSolutionTextArea">
            <Form.Label className="formLabel">Proposed Solution(s):</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Type Solution here"
                style={{ height: '50px' }}
                name="pSolutionTextArea"
                className="mb-2"
                {...register("pSolutionTextArea")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formQuoteTextArea">
            <Form.Label className="formLabel">Quotation:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Type Quotation here"
                style={{ height: '100px' }}
                name="quotaionTextArea"
                {...register("quotaionTextArea")}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className='ms-2 formLabel'>Status:</Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3 ms-2">
                  <Form.Check
                    inline
                    label="Pending"
                    name="statusRadio"
                    type={type}
                    id={`inline-${type}-Pending`}
                    value="Pending" 
                    {...register("statusRadio")}
                  />
                  <Form.Check
                    inline
                    label="Done"
                    name="statusRadio"
                    type={type}
                    id={`inline-${type}-Name`}
                    value="Done" 
                    {...register("statusRadio")}
                  />
                  <Form.Check
                    inline
                    label="Not Done"
                    name="statusRadio"
                    type={type}
                    id={`inline-${type}-NotDone`}
                    value="Not Done" 
                    {...register("statusRadio")}
                  />
                    <Form.Check
                    inline
                    label="Outsourced"
                    name="statusRadio"
                    type={type}
                    id={`inline-${type}-Outsourced`}
                    value="Outsourced" 
                    {...register("statusRadio")}
                  />
                </div>
              ))}
            </Form.Group>
            <Form.Group as={ Col } controlId="formGridZip">
              <Form.Label className="formLabel">Delivery Date:</Form.Label>
              <Form.Control type="date" name="delDate" {...register("delDate")} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formFSolutionTextArea">
              <Form.Label className="formLabel">Final Solution:</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Type Solution here"
                  style={{ height: '80px' }}
                  name="fSolutionTextArea"
                  {...register("fSolutionTextArea")}  
                />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formCommentsTextArea">
              <Form.Label className="formLabel">Comments:</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Type Comment here"
                  style={{ height: '100px' }}
                  name="commentTextArea"
                  {...register("commentTextArea")}
                />
            </Form.Group>
          </Row>
          <Row className="mb-3 text-center justify-content-lg-center" >
          <Col md={5} >
            <Button className=" px-4 mb-3 formButton"  size="lg" type="submit">
              Update
            </Button>
          </Col>
          </Row>
        </Form>
      </Container>
    </Container>
    );};

export default ViewTicketData;
