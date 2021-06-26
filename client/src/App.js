import './App.css';
import NavBar from "./components/Navbar";
import Books from "./components/Books";
import Login from './components/Login';
import Register from './components/Register';
import SingleBook from './components/SingleBook';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useState} from 'react';
import AuthContext, {getUser} from './providers/auth-context';
import AddBook from './components/AddBook';
import AddReview from './components/AddReview';
import UpdateBook from './components/UpdateBook';
import Users from './components/Users';
import SingleUser from './components/SingleUser'
import UpdateReview from './components/UpdateReview';
import HomePage from './components/HomePage';
import GuardedRoute from './providers/GuardedRoute';

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
              <Route exact path="/home" component={HomePage}/>
              <GuardedRoute exact path="/books" component={Books} />
              <GuardedRoute exact admin path="/books/create" component={AddBook} />
              <GuardedRoute exact path="/books/:id" component={SingleBook} />
              <GuardedRoute exact path="/books/:id/update" component={UpdateBook} />
              <GuardedRoute exact path="/books/:id/create-review" component={AddReview} />
              <GuardedRoute exact path="/reviews/:reviewId/update" component={UpdateReview} />
              <GuardedRoute exact admin path="/users" component={Users} />
              <GuardedRoute exact path="/profile" component={SingleUser} />
              <Route path="/login" component={Login}/>       
              <Route path="/register" component={Register}/>
            </Switch>
        </AuthContext.Provider>    
      </BrowserRouter>
    </div>
  );
}

export default App;
