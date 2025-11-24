import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importante: Tiene que tener el "./pages/"
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/torneos" element={<h1>Bienvenido a la Arena</h1>} />
      </Routes>
    </Router>
  );
}

export default App;