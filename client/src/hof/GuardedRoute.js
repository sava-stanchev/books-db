import { Route, Redirect } from 'react-router-dom';

const GuardedRoute = ({ component: Component, isLoggedIn, ...rest }) =>{

  return (
    <Route {...rest} render={(props) => isLoggedIn? <Component {...props} /> : <Redirect to='/home'/> }/>
  )
};

export default GuardedRoute;