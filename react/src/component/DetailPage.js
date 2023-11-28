import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const DetailPage = () => {
  const { article_id } = useParams();
  const [news, setDetailNews] = useState({ articles: [], content: '' });
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);
  const [newreommend, setRecommend] = useState(0);
  const [headlines, setHeadlines] = useState([]);
  const [topRecommended, setTopRecommended] = useState([]);
  let NewData;
  const user_id = sessionStorage.getItem('user_id');

  useEffect(() => {
    const fetchData = async () => {
      await fetchDetailNews();
      await fetchArticleViews();
      await fetchHeadlines();
      await addLogData();
      await fetchTopRecommended(); 
    };
    
    const fetchTopRecommended = async () => {
      try {
        const response = await fetch(`/api/reading/getRecommendation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            article_id: article_id,
            user_id: user_id,
            category_id: news.articles[0].category_id,
            reporter_name: news.articles[0].reporter_name,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const topRecommendedData = await response.json();
        setTopRecommended(topRecommendedData);
    
        console.log('Top recommended data:', topRecommendedData);
      } catch (error) {
        console.error('Error fetching top recommended articles:', error.message);
      }
    };

    const fetchDetailNews = async (type) => {
      try {
        
        const response = await fetch(`/api/articles/detail/${article_id}`);
        const articles = await response.json();
        NewData = { ...news, articles };
        setDetailNews(NewData);
        // 추천 비추천
        const responselike = await fetch(`/api/reading/like/${article_id}`);
        const responsedislike = await fetch(`/api/reading/dislike/${article_id}`);
        const like = await responselike.json();
        setLikes(like);
        const dislike = await responsedislike.json();
        setDislikes(dislike);
        const recommendresponse = await fetch(`/api/reading/recommend?article_id=${article_id}&user_id=${user_id}`);
        const number = await recommendresponse.json();
        setRecommend(number);
      } catch (error) {
        console.error('Error fetching detail news:', error.message);
      }
    };

    const fetchArticleViews = async () => {
      try {
        const response = await fetch(`/api/reading/${article_id}/views`);
        const articleViews = await response.json();
        setViews(articleViews); // 조회수 업데이트
      } catch (error) {
        console.error('Error fetching article views:', error.message);
      }
    };

      //헤드라인
      const fetchHeadlines = async () => {
        try {
          const response = await fetch('/api/articles/headline'); 
          const headlinesData = await response.json();
          setHeadlines(headlinesData);
        } catch (error) {
          console.error('Error fetching headlines:', error.message);
        }
      };
  
    const addLogData = async () => {
      try {
        if (user_id) {
          // user_id가 존재할 때만 fetch 요청 수행
          await fetch(`/api/reading/${article_id}/read?user_id=${user_id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          await fetch(`/api/reading/updatekeyword?article_id=${article_id}&user_id=${user_id}`,{
            method:'POST',
          });


        } else {
          console.log('로그인 상태가 아닙니다.');
        }
      } catch (error) {
        console.error('Error adding log data:', error.message);
      }
    };
    fetchData();
  }, [article_id, user_id]);

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

      const responselike = await fetch(`/api/reading/like/${article_id}`);
      const responsedislike = await fetch(`/api/reading/dislike/${article_id}`);
      const like = await responselike.json();
      setLikes(like);
      const dislike = await responsedislike.json();
      setDislikes(dislike);

      setRecommend(newRecommendation);
    } catch (error) {
      console.error('좋아요 또는 싫어요 처리 중 오류 발생:', error);
    }
  };
  return (
    <div className="main-container">
      <div className="left-container">
        {news.articles &&
          news.articles.map((article) => (
            <div key={article.article_id}>
              <h1 id="title">{article.title}</h1>
              <small>{article.reporter_name}</small>
              <br />
              <small>{article.write_date}</small>
              <br />
              <small>조회수: {views}</small>
              <p>{article.content}</p>
              {/* 좋아요와 싫어요 버튼 */}
              <div className="standard">
  <button className="like" onClick={() => handleLikeDislike('like')}>
    <img
      src={likeImageUrl}
      alt="추천"
      style={{
        width: newreommend === 1 ? '50px' : '40px',
        height: newreommend === 1 ? '50px' : '40px',
      }}
    />
    <br />
    {likes}
  </button>
  <button className="dislike" onClick={() => handleLikeDislike('dislike')}>
    <img
      src={dislikeImageUrl}
      alt="비추천"
      style={{
        width: newreommend === 2 ? '50px' : '40px',
        height: newreommend === 2 ? '50px' : '40px',
      }}
    />
    <br />
    {dislikes}
  </button>
</div>

            </div>
          ))}
        <div className="interest-container">
        <h2>추천 뉴스</h2>
          {/* 슬라이더 */}
          <Slider {...sliderSettings}>
            {[...Array(5).keys()].map((index) => (
              <div key={index + 1} className="interest-grid">
                {/* 기존 매핑 로직 */}
                <div style={{ display: 'flex' }}>
                  {[...Array(3).keys()].map((articleIndex) => (
                    <div key={articleIndex + 1} style={{ margin: '10px' }} className="interest-item">
                      <h3> 기사 제목ㄹㅇㅎㄹ옿ㄹ옿ㄹ {articleIndex + 1}</h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="right-container">
      <h2>헤드라인 뉴스</h2>
            <ul>
              {headlines.map((headline) => (
                <li key={headline.id}>
                  <Link to={`/detail/${headline.article_id}`}>{headline.title}</Link>
                </li>
              ))}
            </ul>
      </div>

    </div>
  );
};

export default DetailPage;