import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewRecipe from './pages/NewRecipe';
import Recipe from './pages/Recipe';
import Registration from "./pages/Registration"
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';


import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() { 
  const [authState, setAuthState] = useState({username: "", id: 0, status: false});

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', { headers: {
      accessToken: localStorage.getItem('accessToken'),
    },
  }).then((response)=> {
      if (response.data.error) {
        setAuthState({...authState, status: false});
      } else {
        setAuthState({username: response.data.username, id: response.data.id, status: true});
      }
    });
  }, []);

  const logout = () =>{
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id: 0, status: false});
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className='navbar'>            
            {!authState.status ? (
              <>
                <Link to="/login"> Login </Link>
                <Link to="/registration"> Register </Link>
              </>
            ):(
              <>
                <Link to="/"> Home </Link>
                <Link to="/NewRecipe"> Add A New Recipe </Link>
              </>
            )}
          </div>
          <div>
            <h1>{authState.username}</h1>
            {authState.status && <button onClick={logout}> Logout </button>}
          </div>
          <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/NewRecipe" exact element={<NewRecipe/>}/>
            <Route path="/Recipe/:id" exact element={<Recipe/>}/>
            <Route path="/registration" exact element={<Registration/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/profile/:id" exact element={<Profile/>}/>
            <Route path="/changepassword" exact element={<ChangePassword/>}/>
            <Route path="*" exact element={<PageNotFound/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
