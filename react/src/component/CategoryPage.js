import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { category_id } = useParams();
  const [categoryData, setCategoryData] = useState({ name: "", news: [] });

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const response = await fetch(`/api/articles/category/${category_id}`);
        if (!response.ok) {
          throw new Error('카테고리 뉴스를 가져오는 데 실패했습니다');
        }

        const data = await response.json();
        setCategoryData({ name: data.length > 0 ? data[0].category_name : "", news: data });
      } catch (error) {
        console.error('카테고리 뉴스를 가져오는 중 오류 발생:', error.message);
      }
    };

    fetchCategoryNews();
  }, [category_id]);

  const handleClick = (id) => {
    console.log(id);
  };

  return (
    <div>
      <div className="main-container">
        <div className="left-container">
          <div className="headline-container">
            <h1>{categoryData.name}</h1>
            <ul>
              {categoryData.news.map((news) => (
                <li key={news.id}>
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
