// MainPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [headlines, setHeadlines] = useState([]);
  const [today, setToday] = useState(null);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    // 가상의 헤드라인 뉴스 목록
    const dummyHeadlines = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `헤드라인 뉴스 ${index + 1}`,
      content: `헤드라인 뉴스 내용 ${index + 1}`,
    }));
    setHeadlines(dummyHeadlines);

    // 가상의 날씨 정보
    const dummyToday = {
      date: '2023-11-14',
      time: '12:30 PM',
      temperature: '25°C',
      condition: 'Sunny',
    };
    setToday(dummyToday);

    // 가상의 관심 컨테이너 정보
    const dummyInterests = [
      { id: 1, title: '관심 주제 1', description: '기사 제목' },
      { id: 2, title: '관심 주제 2', description: '기사 제목' },
      { id: 3, title: '관심 주제 3', description: '기사 제목' },
      { id: 4, title: '관심 주제 4', description: '기사 제목' },
      { id: 5, title: '관심 주제 5', description: '기사 제목' },
      { id: 6, title: '관심 주제 6', description: '기사 제목' },
      // 추가적인 관심 주제
    ];
    setInterests(dummyInterests);
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
                  <Link to={`/news/${headline.id}`}>{headline.title}</Link>
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
            {today && (
              <>
                <p>Date: {today.date}</p>
                <p>Time: {today.time}</p>
                <p>Temperature: {today.temperature}</p>
                <p>Condition: {today.condition}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
