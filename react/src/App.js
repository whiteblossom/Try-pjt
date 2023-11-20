// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './component/MainPage';
import DetailPage from './component/DetailPage';
import LoginPage from './component/LoginPage';
import SignupPage from './component/SignupPage';
import MyPage from './component/MyPage';
import './App.css';
import SearchPage from './component/SearchPage';
import CategoryPage from './component/CategoryPage';

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <div className="center">
          <h1><Link to="/">TRY</Link></h1>
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <Link to="/search"><button type="button">search</button></Link>
          </div>
          <nav>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
            <Link to="/mypage">마이페이지</Link>
          </nav>
          </div>
        </header>
        <nav>
          <ul>
            <li><Link to="/category/1">Culture</Link></li>
            <li><Link to="/category/2">Economy</Link></li>
            <li><Link to="/category/3">Politics</Link></li>
            <li><Link to="/category/4">Science</Link></li>
            <li><Link to="/category/5">Social</Link></li>
            <li><Link to="/category/6">World</Link></li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/category/:category_id" element={<CategoryPage/>} />
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
