import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewRecipe from './pages/NewRecipe';
import Recipe from './pages/Recipe';
import Registration from "./pages/Registration"
import Login from './pages/Login';

function App() { 
  return (
    <div className="App">
      <Router>
        <Link to="/"> Home </Link>
        <Link to="/NewRecipe"> Add A New Recipe </Link>
        <Link to="/login"> Login </Link>
        <Link to="/registration"> Register </Link>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/NewRecipe" exact element={<NewRecipe/>}/>
          <Route path="/Recipe/:id" exact element={<Recipe/>}/>
          <Route path="/registration" exact element={<Registration/>}/>
          <Route path="/login" exact element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
