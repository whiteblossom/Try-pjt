// SignupPage.js
import React, { useState } from 'react';
import '../css/SignupPage.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleSignup = () => {
    // Add your signup logic here, including validation checks
    console.log('회원가입 시도:', { username, password, age, gender });
  };

  const handleUsernameCheck = () => {
    // Add logic for checking username duplication
    console.log('아이디 중복 확인:', { username });
  };

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form className="signup-form">
        <label>
          아이디
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button type="button" onClick={handleUsernameCheck}>중복 확인</button>
        </label>
        <br />
        <label>
          비밀번호
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          비밀번호 확인
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <br />
        <label>
          나이
          <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
        <label>
          성별
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>
        <br />
        <button onClick={handleSignup}>회원가입</button>
      </form>
    </div>
  );
};

export default SignupPage;
