import React, {useEffect,useState,useMemo} from 'react'
import { Table,Row,Col, Container,Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

const ViewTicket = () => {

    const navigate=useNavigate();
    const [searchFormData,setSearchFormData]=useState({
        Name:"",
        cDate:""
    });
    const [closedticketData,setClosedTicketData]=useState([]);
    const callHomePage = async () =>{
        try{
          const res = await fetch('/ViewTicket',{
              method:'GET',
              headers:{
                  Accept:"application/json",
                  "Content-Type":"application/json"
              },
              credentials:"include"
          });
          const data = await res.json();
          setClosedTicketData(data);
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

      //Sorting code

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

      const { items, requestSort, sortConfig } = useSortableData(closedticketData);
    const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

    return (
    <Container fluid>
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
                            <Form.Control type='Date' size='sm' name="cDate" onChange={async (e)=>{
                                setSearchFormData({
                                    ...searchFormData,
                                    cDate:e.target.value
                                });}}/>
                        </Form.Group>
                    </Col>
                    
                    <Col className="pt-4">
                        <Button className="formButton" onClick={async (e)=>{
                try{
                const {Name,cDate}=searchFormData;
                const res=await fetch('/searchClosedTicketData',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Name,cDate
            })
        });
    const data= await res.json();
    if(res.status===200){
        setClosedTicketData(data);
    }else{ 
        window.alert("Data not Available");
    }
                }catch(err){
                    console.log(err);
                }
            }}>Search</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
        <Col>
            
        </Col>
    </Row>
        <Row className='mt-5 ms-4 me-4'>
        <Table responsive='md' bordered >
            <thead>
                <tr>
                    <th> <Button type="button"
              onClick={() => requestSort('creationDate')}
              className={getClassNamesFor('creationDate')+ ' formButton'}>Date</Button></th>
                    <th><Button type="button"
              onClick={() => requestSort('cName')}
              className={getClassNamesFor('cName')+ ' formButton'}>Company Name/First Name</Button></th>
                    <th>System Name</th>
                    <th>Problem</th>
                    <th>View</th>
                </tr>
            </thead>
            
                <tbody>
                {closedticketData.map((item)=>{
                    return(<tr key={item.data}>
                            <td>{moment(item.creationDate).format('DD/MM/YYYY')}</td>
                            <td>{item.cName?item.cName:item.fName}</td>
                            <td>{item.sysName}</td>
                            <td>{item.probTextArea&&item.probTextArea.slice(0,30)+'...'}</td>
                            <td className='text-center'>
                                <Button className='formButton' onClick={async ()=>{
                                                                        const id= item._id;
                                                                        try{
                                                                            console.log("from view ticket id");
                                                                            console.log(id);
                                                                        navigate('/ViewClosedTicketData');
                                                                        const res=await fetch('/ViewClosedTicketData',{
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
                            </td>
                    </tr>);
                    })}
                </tbody>
            
        </Table>
        </Row>
    </Container>
    )
}

export default ViewTicket
