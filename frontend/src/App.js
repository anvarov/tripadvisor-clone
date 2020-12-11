import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignIn from './SignIn';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signup'>
          <SignIn />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
