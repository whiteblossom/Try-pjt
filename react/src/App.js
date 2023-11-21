// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 추적하는 state 추가

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로그인 상태를 확인
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/auth/user');
        setIsLoggedIn(false); //맨처음에 로그아웃 상태
      } catch (error) { 
      }
    };
    checkLoginStatus();
  }, []);
  
  const handleLogout = async () => {
    try {
       // 로그아웃 클릭 시, 사용자 ID를 sessionStorage에서 제거. null로 뜸
      sessionStorage.removeItem('user_id');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

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
              {isLoggedIn ? (
                <>
                  {/* 로그인한 경우 헤더 */}
                  <Link to="/#" onClick={handleLogout}>로그아웃</Link>
                  <Link to="/mypage">마이페이지</Link>
                </>
              ) : (
                <>
                  {/* 로그인하지 않은 경우 헤더 */}
                  <Link to="/login">로그인</Link>
                  <Link to="/signup">회원가입</Link>
                </>
              )}
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
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
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
