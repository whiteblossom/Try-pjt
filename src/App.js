// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './component/MainPage';
import DetailPage from './component/DetailPage';
import LoginPage from './component/LoginPage';
import SignupPage from './component/SignupPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <h1>TRY</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/detail">Detail</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </nav>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
        <div className="footer">
          © 2023 News App. All rights reserved.
        </div>
      </div>
    </Router>
  );
};

export default App;
