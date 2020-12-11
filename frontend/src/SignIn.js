import React, { useState, useEffect } from 'react'



const SignIn = () => {
    const [errors, setErrors] = useState([])
    const [csrf, setCsrfValue] = useState('')

    useEffect(() => {
        fetch('/api/user/signin')
            .then((res) => {
                if (!res.ok) {
                    setErrors([{ 'err': 'something happened' }])
                }
            return res.json()
            }).then(data => {
            console.log(data)
            setCsrfValue(data.csrf_tag.match(/value="(.+)"/)[1])
        })
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target)
        // should somehow include csrf_token field
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
        .then((data) => console.log(data, 'works'))
        .catch(err => console.log(err))
    }
    return (
        <>
            {console.log(csrf)}
            <h1>Sign In</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type='hidden' value={csrf}/>
                <label htmlFor='username'>Username</label>
                <input id='username' type='text' name='username' />
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' name='password'/>
                <label htmlFor='rememberMe'>Remember Me</label>
                <input type='checkbox' name='rememberMe'/>
                <button type='submit'>Sign In</button>
            </form>
        </>    
    )
}

export default SignIn;