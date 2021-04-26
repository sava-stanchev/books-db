import './App.css';
import NavBar from "./components/Navbar";
import Books from "./components/Books";
import About from './components/About';
import ReviewsForApp from './components/ReviewsForApp';
import Login from './components/Login';
import Register from './components/Register';
import SingleBook from './components/SingleBook';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
        <Switch>
          <Redirect path="/" exact to="/home" />
          <Route path="/books" exact component={Books}/>
          <Route path="/books/:id" component={SingleBook}/>
          <Route path="/reviews" component={ReviewsForApp}/>
          <Route path="/about" component={About}/>
          <Route path="/login" component={Login}/>       
          <Route path="/register" component={Register}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
