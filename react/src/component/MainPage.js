import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { dataDomain } from "./common";

const MainPage = () => {
  // 상태 변수 초기화
  const [today, setToday] = useState(null);
  const [interests, setInterests] = useState([]);
  const [headlines, setHeadlines] = useState([]);
  const [keywordArticles, setKeywordArticles] = useState({}); // 관심 키워드별 기사 저장

  // 세션에 저장되어 있는 user_id를 확인
  const user_id = sessionStorage.getItem('user_id');

  useEffect(() => {
    // 최초 로딩 시 실행되는 함수
    const fetchArticles = async () => {
      try {
        // 기사들 중 최근 24시간 내의 조회수가 가장 많은 기사 10개를 가져옴
        const headline = await axios.get(`${dataDomain}/api/articles/headline`);
        setHeadlines(headline.data);
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

    const UserInterests = async () => {
      // 사용자의 관심 태그 정보를 가져옴
      const interest = await axios.get(`${dataDomain}/api/users/interests/${user_id}`);
      setInterests(interest.data);

      const keywordArticleMap = {}; // 관심 태그별 기사를 저장할 객체
      await Promise.all(
        interest.data.map(async (keyword) => {
          // 관심 태그별로 검색한 기사들을 매퍼 형식으로 받아들임
          const response = await axios.get(`${dataDomain}/api/users/userArticle/${keyword}`);
          keywordArticleMap[keyword] = response.data;
        })
      );

      setKeywordArticles(keywordArticleMap);
    };
    UserInterests();
  }, []); // 빈 배열을 전달하여 최초 로딩 시에만 실행되도록 설정

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
            <h2>관심 태그 별 뉴스</h2>
            <div className="interest-grid">
              {interests.slice(0, 6).map((interest) => (
                <div key={interest} className="interest-item">
                  <h3># {interest}</h3>
                  {/* 관심 키워드별 기사 표시 */}
                  <ul>
                    {keywordArticles[interest]?.slice(0, 3).map((article) => (
                      <li key={article.article_id}>
                        <Link to={`/detail/${article.article_id}`}>{article.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="today-container">
            <h2>오늘의 정보</h2>
            {today && (
              <>
                <p>{today.date}</p>
                <p>{today.time}</p>
                <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {today.iconUrl && <img src={today.iconUrl} alt="날씨 아이콘" style={{ width: '80px', height: '80px' }} />}
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
