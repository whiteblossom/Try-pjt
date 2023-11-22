// SignupPage.js
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import '../css/SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null); // 추가: 아이디 중복 여부

  const handleUsernameCheck = async () => {
    if (username.length < 4) {
      // 길이가 4자리 미만인 경우 중복 확인을 하지 않고, 중복 가능한 상태로 처리
      setIsUsernameAvailable(true);
      return;
    }
    try {
      const response = await fetch(`/api/users/confirm/${username}`);
      if (!response.ok) {
        throw new Error('중복 확인에 실패했습니다');
      }
  
      // response.json() 호출 전에 응답의 내용 확인
      const responseBody = await response.text();
  
      // JSON 데이터가 있는지 확인 후 처리
      const data = responseBody ? JSON.parse(responseBody) : null;
  
      // 만약 data가 null이면 setIsUsernameAvailable에 false 전달
      if (data == null || Object.keys(data).length === 0) {
        setIsUsernameAvailable(false);
      } else {
        setIsUsernameAvailable(!data.exists);
      }
    } catch (error) {
    }
  };

  const handleSignup = async () => {
    // Add your signup logic here, including validation checks
    console.log('회원가입 시도:', { username, password, age, gender });
  
    try {
      const response =   fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: username,
          password,
          age,
          gender,
        }),
      }  ); 
      setTimeout(navigate('/login'), 500 ) ;

    } catch (error) {
      console.error('회원가입 실패:', error.message);
      // 실패 시 사용자에게 알림을 추가하거나 다른 처리를 수행하세요
    }

    
    // return null;
  };

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form className="signup-form">
      <label>
          아이디
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button type="button" onClick={handleUsernameCheck}>중복 확인</button>
          {isUsernameAvailable !== null && (
            <span className={isUsernameAvailable ? 'available' : 'unavailable'}>
              {isUsernameAvailable ? '사용 불가능한 아이디입니다.' : '사용 가능한 아이디입니다.'}
            </span>
          )}
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
        <button onClick={handleSignup}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;