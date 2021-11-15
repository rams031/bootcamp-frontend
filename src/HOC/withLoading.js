import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import axios from 'axios';

const withLoading = Component => props => {

    const [show, setShow] = useState(false)

    axios.interceptors.request.use(
        (config) => {
            setShow(true)
            return config
        },
        (error) => {
            setShow(false)
            return Promise.reject(error);
        }
    )

    axios.interceptors.response.use(
        (config) => {
            setShow(false)
            return config
        },
        (error) => {
            setShow(false)
            return Promise.reject(error);
        }
    )

    return (
        <div>
            <Loader show={show} />
            <Component {...props} />
        </div>
    )
}

export default withLoading
