import {useContext} from 'react';
import {Link} from "react-router-dom";
import AuthContext from '../providers/auth-context';

const HomePage = () => {
  const auth = useContext(AuthContext);

  return(
    <div className="library-photo-container">
      <Link to={auth.isLoggedIn ? "/books" : "/login"}>
        <button className="home-page-button">Enter The Library</button>
      </Link>
    </div>
  )
};

export default HomePage;
