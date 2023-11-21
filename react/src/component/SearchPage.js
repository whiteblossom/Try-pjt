// SearchPage.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const SearchPage = () => {
  const { word } = useParams();
  const [searchKeyword, setSearchKeyword] = useState([]);

  useEffect(() => {
    // 가상의 검색된 뉴스 목록
    const fetchSearch = async () => {
      try {
        const response = await fetch(`/api/articles/search/${word}`);
      
        if (!response.ok) {
          throw new Error('검색에 실패했습니다');
        }
        const data = await response.json();
        setSearchKeyword(data);
      } catch (error) {
        console.error('검색실패:', error.message);
      }
    };

    fetchSearch();
  }, [word]);


  return (
    <div>
      <div className="main-container">
      <div className="left-container">
        <div className="headline-container">
          <h1> {word}</h1>
          <ul>
            {searchKeyword.map((news) => (
              <li key={news.article_id}>
                {/* Link를 사용하여 해당 기사의 상세 페이지로 이동 */}
                <Link to={`/detail/${news.article_id}`}>{news.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default SearchPage;
