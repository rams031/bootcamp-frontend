import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from '../Navbar/Navigationbar'


const TestLogin = () => {
    
    const [state, setState] = useState({
        users:[]
    })
    
    const [userdata, setUserData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                setState({...state, users: response.data });
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);


    const loginAction = () => {

        const validation = state.users.findIndex(
            item =>  item.email === userdata.email 
        )

        validation >= 0 ? alert("Account verified") : alert("account not verified")
        
        setUserData({ email: "", password: ""})

        console.log(state.users)
        console.log(validation)
    }

    return (
        <div>
            <div className="cards">
                <div className="form">
                    <Form>

                        <Form.Group className="mb-5" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setUserData({ email: e.target.value }) }} value={userdata.email} />
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => { setUserData({ password: e.target.value }) }} value={userdata.password} />
                        </Form.Group>
                        <a variant="primary" type="submit" onClick={loginAction}>
                            <Button variant="primary" >Login</Button>
                        </a>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default TestLogin
