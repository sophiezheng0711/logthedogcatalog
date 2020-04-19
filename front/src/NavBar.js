import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';


class App extends React.Component {
      render() {
        return (
          <>
            <Navbar bg="transparent" variant='light' expand="lg" style={{fontFamily: 'Comic Sans MS' , fontWeight:'bold'}}>
                <Navbar.Brand href="#home">Logtheanalogdog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" style={{fontFamily: 'Comic Sans MS' , fontWeight:'bold'}} >
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{fontFamily: 'Comic Sans MS' , fontWeight:'bold'}} >
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
          </>
        );
      }
}

export default App;
