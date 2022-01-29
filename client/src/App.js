import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route,Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NavBar from './components/NavBar';
import References from './components/References';
import ViewTicket from './components/ViewTicket';
import CreateTicket from './components/CreateTicket';
import Signout from './components/Signout';
import ViewTicketData from './components/ViewTicketData';
import './App.css'
import ViewClosedTicketData from './components/ViewClosedTicketData';

function App() {
  return (
    <div >
    <NavBar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='/Login' element={<Login/>}/> 
    <Route path="/References" element={<References/>}/>
    <Route path="/ViewTicket" element={<ViewTicket/>}/>
    <Route path="/CreateTicket" element={<CreateTicket/>}/>
    <Route path="/Signout" element={<Signout/>}/>
    <Route path="/ViewTicketData" element={<ViewTicketData/>}/>
    <Route path="/ViewClosedTicketData" element={<ViewClosedTicketData/>}/>
    </Routes>

    </div>
  );
}

export default App;
