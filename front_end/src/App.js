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
import AuthContext from './providers/authContext';
import GuardedRout from './hof/GuardedRoute';

const App = () => {

  const [authValue, setAuthValue] = useState({
    user: null,
    isLoggedIn: false,
  })

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value = {{...authValue, setAuthState: setAuthValue}}>
          <NavBar />
            <Switch>
              <Redirect path="/" exact to="/home" />
              {/* <Route path="/books" exact component={Books}/> */}
              <GuardedRout path="/books" exact component={Books} isLoggedIn={authValue.isLoggedIn}/>
              <Route path="/books/:id" component={SingleBook}/>
              <Route path="/reviews" exact component={Reviews}/>
              <Route path="/reviews/:reviews_id" component={SingleReview}/>
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
