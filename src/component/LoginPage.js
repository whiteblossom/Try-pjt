// LoginPage.js
import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 로직 추가
    console.log('로그인 시도:', { username, password });
  };

  return (
    <div>
      <h1>로그인</h1>
      <label>
        아이디:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        비밀번호:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default LoginPage;
