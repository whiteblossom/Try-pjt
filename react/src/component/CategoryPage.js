import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dataDomain } from "./common";

const CategoryPage = () => {
  // React Router의 useParams 훅을 사용하여 URL 파라미터에서 카테고리 아이디를 가져옴
  const { category_id } = useParams();

  // 카테고리 데이터를 관리하는 상태와 상태 업데이트 함수
  const [categoryData, setCategoryData] = useState({ name: "", news: [] });

  useEffect(() => {
    // 데이터베이스에서 카테고리 별로 뉴스 기사를 가져오는 비동기 함수
    const fetchCategoryNews = async () => {
      try {
        // API를 통해 카테고리 뉴스를 가져옴
        const response = await fetch(`${dataDomain}/api/articles/category/${category_id}`);

        // HTTP 응답이 성공적인 경우
        if (!response.ok) {
          throw new Error('카테고리 뉴스를 가져오는 데 실패했습니다');
        }

        // JSON 형식으로 변환된 데이터를 상태에 업데이트
        const data = await response.json();
        setCategoryData({ name: data.length > 0 ? data[0].category_name : "", news: data });
      } catch (error) {
        // 에러 발생 시 콘솔에 오류 메시지 출력
        console.error('카테고리 뉴스를 가져오는 중 오류 발생:', error.message);
      }
    };

    // 컴포넌트가 마운트되거나 category_id가 변경될 때마다 실행
    fetchCategoryNews();
  }, [category_id]);

  // 뉴스 항목 클릭 시 실행되는 함수
  const handleClick = (id) => {
    console.log(id);
  };

  return (
    <div>
      <div className="main-container">
        <div className="left-container">
          <div className="headline-container">
            {/* 카테고리 이름 출력 */}
            <h1>{categoryData.name}</h1>
            
            {/* 뉴스 목록 출력 */}
            <ul>
              {categoryData.news.map((news) => (
                <li key={news.id}>
                  {/* 각 뉴스 항목에 대한 링크와 클릭 이벤트 설정 */}
                  <Link to={`/detail/${news.article_id}`} onClick={() => handleClick(news.article_id)}>
                    {news.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
