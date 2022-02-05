import { useEffect ,useState,useMemo } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import ViewOpenTicket from "./ViewOpenTicket";
import { ButtonGroup,ToggleButton,Row,Col,Container,Button,Form,Table } from "react-bootstrap";
import ViewOpenTicketTableView from "./ViewOpenTicketTableView";

const Home = () => {

    const navigate=useNavigate();
    const [ticketData,setTicketData]=useState([]);
    const [radioValue,setRadioValue]=useState('1');
    const [renderView,setRenderView] = useState(true);
    const [searchFormData,setSearchFormData]=useState({
      Name:"",
      dDate:""
  });
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

      //******************************SORTING LOGIC************************//
      
      const useSortableData = (items, config = null) => {
        const [sortConfig, setSortConfig] = useState(config);
      
        const sortedItems = useMemo(() => {
          let sortableItems = items;
          if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
              if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
              }
              if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
              }
              return 0;
            });
          }
          return sortableItems;
        }, [items, sortConfig]);
      
        const requestSort = (key) => {
          let direction = 'ascending';
          if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
          ) {
            direction = 'descending';
          }
          setSortConfig({ key, direction });
        };
      
        return { items: sortedItems, requestSort, sortConfig };
      };

      const { items, requestSort, sortConfig } = useSortableData(ticketData);
    const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  //*****************************************************************************************
    return (
        <div>
          <h2 className="mt-5 ms-4">OPEN TICKETS</h2>
          <Row> 
          <ButtonGroup className="ms-4 mt-3 mb-3 d-inline">
          <ToggleButton
          type="radio"
          id="radio-1"
          name="View"
          value="1"
          variant="dark"
          checked={radioValue==='1'}
          onChange={(e)=>setRadioValue(e.currentTarget.value)}
          className="toggleButton"
          onClick={(e)=>{
            setRenderView(true);
          }}
          >Card View</ToggleButton>
          <ToggleButton
          type="radio"
          name="View"
          variant="dark"
          id="radio-2"
          value="2"
          checked={radioValue==='2' }
          onChange={(e)=>setRadioValue(e.currentTarget.value)}
          className="toggleButton"
          onClick={()=>{
            setRenderView(false);
          }}>Table View</ToggleButton>
          </ButtonGroup>
          </Row>
          { renderView&&ticketData.map((val)=>{
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
          />
          );
          })
          }

        {/* **************************TABLE VIEW****************************** */}

          {!renderView&&<Container fluid>
    <Row className='mt-5 ms-4 me-4 '>
        <Col>
            <Row>
                <h5>SEARCH</h5>
            </Row>  
            <Form>
                <Row >
                    <Col >
                        <Form.Group>
                            <Form.Label> Name</Form.Label>
                            <Form.Control type='text' size='sm' name="Name" onChange={async (e)=>{
                                setSearchFormData({
                                    ...searchFormData,
                                    Name:e.target.value.toUpperCase()
                                });
                            }}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type='Date' size='sm' name="dDate" onChange={async (e)=>{
                                setSearchFormData({
                                    ...searchFormData,
                                    dDate:e.target.value
                                });}}/>
                        </Form.Group>
                    </Col>
                    
                    <Col className="pt-4">
                        <Button className="formButton" onClick={async ()=>{
                try{
                const {Name,dDate}=searchFormData;
                const res=await fetch('/searchOpenTicketData',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Name,dDate
            })
        });
    const data= await res.json();
    if(res.status===200){
        setTicketData(data);
    }else{ 
        window.alert("Data not Available");
    }
                }catch(err){
                    console.log(err);
                }         
             }}>Search</Button>
                        <Button className="formButton ms-2" onClick={async ()=>{
                try{
                const res = await fetch('/resetViewOpenTicket',{
              method:'GET',
              headers:{
                  Accept:"application/json",
                  "Content-Type":"application/json"
              },
              credentials:"include"
          });
          const data = await res.json();
          setTicketData(data);
          if(res.status===200){
            console.log("refreshed")
          }
          }catch(err){
              console.log(err);
          }
          }}>Reset</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
        </Row>
        <Row className='mt-5 ms-4 me-4'>
        <Table responsive='sm' bordered >
            <thead>
                <tr>
                    <th>Close</th>
                    <th> <Button type="button"
              onClick={() => requestSort('delDate')}
              className={getClassNamesFor('delDate')+ ' formButton'}>Date</Button></th>
                    <th><Button type="button"
              onClick={() => requestSort('cName')}
              className={getClassNamesFor('cName')+ ' formButton'}>Company Name/First Name</Button></th>
                    <th>System Name</th>
                    <th>Problem</th>
                    <th>Bill Rasied</th>
                    <th>Received Payment</th>
                    <th>View</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
           { ticketData.map((val)=>{
            return(
          <ViewOpenTicketTableView
            id={val._id}
            key={val._id} 
            cname={val.cName}
            problem={val.probTextArea}
            system={val.sysName}
            delivery={val.delDate}
            billraised={val.billRaised}
            payment={val.receivedPayment}
          />
          );
          })}
            </tbody>
          </Table>
        </Row>
        </Container>}
        </div>
        
    );
}

export default Home
