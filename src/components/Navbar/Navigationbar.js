import React, { useEffect } from 'react'
import { Container, Card, Accordion, Navbar, NavDropdown, Nav, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { validateChange } from '../../redux/reducer/user-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import styles from './Navigationbar.module.css';

const Navigationbar = (props) => {
    const dispatch = useDispatch;
    //const history = useHistory();
    const userName = useSelector(state => state.account.username);
    const email = useSelector(state => state.account.email);
    const validateUser = useSelector(state => state.account.validate);


    const { authenticated, setAuth, logoutAction } = props;


    //const logoutAction = () => {
    //    dispatch(validateChange(false))
    //    //history.push('/')
    //}

    return (
        <div className={styles}>
            <Navbar bg="dark" variant="light" expand="lg" className="mb-3 me-auto animate__animated animate__fadeInDown">
                <Container>
                    <Navbar.Brand className="mt-2" href="#home" style={{ fontWeight: 'bold', color: 'white'  }}>Rick Hardware Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {validateUser ?
                                <Nav.Link><NavLink to="/homepage" style={{ color: 'white' }}> Homepage</NavLink></Nav.Link> :
                                <Nav.Link><NavLink to="/" style={{ color: 'white' }}> Store </NavLink></Nav.Link>
                            }
                            {!validateUser ? <Nav.Link><NavLink to="/cart" style={{ color: 'white' }}> Cart</NavLink></Nav.Link> : null}
                            {validateUser ? <Nav.Link><NavLink to="/log" style={{ color: 'white' }}> Inventory Log</NavLink></Nav.Link> : null}
                            {validateUser ? <Nav.Link><NavLink to="/createuser" style={{ color: 'white' }}>Users</NavLink></Nav.Link> : null}
                        </Nav>
                        <Nav>
                            {
                            validateUser ?
                            <Nav.Link><NavLink to="#" ><p style={{ color: 'white', fontWeight: 'bold' }} > ( { email } - Admin ) </p></NavLink> </Nav.Link> : null
                            }
                            {
                            //validateUser ?
                            //    <Nav.Link><NavLink onClick={logoutAction} to="/" style={{ color: 'white', fontWeight: 'bold' }}>Log Out</NavLink></Nav.Link> :
                            //    <Nav.Link><NavLink to="/login" style={{ color: 'white', fontWeight: 'bold' }}>Login</NavLink></Nav.Link>
                            }
                            <Nav.Link><NavLink to="/login" style={{ color: 'white', fontWeight: 'bold' }}>Login</NavLink></Nav.Link>
                            <Nav.Link><NavLink onClick={logoutAction} to="/" style={{ color: 'white', fontWeight: 'bold' }}>Log Out</NavLink></Nav.Link> 
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    )
}

export default Navigationbar
