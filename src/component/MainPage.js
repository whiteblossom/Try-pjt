// MainPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  // 가상의 헤드라인 뉴스 목록
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    // 여기서 API 호출 등을 통해 실제 데이터를 가져올 수 있습니다.
    // 여기서는 가상의 데이터를 사용하겠습니다.
    const dummyHeadlines = [
      { id: 1, title: '헤드라인 뉴스 1', content: '헤드라인 뉴스 내용 1' },
      { id: 2, title: '헤드라인 뉴스 2', content: '헤드라인 뉴스 내용 2' },
      { id: 3, title: '헤드라인 뉴스 3', content: '헤드라인 뉴스 내용 3' },
    ];
    setHeadlines(dummyHeadlines);
  }, []);

  return (
    <div>
      <h1>헤드라인 뉴스</h1>
      <ul>
        {headlines.map((headline) => (
          <li key={headline.id}>
            <Link to={`/news/${headline.id}`}>{headline.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
