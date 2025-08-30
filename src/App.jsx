import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Game from './Components/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="router-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
