import React, { useState } from 'react';
import '../css/LoginPage.css';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { dataDomain } from "./common";

const LoginPage = ({ setIsLoggedIn }) => {
  const [user_id, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //user의 id와 password가 데이터베이스에 있는것과 일치하는지 확인
      const response = await axios.post(`${dataDomain}/api/users/login`, { user_id, password });

      setIsLoggedIn(true);
      setLoginSuccess('로그인 성공!');
      setLoginError(null);

       // 로그인 성공 시, 사용자 ID를 sessionStorage에 저장
       sessionStorage.setItem('user_id', response.data.user_id);
       navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.');
      setLoginSuccess(null);
    }
  };

  return (
    <div className="login-container">
      <h1>로그인</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <label>
          아이디
          <input type="text" value={user_id} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          비밀번호
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">로그인</button>
      </form>
      {loginError && <p className="error-message">{loginError}</p>}
      {loginSuccess && <p className="success-message">{loginSuccess}</p>}
    </div>
  );
};

export default LoginPage;
