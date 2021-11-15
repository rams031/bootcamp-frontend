import React from 'react';
import { Spinner, Placeholder, Container, Card, Accordion, Navbar, NavDropdown, Nav, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Loader.module.css'

const Loader = (props) => {
    return props.show ? (
        <div className={styles.Backdrop}>
            <Spinner className={styles.Loading} animation="border" role="status" size="xl">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h3> Loading </h3>
        </div>
    ) : null
}

export default Loader
