// DetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    // 여기서 API 호출 등을 통해 실제 데이터를 가져올 수 있습니다.
    // 여기서는 가상의 데이터를 사용하겠습니다.
    const dummyNews = [
      { id: 1, title: '헤드라인 뉴스 1', content: '헤드라인 뉴스 내용 1' },
      { id: 2, title: '헤드라인 뉴스 2', content: '헤드라인 뉴스 내용 2' },
      { id: 3, title: '헤드라인 뉴스 3', content: '헤드라인 뉴스 내용 3' },
      // 새로운 뉴스 추가
      {
        id: 4,
        title: '새로운 뉴스 제목',
        content: '새로운 뉴스의 내용입니다. 이 부분은 실제 데이터로 대체되어야 합니다.',
      },
    ];

    const selectedNews = dummyNews.find((item) => item.id === parseInt(id));
    setNews(selectedNews);
  }, [id]);

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="main-container">
        <div className="left-container">
          <div className="headline-container">
            <h1>{news.title}</h1>
            <p>{news.content}</p>
          </div>
        </div>
        <div className="right-container">
         
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
