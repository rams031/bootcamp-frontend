import React from 'react'
import Navigationbar from '../Navbar/Navigationbar';
import { Container, Card, Accordion, Navbar, NavDropdown, Nav, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import styles from './Log.module.css'
import { useSelector } from 'react-redux';
import userRestriction from '../../HOC/userRestriction';

const Log = (props) => {

    const { loglist } = props;
    const logs = useSelector(state => state.logs.loglist)

    return (
        <div className="log">
            <Navigationbar />
            <Container >
                <h1 className="has-text-weight-bold is-size-3">Inventory Log</h1>
                {
                    logs.length > 0 ? <h1 className="has-text-weight-bold is-size-5" > Total Log: {logs.length}</h1> : ""
                }
                {
                    logs.length > 0 ?
                        logs.map((item, index) => {
                            return (

                                <Card className="mb-1 mt-2">
                                    <Card.Body>
                                        <h1 className="mt-2 mb-2 has-text-weight-bold is-size-5" >{item.ActionName}!</h1>
                                        <Card.Text>
                                            <h4 className="mt-2 mb-2 is-size-5"> Item: {item.ItemName} </h4> <br />
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })
                        : <h1 style={{ textAlign: 'center' }} >No Inventory Log</h1>
                }
            </Container>
        </div>
    )
}

export default userRestriction(Log)
