import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { login } from './store/auth'

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required Field'),
    name: Yup.string().min(1, 'Please enter your name').max(20, 'Too long').required('Required field'),
    lastName: Yup.string().min(1, 'Please enter your last name').max(20, 'Too long').required('Required field'),
    age: Yup.number().min(16, 'Users should be at least 16 years old').max(100, 'Please enter your age').required('Required field'),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        `Password must contain at least 1 lowercase alphabetical character, 
        1 uppercase alphabetical character, 1 numeric character, one special character [!@#$%^&*],
        and 8 characters or longer`).required('Required field'),
    confirmationPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')


})

const SignUp = () => {
    const [networkError, setNetworkError] = useState(false)
    const [csrf, setCsrfValue] = useState('')
    const history = useHistory()
    useEffect(() => {
        fetch('/api/user/signup')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`${res.status}, ${res.statusText}`)
                }
                return res.json()
            }).then(data => {
            // console.log(data)
                setCsrfValue(data.csrf_tag.match(/value="(.+)"/)[1])
                setNetworkError(false)
                // setPasswordError(false)
                // setUsernameError(false)
        }).catch(err => setNetworkError(state => err.toString().split(',')))
    }, [])
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues : {
            email: '', password: '', name: '', lastName: '',
            age: '', gender: '', confirmationPassword: ''
        },
        validationSchema : SignUpSchema,
        onSubmit: (values, { setSubmitting }) => {
            const req = {
                ...values, password_confirmation: values.confirmationPassword,
                last_name: values.lastName, csrf_token: csrf}
            fetch('/api/user/signup', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
    
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(`${res.status}, ${res.statusText}`)
                }
                return res.json()
            })
                .then((data) => {
                    if (data.errors) {
                        console.log(data.errors)
                    } else {
                        dispatch(login(values.email))
                        history.push('/')
                    }
                })
            .catch(err =>setNetworkError(err.toString().split(',')))
            setSubmitting(false)
        }
    }) 
    return (
        <>
            {networkError && <Typography>{ networkError }</Typography>}
            <Typography>Sign Up</Typography>
            <Box>    
                <form onSubmit={formik.handleSubmit}>
                    <TextField type='hidden' value={csrf}/>
                    <TextField
                        fullWidth
                        name='name'
                        helperText={formik.errors.name && formik.errors.name}
                        label='Name'
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <TextField
                        fullWidth
                        name='lastName'
                        helperText={formik.errors.lastName && formik.errors.lastName}
                        label='Last Name'
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                    <TextField
                        fullWidth
                        name='email'
                        helperText={formik.errors.email && formik.errors.email}
                        label='Email'
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <TextField
                        fullWidth
                        type='number'
                        name='age'
                        helperText={formik.errors.age && formik.errors.age}
                        label='Age'
                        error={formik.touched.age && Boolean(formik.errors.age)}
                        onChange={formik.handleChange}
                        value={formik.values.age}
                    />
                    <TextField
                        fullWidth
                        name='gender'
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        label='Select Gender'
                        select
                    >
                        <MenuItem key='male' value='male'>Male</MenuItem>
                        <MenuItem key='female' value='female'>Female</MenuItem>
                        
                    </TextField>
                    <TextField
                        label='Password'
                        fullWidth
                        type='password'
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        onChange={formik.handleChange}
                        name='password'
                        helperText={formik.errors.password && formik.errors.password}
                    />
                    <TextField
                        label='Confirm Password'
                        fullWidth
                        type='password'
                        value={formik.values.confirmationPassword}
                        error={formik.touched.confirmationPassword && Boolean(formik.errors.confirmationPassword)}
                        onChange={formik.handleChange}
                        name='confirmationPassword'
                        helperText={formik.errors.confirmationPassword && formik.errors.confirmationPassword}
                    />
                        <Button type='submit' variant='contained' fullWidth color='primary'>Sign Up</Button>
                </form>
            </Box>
        </>
    )
}

export default SignUp