// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
          <h1>News App</h1>
        </header>
        <nav>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </nav>
        <div className="container">
          {/* 페이지 컴포넌트들의 내용 */}
        </div>
        <div className="footer">
          © 2023 News App. All rights reserved.
        </div>
      </div>
    </Router>
  );
};

export default App;
