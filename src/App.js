// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // 간단한 예제를 위해 사용자명이 "user"이고 비밀번호가 "password"일 때만 로그인 성공으로 가정합니다.
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('로그인 실패. 올바른 사용자명과 비밀번호를 입력하세요.');
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h1>로그인 성공!</h1>
          <p>환영합니다, {username}님.</p>
        </div>
      ) : (
        <div>
          <h1> 로그인</h1>
          <label>
             아이디:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            비밀번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleLogin}>로그인</button>
        </div>
      )}
    </div>
  );
}

export default App;
