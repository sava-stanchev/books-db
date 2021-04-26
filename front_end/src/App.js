import './App.css';
import NavBar from "./components/Navbar";
import Books from "./components/Books";
import About from './components/About';
import ReviewsForApp from './components/ReviewsForApp';
import Login from './components/Login';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
          <Route path="/reviews" component={ReviewsForApp}>
            <ReviewsForApp />
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
