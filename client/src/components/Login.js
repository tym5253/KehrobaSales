import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { Container,Form,Button,Image, Stack} from 'react-bootstrap';
import logo from '../images/Logo.png'

const Login = () => {
    const [formValues,setFormValues]=useState({
        username:'',
        password:''
    })
    let navigate = useNavigate();
    
    const loginUser= async (e)=>{  
            
            const {username,password}=formValues;
            e.preventDefault();

            const res = await fetch('/signin',{
                    method:'POST',
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify({
                        username,
                        password
                    })
            });

            const data = await res.json();
            
            if (res.status===201){
                window.alert("Login Successfull");
                navigate('/');
            }else{
                window.alert("Invalid Credentials");
                navigate('/Login');
            }
    }
    return (
       <Container fluid className="loginBackground ">
       <NavLink to="/" style={{textDecoration:'none'}}>
       <Stack direction="horizontal" gap={3}>
            <Image alt="logo"  src={logo} width="90"
        height="95" className=" ms-5 mt-5 "/>
           <h2 className='loginHeading mt-5 '>KEHROBA SALES</h2>
        </Stack>
        </NavLink>
        <Stack className='loginForm p-5' gap={3} >
        <div className="container" >
        <Form method='POST'>
            <Form.Group className="mb-3" controlId="formUsername" >
                <Form.Control type="text" value={formValues.username} onChange= {(e)=> setFormValues({...formValues,username:e.target.value})} placeholder="Username" className="loginInput p-1" size="lg" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" value={formValues.password} onChange= {(e)=> setFormValues({...formValues,password:e.target.value})} placeholder="Password" className="loginInput p-1" size="lg" />
            </Form.Group>
            <Form.Group className="text-center">
            <Button type="submit"  className="text-center px-4 mt-3 loginButton" size="lg" onClick={loginUser} >Sign in</Button>
            </Form.Group>
        </Form>
        </div>
        </Stack>
       </Container>

        );
    }
export default Login
