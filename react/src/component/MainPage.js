//MainPage.js
// 로그인되어 있을 경우에만 "오늘의 정보"를 표시
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MainPage = () => {
  const [today, setToday] = useState(null);
  const [interests, setInterests] = useState([]);
  const [articles, setArticles] = useState([]);
  const [headlines, setHeadlines] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const article = await axios.get('/api/articles/all');
        const headline = await axios.get('/api/articles/headline');
        setArticles(article.data);
        setHeadlines(headline.data);

        //현재 사용자 ID 세션 확인
        console.log(sessionStorage.getItem('user_id'));
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchArticles();

    const fetchWeatherData = async () => {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_KEY; // OpenWeatherMap에서 발급받은 API 키로 교체
        const city = 'Seoul'; // 날씨 정보를 가져올 도시로 교체
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await axios.get(apiUrl);
        const iconCode = response.data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

        setToday({
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          temperature: `${Math.floor(response.data.main.temp - 273.15)}°C`,
          condition: response.data.weather[0].description,
          iconUrl: iconUrl,
        });
      } catch (error) {
        console.error('날씨 데이터를 불러오는 중 에러 발생:', error);
      }
    };
    fetchWeatherData();

    const dummyInterests = [
      { id: 1, title: '관심 주제 1', description: '기사 제목' },
      { id: 2, title: '관심 주제 2', description: '기사 제목' },
      { id: 3, title: '관심 주제 3', description: '기사 제목' },
      { id: 4, title: '관심 주제 4', description: '기사 제목' },
      { id: 5, title: '관심 주제 5', description: '기사 제목' },
      { id: 6, title: '관심 주제 6', description: '기사 제목' },
    ];
    setInterests(dummyInterests);
  }, []);

  useEffect(() => {
    // 로그인 여부를 체크하는 로직 (예: 토큰의 존재 여부 등)
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/auth/user');
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <div>
      <div className="main-container">
        <div className="left-container">
          <div className="headline-container">
            <h1>헤드라인 뉴스</h1>
            <ul>
              {headlines.map((headline) => (
                <li key={headline.id}>
                  <Link to={`/detail/${headline.article_id}`}>{headline.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="interest-container">
            <h2>관심 키워드 별 뉴스</h2>
            <div className="interest-grid">
              {interests.map((interest) => (
                <div key={interest.id} className="interest-item">
                  <h3>{interest.title}</h3>
                  <p>{interest.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="today-container">
            <h2>오늘의 정보</h2>
            {isLoggedIn && today && (
              <>
                <p>{today.date}</p>
                <p>{today.time}</p>
                <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {today.iconUrl && <img src={today.iconUrl} alt="날씨 아이콘" style={{ width: '80px', height: '80px'}} />}
                  <span>{today.temperature}</span>
                  <span>{today.condition}</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
