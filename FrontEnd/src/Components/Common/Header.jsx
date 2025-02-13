import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <Navbar expand="lg py-3">
                <Container>

                    <Navbar.Brand href="#home" className='logo'>
                        <span>UrbanEdge</span> Construction
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <li><Link className='nav-link' to={'/'}>Home</Link></li>
                            <li><Link className='nav-link' to={'/service'}>Services</Link></li>
                            <li><Link className='nav-link' to={'/project'}>Projects</Link></li>
                            <li><Link className='nav-link' to={'/blog'}>Blogs</Link></li>
                            <li><Link className='nav-link' to={'/contact'}>Contact</Link></li>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    )
}

export default Header
