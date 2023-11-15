import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    // 여기에 데이터 가져오는 로직을 추가하세요.
    const dummyNews = [
      { id: 1, title: '헤드라인 뉴스 1', content: '헤드라인 뉴스 내용 1', journalist: '기자 이름 1', date: '2023-11-15', views: 100 },
      { id: 2, title: '헤드라인 뉴스 2', content: '헤드라인 뉴스 내용 2', journalist: '기자 이름 2', date: '2023-11-16', views: 150 },
      { id: 3, title: '헤드라인 뉴스 3', content: '헤드라인 뉴스 내용 3', journalist: '기자 이름 3', date: '2023-11-17', views: 120 },
    ];

    const selectedNews = dummyNews.find((item) => item.id === parseInt(id));
    setNews(selectedNews);
  }, [id]);

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
        <h1 id="title">{news.title}</h1>
        <small>{news.journalist}</small>
        <br />
        <small>{news.date}</small>
        <br />
        <small>조회수: {news.views}</small>

        <p>{news.content}</p>
        {/* 좋아요와 싫어요 버튼 */}
        <div className="standard">
            <button className="like" onClick={() => setLikes(likes + 1)}><img src={likeImageUrl} alt="추천"/><br/>{likes}</button>
            <button className="dislike" onClick={() => setDislikes(dislikes + 1)}><img src={dislikeImageUrl} alt="비추천"/><br/>{dislikes}</button>
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
        <ul style={{padding:"0px"}}>
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
