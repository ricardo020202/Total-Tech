import React from 'react'
import { useState } from 'react';

import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';

import './index.css';


const NavBar = ({ toggle }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle search here
    };

    return (
        <Navbar expand="lg" className='navbar-container'>
            <Container>
                <Navbar.Brand href="#home">ONYX</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <NavDropdown title="Workouts" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Catálogo de Ejercicios</NavDropdown.Item>
                            <NavDropdown.Item href="/catEntrenamientos">Catálogo de Entrenamientos</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Alimentación" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Dietas para ti</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Dietas</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#link">Bitácora</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                        id='search-bar'
                        className='me-2 rounded-pill text-white text-center ms-5'
                    />
                </Form>
                <Nav.Link href="login">Login</Nav.Link>
                <Nav.Link href="register"><Button type="button" variant='light rounded-pill'>Sign Up</Button></Nav.Link>

            </Container>
        </Navbar>
    );
}

export default NavBar;