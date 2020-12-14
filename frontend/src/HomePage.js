import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link   } from 'react-router-dom'


const HomePage = () => {
    return (
        <div><Link to='/profile'>Go profile</Link></div>
    )
}

export default HomePage