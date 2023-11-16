// LoginPage.js
import React, { useState } from 'react';
import '../css/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log('로그인 시도:', { username, password });
  };

  return (
    <div className="login-container">
      <h1>로그인</h1>
      <form className="login-form"> {/* Added login-form class to form */}
        <label>
          아이디
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          비밀번호
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button onClick={handleLogin}>로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
