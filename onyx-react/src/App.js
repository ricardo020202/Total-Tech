import logo from './logo.svg';
import './App.css';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import CatEntrenamientos from './components/CatEntrenamientos';


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/catEntrenamientos' element={<CatEntrenamientos/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
