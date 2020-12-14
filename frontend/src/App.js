import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SignIn from './SignIn';
import SignUp from './SignUp'
import ProfilePage from './ProfilePage'
import PrivateRoute from './PrivateRoute'
import HomePage from './HomePage'


const App = () => {
  const isAuthorized = useSelector(state => state.auth.isAuthorized)
  console.log(isAuthorized, 'in main page')
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <PrivateRoute path='/profile' component={ProfilePage} isAuthorized={isAuthorized} />
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
