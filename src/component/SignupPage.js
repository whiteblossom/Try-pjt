// SignupPage.js
import React, { useState } from 'react';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // 회원가입 로직 추가
    console.log('회원가입 시도:', { username, password });
  };

  return (
    <div>
      <h1>회원가입</h1>
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
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
};

export default SignupPage;
