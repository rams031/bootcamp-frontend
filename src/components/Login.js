import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Login.module.css';
import axios from 'axios';
import Loader from '../Loader/Loader';
import withLoading from '../HOC/withLoading';
import { useHistory } from 'react-router';
import { setAuth } from '../redux/reducer/auth-reducer';
import { useDispatch, useSelector } from 'react-redux';


const Login = (props) => {

    const dispatch = useDispatch()
    const history = useHistory();

    const { notification, setEmail, setUsername, useremail, username, message } = props;

    const [account, setAccount] = useState({
        useremail: '',
        username: ''
    })

    const loginAction = (e) => {

        //const emailValidation = useremail.includes("@") && useremail.includes(".");
        //const emailAuthentication = usersApi.find(item => item.email === useremail);
        //const userNameAuthentication = usersApi.find(item => item.username === username);


        //if (!emailValidation) {
            //notificationMessage = "Email Incorrect Format";
            //setLoginValidation({ message: notificationMessage })
            //setNotif({ ...notif, notification: true })
//
            //setInterval(() => {
            //    setNotif({ ...notif, notification: false })
            //    setLoginValidation({ message: '' })
            //}, 3000)
        //}


        //if (!useremail && !username || useremail && !username || !useremail && username) {
            //notificationMessage = "Make sure to fill all fields";
            //setLoginValidation({ message: notificationMessage })
            //setNotif({ ...notif, notification: true })
//
            //setInterval(() => {
            //    setNotif({ ...notif, notification: false })
            //    setLoginValidation({ message: '' })
            //}, 3000)
        //}

        if (useremail != '' && username != '') {
            if (useremail && username) {
                //dispatch(validateChange(true))
                //dispatch(userEmailChange(useremail))
                //dispatch(userUserNameChange(username))
                //setAuth({ ...auth, authenticated: true })

                axios.post('http://localhost:5000/users/login', {
                  email: useremail,
                  password: username
                })
                .then(function (response) {
                    if (response.status == 200) {
                        console.log("TOKEN", response.data.token)
                        const token = response?.data?.token;
                        //dispatch(setAuth(response.data.token))
                        localStorage.setItem('token', token);
                        
                    }
                    if (response.status == 401) {
                        console.log(response)
                    }
                })
                .catch(function (error) {
                  console.log("error", error);
                });

                setAccount({ 
                  ...account, 
                  useremail: '',
                  username: ''
                })
                
                history.push('/homepage')
            }
            else {
                //setInterval(() => {
                //    setNotif({ ...notif, notification: false })
                //    setLoginValidation({ message: '' })
                //}, 3000)
            }

        }

        //if (!userNameAuthentication) {
            //notificationMessage = "Wrong Username Credential";
            //setLoginValidation({ message: notificationMessage })
            //setNotif({ ...notif, notification: true })
//
            //setInterval(() => {
            //    setNotif({ ...notif, notification: false })
            //    setLoginValidation({ message: '' })
            //}, 3000)
        //}

        //if (!userNameAuthentication && !emailAuthentication) {
            //notificationMessage = "Wrong Credential";
            //setLoginValidation({ message: notificationMessage })
            //setNotif({ ...notif, notification: true })
//
            //setInterval(() => {
            //    setNotif({ ...notif, notification: false })
            //    setLoginValidation({ message: '' })
            //}, 3000)
        //}

        //if (!emailAuthentication) {
            //notificationMessage = "Wrong Email Credential";
            //setLoginValidation({ message: notificationMessage })
            //setNotif({ ...notif, notification: true })
//
            //setInterval(() => {
            //    setNotif({ ...notif, notification: false })
            //    setLoginValidation({ message: '' })
            //}, 3000)
        //}

        //if (!userNameAuthentication) {
        //    console.log("wrong Credential")
        //} else { console.log("right username") }

    }

    const [formErrors, setFormErrors] = useState({
        email: "",
        emailStyle: [],
        userName: "",
        userNameStyle: []
    });

    const validateForm = () => {
        let errors = {
            emailStyle: [],
            userNameStyle: []
        }

        if (!useremail) {
            errors.email = "Must Have Email"
            errors.emailStyle.push(styles.validation)
        }

        if (!username) {
            errors.userName = "Must Have Username"
            errors.userNameStyle.push(styles.validation)
        }

        setFormErrors(errors)


    }

    useEffect(() => {
        validateForm();
    }, [useremail, username]);

    return (
        <div className={styles.Login}>
            <section className="hero is-dark is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                {
                                    notification ?
                                        <div className="notification is-danger is-light animate__animated animate__bounceIn">
                                            <button className="delete"></button>
                                            <strong>Wrong Credential</strong>.
                                        </div> : null
                                }
                                <form action="" className="box animate__animated animate__fadeInDown">
                                    <h1 className="has-text-weight-bold is-size-5 mb-2">Rick Hardware Shop</h1>
                                    <div className="field">
                                        <label for="" className="label">Email</label>
                                        {!useremail ? <small className={styles.redtext}> {formErrors.email} </small> : null}
                                        <input className="input" className={formErrors.emailStyle.join('')} type="email" placeholder="Enter email" onChange={setEmail} value={useremail} />
                                    </div>
                                    <div className="field">
                                        <label for="" className="label">Username</label>
                                        {!username ? <small className={styles.redtext}> {formErrors.userName} </small> : null}
                                        <input className={formErrors.userNameStyle.join('')} type="text" placeholder="Username" onChange={setUsername} value={username} />
                                    </div>
                                    <div className="field">
                                        <a className="button is-dark" onClick={loginAction}>
                                            Login
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login