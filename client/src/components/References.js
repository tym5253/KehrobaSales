import React,{useEffect} from 'react'
import { Table,Row,Col, Container,Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const References = () => {

  const navigate=useNavigate();
  const callHomePage = async () =>{
      try{
        const res = await fetch('/References',{
            method:'GET',
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const data = await res.json();

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
      <Container fluid>
    <Row className='mt-5 ms-4'>  
      <Col>
            <Form>
                <Row >
                    <Col>
                        <Form.Group>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control as='textarea' style={{ height: '100px' }}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Link(s):</Form.Label>
                            <Form.Control as='textarea' style={{ height: '100px' }}/>
                        </Form.Group>
                    </Col>
                    <Col className="my-auto ">
                        <Button type="submit" className="formButton">Save</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
      </Row>
      <Row className='mt-5 ms-4 me-4'>
        <Col xs='auto'>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
        </Col>
        <Col className="mt-auto" xs='auto'>
          <Button type="submit" className="formButton">Search</Button>
        </Col>
      </Row>
      <Row className='mt-5 ms-4 me-4'>
        <Table responsive='md' bordered >
            <thead>
                <tr>
                  <th>Title:</th>
                  <th>Links(s):</th>
                </tr>
            </thead>
        </Table>
        </Row>
    </Container>
    )
}

export default References
