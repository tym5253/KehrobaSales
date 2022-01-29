import React from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from '../images/Logo.png'


const NavBar = () => {
    return (
    <Navbar expand="lg" style={{background:"#822d8f"}}>
    <Container fluid className='ms-1 me-1'>
  <NavLink to="/" style={{textDecoration:'none'}}>
        <img
          alt="Kehroba Logo"
          src={logo}
          width="35"
          height="40"
          className="d-inline-block align-top" 
        />{' '}
       <h3 style={{color: "White", display: "inline", marginLeft:"0.5rem"}}>KEHROBA SALES</h3>
      </NavLink>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <NavLink to="/CreateTicket" className="navigation_link">New Ticket</NavLink>
        <NavLink to="/" className="navigation_link">View Open Tickets</NavLink>
        {/* <NavLink to="/References" className="navigation_link">References</NavLink> */}
        <NavLink to="/ViewTicket" className="navigation_link">View Closed Tickets</NavLink>
        <NavLink to="/Signout " className="navigation_link">Sign Out</NavLink>
      </Nav>
    </Navbar.Collapse>
    </Container>
</Navbar>
    )   
}

export default NavBar
