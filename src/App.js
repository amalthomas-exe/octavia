import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import SignUpPage from './components/SignUpPage';
import NotesPage from './components/NotesPage';

function App() {
  return (
    <div className="App">
      <NoteState>
        <NavBar />
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
