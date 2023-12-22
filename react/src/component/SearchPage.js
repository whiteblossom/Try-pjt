// SearchPage.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dataDomain } from "./common";

const SearchPage = () => {
  const { word } = useParams();
  const [searchKeyword, setSearchKeyword] = useState([]);

  useEffect(() => {
    // 가상의 검색된 뉴스 목록
    const fetchSearch = async () => {
      try {
        const response = await fetch(`${dataDomain}/api/articles/search/${word}`);
      
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

  const highlightSearchKeyword = (text, keyword) => {
    // 정규 표현식을 사용하여 검색어에 매칭되는 부분을 찾음
    const regex = new RegExp(`(${keyword})`, 'gi');
    
    // 매칭된 부분을 감싸는 <span> 요소로 변경하여 반환
    return text.split(regex).map((part, index) => 
      regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
    );
  };
  

  
  return (
    <div>
      <div className="main-container">
        <div className="left-container">
          <div className="headline-container">
            <h1>{word}</h1>
            {searchKeyword.length === 0 ? (
              <p>검색된 기사가 존재하지 않습니다.</p>
            ) : (
              <ul>
                {searchKeyword.map((news) => (
                  <li key={news.article_id}>
                    <Link to={`/detail/${news.article_id}`}>
                      {highlightSearchKeyword(news.title, word)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;