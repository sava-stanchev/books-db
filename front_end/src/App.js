import './App.css';
import NavBar from "./components/Navbar";
import Books from "./components/Books";
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import SingleBook from './components/SingleBook';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Reviews from './components/Reviews';
import SingleReview from './components/SingleReview';
import { useState } from 'react';
import AuthContext, { getUser } from './providers/authContext';
import GuardedRoute from './hof/GuardedRoute';
import AddBook from './components/AddBook';
import AddReview from './components/AddReview';
import UpdateBook from './components/UpdateBook';

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
              <GuardedRoute path="/books" exact component={Books} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/books/create" exact component={AddBook} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/books/:id" exact component={SingleBook} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/books/:id/update" exact component={UpdateBook} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/books/:id/create-review" exact component={AddReview} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/reviews" exact component={Reviews} isLoggedIn={authValue.isLoggedIn}/>
              <GuardedRoute path="/reviews/:reviews_id" exact component={SingleReview} isLoggedIn={authValue.isLoggedIn}/>
              <Route path="/about" component={About}/>
              <Route path="/login" component={Login}/>       
              <Route path="/register" component={Register}/>
            </Switch>
        </AuthContext.Provider>    
      </BrowserRouter>
    </div>
  );
}

export default App;
