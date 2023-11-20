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
  let NewData ; 
  useEffect(() => {
    const fetchDetailNews = async () => {
      try {
        const response = await fetch(`/api/articles/detail/${article_id}`);
        const data = await response.json();
        NewData = { ...news , data } ;
        setDetailNews(NewData);
        console.log(NewData);
      } catch (error) {
        console.error('Error fetching detail news:', error.message);
      }
    };

    fetchDetailNews();
  }, [article_id]);

  if (!news) {
    return <div>Loading...</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 우측 상단 헤드라인 데이터
  const rightHeadlines = [
    { id: 1, title: '우측 헤드라인 1' },
    { id: 2, title: '우측 헤드라인 2' },
    { id: 3, title: '우측 헤드라인 3' },
    { id: 4, title: '우측 헤드라인 4' },
    { id: 5, title: '우측 헤드라인 5' },
  ];

  const likeImageUrl = process.env.PUBLIC_URL + '/img/like.png';
  const dislikeImageUrl = process.env.PUBLIC_URL + '/img/dislike.png';

  return (
    <div className="main-container">
      <div className="left-container">
        {news.articles && news.articles.map((article) => (
          <li key={article.id}>
            <h1 id="title">{article.data.title}</h1>
            <small>{article.journalist}</small>
            <br />
            <small>{article.data.date}</small>
            <br />
            <small>조회수: {article.views}</small>
            <p>{article.content}</p>
          </li>
        ))}
        {/* 좋아요와 싫어요 버튼 */}
        <div className="standard">
          <button className="like" onClick={() => setLikes(likes + 1)}>
            <img src={likeImageUrl} alt="추천" /><br />{likes}
          </button>
          <button className="dislike" onClick={() => setDislikes(dislikes + 1)}>
            <img src={dislikeImageUrl} alt="비추천" /><br />{dislikes}
          </button>
        </div>
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
          {rightHeadlines.map((headline) => (
            <p key={headline.id}>{headline.title}</p>
          ))}
        </ul>
        {/* ... (우측 컨테이너 내용) */}
      </div>
    </div>
  );
};

export default DetailPage;
