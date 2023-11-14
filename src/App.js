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
          <Link to="/">
            <h1>TRY</h1>
          </Link>
          <nav>
          <Link to="/">
            <h1>TRY</h1>
          </Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>
        <nav>
          <ul>
            <li><Link to="/category/politics">Politics</Link></li>
            <li><Link to="/category/economy">Economy</Link></li>
            <li><Link to="/category/society">Society</Link></li>
            <li><Link to="/category/it">IT</Link></li>
            <li><Link to="/category/world">World</Link></li>
            <li><Link to="/category/culture">Culture</Link></li>
          </ul>
        </nav>
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
