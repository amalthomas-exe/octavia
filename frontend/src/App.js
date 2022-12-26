import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
