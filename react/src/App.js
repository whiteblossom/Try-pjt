// App.js
import React, { useState } from 'react';
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
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    // Redirect to the search route with the current search value
    window.location.href = `/search/${searchValue}`;
  };

  return (
    <Router>
      <div>
        <header>
          <div className="center">
            <h1><Link to="/">TRY</Link></h1>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="button" onClick={handleSearch}>
                Search
              </button>
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
            <Route path="/search/:word" element={<SearchPage />} />
            <Route path="/detail/:article_id" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/category/:category_id" element={<CategoryPage />} />
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
