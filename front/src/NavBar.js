import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';


class App extends React.Component {
      render() {
        return (
          <>
            <Navbar bg="transparent" variant='light' expand="lg" style={{fontFamily: 'Loki' , fontWeight:'bold'}}>
                <Navbar.Brand href="#home">Log&#183;the&#183;Dog&#183;Catalog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" style={{fontFamily: 'Loki' , fontWeight:'bold'}} >
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <NavDropdown title="Versions" id="basic-nav-dropdown" style={{fontFamily: 'Loki' , fontWeight:'bold'}} >
                        {/* <NavDropdown.Item onClick={this.props.switchToV2}>Version 2</NavDropdown.Item>
                        <NavDropdown.Item onClick={this.props.switchToV1}>Version 1</NavDropdown.Item> */}
                        <Nav.Link href="https://logdogv1.herokuapp.com/#/">Version 1</Nav.Link>
                    </NavDropdown>
                    <NavDropdown title="Actions" id="basic-nav-dropdown" style={{fontFamily: 'Loki' , fontWeight:'bold'}} >
                        <NavDropdown.Item disabled={true} href="#home">Give Us A</NavDropdown.Item>
                        <NavDropdown.Item disabled={true} href="#home">Give Us A+</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item disabled={true} href="#home">A+ and Hall of Fame</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
          </>
        );
      }
}

export default App;
