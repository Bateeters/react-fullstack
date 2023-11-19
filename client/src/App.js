import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewRecipe from './pages/NewRecipe';
import Recipe from './pages/Recipe';
import Registration from "./pages/Registration"
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() { 
  const [authState, setAuthState] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', { headers: {
      accessToken: localStorage.getItem('accessToken'),
    },
  }).then((response)=> {
      if (response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className='navbar'>
            <Link to="/"> Home </Link>
            <Link to="/NewRecipe"> Add A New Recipe </Link>
            
            {!authState && (
              <>
                <Link to="/login"> Login </Link>
                <Link to="/registration"> Register </Link>
              </>
            )}

          </div>
          <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/NewRecipe" exact element={<NewRecipe/>}/>
            <Route path="/Recipe/:id" exact element={<Recipe/>}/>
            <Route path="/registration" exact element={<Registration/>}/>
            <Route path="/login" exact element={<Login/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
