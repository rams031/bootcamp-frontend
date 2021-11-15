import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const userRestriction = Component => props => {

    const validateChange = useSelector(state => state.account.validate);

    return validateChange ?
    (<Component {...props} />) : <Redirect to="/" />

}

export default userRestriction;
