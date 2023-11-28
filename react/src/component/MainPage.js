//MainPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const MainPage = () => {
  const [today, setToday] = useState(null);
  const [interests, setInterests] = useState([]);
  const [articles, setArticles] = useState([]);
  const [headlines, setHeadlines] = useState([]);
  const [keywordArticles, setKeywordArticles] = useState({}); // 관심 키워드별 기사 저장

  const user_id = sessionStorage.getItem('user_id');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const article = await axios.get('/api/articles/all');
        const headline = await axios.get('/api/articles/headline');
        setArticles(article.data);
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
      const interest = await axios.get(`/api/users/interests/${user_id}`);
      setInterests(interest.data);

      const keywordArticleMap = {}; // 관심 키워드별 기사를 저장할 객체
      await Promise.all(
        interest.data.map(async (keyword) => {
          const response = await axios.get(`/api/users/userArticle/${keyword}`);
          keywordArticleMap[keyword] = response.data;
        })
      );

      setKeywordArticles(keywordArticleMap);
    };
    UserInterests();

    const articletitle = async (keyword) => {
    const article = axios.get(`/api/users/userArticle/${keyword}`).then(
      response => { console.log( response.data ) ; return 1 ; }

    );
    // console.log(article);
    }
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
              { interests.slice(0,6).map((interest) => (
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
