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
  }, [searchKeyword]);

  const handleSearch = () => {
    // 검색 버튼 클릭 시 호출되는 함수
    // 검색 결과를 업데이트하고, 필요한 경우 API 등을 사용하여 실제 검색 기능을 구현할 수 있습니다.
    setSearchedNews(/* API 호출 등으로 검색된 결과 업데이트 */);
  };

  return (
    <div>
      <div className="main-container">
        <div className="headline-container">
          <h1>{searchKeyword}</h1>
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
