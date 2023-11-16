// SearchPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchedNews, setSearchedNews] = useState([]);

  useEffect(() => {
    // 가상의 검색된 뉴스 목록
    const dummySearchedNews = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `검색된 뉴스 ${index + 1}`,
      content: `검색된 뉴스 내용 ${index + 1}`,
    }));
    setSearchedNews(dummySearchedNews);
  }, []);

  return (
    <div>
      <div className="main-container">
        <div className="headline-container">
          <h1> {searchKeyword}</h1>
          <div>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="button">검색</button>
          </div>
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
  );
};

export default SearchPage;
