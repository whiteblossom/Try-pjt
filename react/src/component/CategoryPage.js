// SearchPage.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


const SearchPage = () => {
  const { category_id } = useParams(); // useParams를 사용하여 URL에서 category를 얻습니다.
  const [searchedNews, setSearchedNews] = useState([]);

  useEffect(() => {
    // 가상의 카테고리별 기사 목록
    const dummyCategoryNews = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `${category_id} 카테고리 기사 ${index + 1}`,
      content: `${category_id} 카테고리 기사 내용 ${index + 1}`,
    }));
    setSearchedNews(dummyCategoryNews);
  }, [category_id]);

  return (
    <div>
      <div className="main-container">
        <div className="left-container">
        <div className="headline-container">
          <h1>{category_id}</h1>
          <ul>
            {searchedNews.map((news) => (
              <li key={news.id}>
                {/* Link를 사용하여 해당 기사의 상세 페이지로 이동 */}
                <Link to={`/detail/${news.id}`}>{news.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SearchPage;
