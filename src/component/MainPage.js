// MainPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [headlines, setHeadlines] = useState([]);
  const [today, setToday] = useState(null);

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
  }, []);

  return (
    <div>
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
  );
};

export default MainPage;
