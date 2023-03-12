import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
function App() {
  return (
    <>
    <NavBar/> 
    <Home />
    </>
  );
}

export default App;
