import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({ location, isAuthorized, component: Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={(props) => {
                if (isAuthorized) {
                    return <Component />
                } else {
                    return (
                        <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
                    )
                }
            }}
        />
    )
}
  
export default PrivateRoute