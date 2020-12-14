import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import { login } from './store/auth'
const SignIn = () => {
    const dispatch = useDispatch()
    // const username = useSelector(state => state.auth.username)
    // const isAuthorized = useSelector(state => state.auth.isAuthorized)
    // const [errors, setErrors] = useState({})
    const [passwordError, setPasswordError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [networkError, setNetworkError] = useState(false)
    const [csrf, setCsrfValue] = useState('')
    const [usernameField, setUsername] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const history = useHistory();
    useEffect(() => {
        fetch('/api/user/signin')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.status, res.statusText)
                }
                return res.json()
            }).then(data => {
            // console.log(data)
                setCsrfValue(data.csrf_tag.match(/value="(.+)"/)[1])
                setNetworkError(false)
                // setPasswordError(false)
                // setUsernameError(false)
        }).catch(err => setNetworkError(err))
    }, [])

    const handleUsernamefield = ({ target }) => {
        setUsername(target.value)
        setUsernameError(false)
    } 
    const handlePasswordField = ({ target }) => {
        setPasswordField(target.value)
        setPasswordError(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (usernameField === '') {
            // setErrors(state => ({...state, usernameError: 'Please input username'}))
            setUsernameError('Please input username')
        }
        if (passwordField === '') {
            // setErrors(state => ({ ...state, passwordError: 'Please input password' }))
            setPasswordError('Please input password')
        }
        // else if (Object.keys(errors).length > 0) {
        //     return
        // }

        const formData = new FormData(e.target)
        const username = formData.get('username');
        const password = formData.get('password');
        const rememberMe = formData.get('rememberMe');
        const req = {
             username, password, rememberMe, csrf_token: csrf 
        }
        fetch('/api/user/signin', {
            method: 'post',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),

        }).then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
            .then((data) => {
                if (data.errors) {
                    console.log(data.errors)
                } else {
                    dispatch(login(usernameField))
                    history.push('/')
                }
            })
        .catch(err =>setNetworkError(err))
    }
    return (
        <>
            { networkError && <p>network error</p>}
            <h1>Sign In</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type='hidden' value={csrf}/>
                <label htmlFor='username'>Username</label>
                <input id='username' type='text' name='username' value={usernameField}
                    onChange={(e) => handleUsernamefield(e)} />
                { usernameError && <p> {usernameError }</p>}
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' name='password' value={passwordField}
                    onChange={(e) => handlePasswordField(e)} />
                { passwordError && <p>{ passwordError }</p>}
                
                <label htmlFor='rememberMe'>Remember Me</label>
                <input type='checkbox' name='rememberMe'/>
                <button type='submit'>Sign In</button>
            </form>
        </>    
    )
}

export default SignIn;