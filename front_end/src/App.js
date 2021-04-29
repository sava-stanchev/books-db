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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Switch>
          <Redirect path="/" exact to="/home" />
          <Route path="/books" exact component={Books}/>
          <Route path="/books/:id" component={SingleBook}/>
          <Route path="/reviews" exact component={Reviews}/>
          <Route path="/reviews/:reviews_id" component={SingleReview}/>
          <Route path="/about" component={About}/>
          <Route path="/login" component={Login}/>       
          <Route path="/register" component={Register}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
