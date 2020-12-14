import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
const ProfilePage = () => {
    const username = useSelector(state => state.auth.username)
    return (

        <h1>works, {username}</h1>
    )
}
export default ProfilePage