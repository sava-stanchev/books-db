import './App.css';
import NavBar from "./components/Navbar";
import Books from "./components/Books";
import Login from './components/Login';
import Register from './components/Register';
import SingleBook from './components/SingleBook';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useState} from 'react';
import AuthContext, {getUser} from './providers/auth-context';
import GuardedRoute from './hof/GuardedRoute';
import AddBook from './components/AddBook';
import AddReview from './components/AddReview';
import UpdateBook from './components/UpdateBook';
import Users from './components/Users';
import SingleUser from './components/SingleUser'
import UpdateReview from './components/UpdateReview';
import HomePage from './components/HomePage';

const App = () => {

  const [authValue, setAuthValue] = useState({
    user: getUser(),
    isLoggedIn: Boolean(getUser()),
  })

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value = {{...authValue, setAuthState: setAuthValue}}>
          <NavBar />
            <Switch>
              <Redirect path="/" exact to="/home" />
              <Route path="/home" exact component={HomePage}/>
              <GuardedRoute path="/books" exact component={Books} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/books/create" exact component={AddBook} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/books/:id" exact component={SingleBook} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/books/:id/update" exact component={UpdateBook} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/books/:id/create-review" exact component={AddReview} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/reviews/:reviewId/update" exact component={UpdateReview} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/users" exact component={Users} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/profile" exact component={SingleUser} isLoggedIn={authValue.isLoggedIn}/>
              <Route path="/login" component={Login}/>       
              <Route path="/register" component={Register}/>
            </Switch>
        </AuthContext.Provider>    
      </BrowserRouter>
    </div>
  );
}

export default App;
