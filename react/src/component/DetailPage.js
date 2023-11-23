import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DetailPage = () => {
  const { article_id } = useParams();
  const [news, setDetailNews] = useState({ articles: [], content: '' });
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const user_id = sessionStorage.getItem('user_id');

  useEffect(() => {
    const fetchDetailNews = async () => {
      try {
        const response = await fetch(`/api/articles/detail/${article_id}`);
        const articles = await response.json();
        setDetailNews({ ...news, articles });
      } catch (error) {
        console.error('Error fetching detail news:', error.message);
      }
    };

    fetchDetailNews();
  }, [article_id]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const likeImageUrl = process.env.PUBLIC_URL + '/img/like.png';
  const dislikeImageUrl = process.env.PUBLIC_URL + '/img/dislike.png';

  const handleLikeDislike = async (type) => {
    try {
      const response = await fetch(`/api/reading/recommend?article_id=${article_id}&user_id=${user_id}`);
      const number = await response.json();
  
      // Determine new recommendation value based on the button type
      let newRecommendation;
      if (type === 'like') {
        newRecommendation = number === 1 ? 0 : 1;
      } else if (type === 'dislike') {
        newRecommendation = number === 2 ? 0 : 2;
      }
  
      // Update recommendation on the backend
      const putResponse = await fetch(`/api/reading/recommend`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article_id: article_id,
          user_id: user_id,
          recommendation: newRecommendation,
        }),
      });
  
      const responselike = await fetch(`/api/reading/like`);
      const responsedislike = await fetch(`/api/reading/dislike`);

      console.log(newRecommendation);
    } catch (error) {
      console.error('좋아요 또는 싫어요 처리 중 오류 발생:', error);
    }
  };
  return (
    <div className="main-container">
      <div className="left-container">
        {news.articles && news.articles.map((article) => (
          <div key={article.article_id}>
            <h1 id="title">{article.title}</h1>
            <small>{article.reporter_name}</small>
            <br />
            <small>{article.write_date}</small>
            <br />
            <small>조회수: {article.views}</small>
            <p>{article.content}</p>
            {/* 좋아요와 싫어요 버튼 */}
            <div className="standard">
              <button className="like" onClick={() => handleLikeDislike('like')}>
                <img src={likeImageUrl} alt="추천" /><br />
              </button>
              <button className="dislike" onClick={() => handleLikeDislike('dislike')}>
                <img src={dislikeImageUrl} alt="비추천" /><br />
              </button>
            </div>
          </div>
        ))}
        <div className="interest-container">
          {/* 슬라이더 */}
          <Slider {...sliderSettings}>
            {[...Array(5).keys()].map((index) => (
              <div key={index + 1} className="interest-grid">
                {/* 기존 매핑 로직 */}
                <div style={{ display: 'flex' }}>
                  {[...Array(3).keys()].map((articleIndex) => (
                    <div key={articleIndex + 1} style={{ margin: '10px' }} className="interest-item">
                      <h3>추천 뉴스 {index + 1} - 기사 {articleIndex + 1}</h3>
                      <p>추천 뉴스 내용 {index + 1} - 기사 내용 {articleIndex + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="right-container">
        <h2>우측 헤드라인</h2>
        <ul style={{ padding: "0px" }}>
        </ul>
        {/* ... (우측 컨테이너 내용) */}
      </div>
    </div>
  );
};

export default DetailPage;
