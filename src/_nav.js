import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function _nav({ price, handler }) {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">GU Calculator</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => handler("fragment")}>Fragment Calculator</Nav.Link>
                            <Nav.Link onClick={() => handler("payback")}>Payback Calculator</Nav.Link>
                            <Nav.Link onClick={() => handler("search")}>Search Card</Nav.Link>
                        </Nav>
                        <Nav className="justify-content-end">
                            <Nav.Link className="justify-content-end"  eventKey="disabled" disabled>GODS: <b>${price} </b></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}