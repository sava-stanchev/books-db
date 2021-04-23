import './App.css';
import NavBar from "./components/Navbar";
import Books from "./components/Books";
import About from './components/About';
import Reviews from './components/Reviews';
import Login from './components/Login';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
        <Switch>
          <Route path="/books" component={Books}>
            <Books />
          </Route>
          <Route path="/reviews" component={Reviews}>
            <Reviews />
          </Route>
          <Route path="/about" component={About}>
            <About />
          </Route>
          <Route path="/login" component={Login}>
            <Login />
          </Route>
          <Route path="/register" component={Register}>
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
