import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewRecipe from './pages/newRecipe';

function App() { 
  return (
    <div className="App">
      <Router>
        <Link to="/newRecipe"> Add A New Recipe </Link>
        <Link to="/"> Home </Link>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/newRecipe" exact element={<NewRecipe/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
