import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import ChartComponent from './ChartComponent';
import { dataDomain } from "./common";



const DetailPage = () => {
  const { article_id } = useParams();
  const [news, setDetailNews] = useState({ articles: [], content: '' });
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);
  const [newreommend, setRecommend] = useState(0);
  const [headlines, setHeadlines] = useState([]);
  const [topRecommended, setTopRecommended] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  let NewData;
  const user_id = sessionStorage.getItem('user_id');
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchDetailNews();
      await fetchArticleViews();
      await fetchHeadlines();
      await addLogData();
      setTimeout(500);
      await fetchTopRecommended();
    };

    const fetchDetailNews = async (type) => {
      //기사의 기본적인 내용
      try {
        //데이터베이스에서 기사id에 맞는 기사를 가져옴
        const response = await fetch(`${dataDomain}/api/articles/detail/${article_id}`);
        const articles = await response.json();
        NewData = { ...news, articles };
        setDetailNews(NewData);

        //기사의 추천수를 가져옴
        const responselike = await fetch(`${dataDomain}/api/reading/like/${article_id}`);
        
        //기사의 비추천수를 가져옴
        const responsedislike = await fetch(`${dataDomain}/api/reading/dislike/${article_id}`);
        const like = await responselike.json();
        setLikes(like);
        const dislike = await responsedislike.json();
        setDislikes(dislike);
        //user가 해당 article에 추천,비추천,무응답 중 무었을 했는지 알 수 있음
        const recommendresponse = await fetch(`${dataDomain}/api/reading/recommend?article_id=${article_id}&user_id=${user_id}`);
        const number = await recommendresponse.json();
        setRecommend(number);
      } catch (error) {
        console.error('Error fetching detail news:', error.message);
      }
    };

    const fetchArticleViews = async () => {
      //기사의 조회수 확인
      try {
        const response = await fetch(`${dataDomain}/api/reading/${article_id}/views`);
        const articleViews = await response.json();
        setViews(articleViews); // 조회수 업데이트
      } catch (error) {
        console.error('Error fetching article views:', error.message);
      }
    };

    // 헤드라인
    const fetchHeadlines = async () => {
      //헤드라인 기사들의 목록을 가져옴

      try {
        const response = await fetch(`${dataDomain}/api/articles/headline`);
        const headlinesData = await response.json();
        setHeadlines(headlinesData);
      } catch (error) {
        console.error('Error fetching headlines:', error.message);
      }
    };

    const addLogData = async () => {
      //사용자의 활동로그를 로그데이터에 추가함
      try {
        if (user_id) {
          // user_id가 존재할 때만 fetch 요청 수행
          await fetch(`${dataDomain}/api/reading/${article_id}/read?user_id=${user_id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          await fetch(`${dataDomain}/api/reading/updatekeyword?article_id=${article_id}&user_id=${user_id}`, {
            method: 'POST',
          });
        } else {
          console.log('로그인 상태가 아닙니다.');
        }
      } catch (error) {
        console.error('Error adding log data:', error.message);
      }
    };

    fetchData();

    const fetchTopRecommended = async () => {
      //기사의 recommendedscore를 계산
      try {
        const r_score = await fetch(`${dataDomain}/api/reading/recommendedscore/${article_id}`);
        const response = await fetch(`${dataDomain}/api/reading/getRecommendation/${user_id}/${article_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const topRecommendedData = await response.json();
        setTopRecommended(topRecommendedData);
      } catch (error) {
        console.error('Error fetching top recommended articles:', error.message);
      }
    };
  }, [article_id, user_id]);

  useEffect(() => {
    const fetchChartData = async () => {
      //차트에 관련된 데이터 가져오기
      try {
        // 연령별 데이터 가져오기
        const ageResponse = await fetch(`${dataDomain}/api/reading/ageData?article_id=${article_id}`);
        const ageChartData = await ageResponse.json();
        setAgeData(ageChartData);
  
        // 성별 데이터 가져오기
        const genderResponse = await fetch(`${dataDomain}/api/reading/genderData?article_id=${article_id}`);
        const genderChartData = await genderResponse.json();
        setGenderData(genderChartData);
      } catch (error) {
        console.error('Error fetching chart data:', error.message);
      }
    };
    fetchChartData();
  }, [article_id]);
  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //추천 비추천 이미지 불러오기
  const likeImageUrl = process.env.PUBLIC_URL + '/img/like.png';
  const dislikeImageUrl = process.env.PUBLIC_URL + '/img/dislike.png';

  const handleLikeDislike = async (type) => {
    //로그에 대해 추천 비추천 무응답을 비교하여 각 반응에따라 이미지의 크기를 조절과 데이터베이스에 업데이트
    try {
      const response = await fetch(`${dataDomain}/api/reading/recommend?article_id=${article_id}&user_id=${user_id}`);
      const number = await response.json();
      // 버튼을 누르면 newRecommendation의 값이 바뀜 
      let newRecommendation;
      if (type === 'like') {
        newRecommendation = number === 1 ? 0 : 1;
      } else if (type === 'dislike') {
        newRecommendation = number === 2 ? 0 : 2;
      }

      // DB에 newRecommendation 저장 및 업데이트
      const putResponse = await fetch(`${dataDomain}/api/reading/recommend`, {
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
      //기사의 추천수와 비추천수 가져옴
      const responselike = await fetch(`${dataDomain}/api/reading/like/${article_id}`);
      const responsedislike = await fetch(`${dataDomain}/api/reading/dislike/${article_id}`);
      const like = await responselike.json();
      setLikes(like);
      const dislike = await responsedislike.json();
      setDislikes(dislike);

      setRecommend(newRecommendation);
    } catch (error) {
      console.error('추천 또는 비추천 처리 중 오류 발생:', error);
    }
  };

  //웹페이지
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
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index + 1} className="interest-grid">
                {/* 기존 매핑 로직 수정 */}
                <div style={{ display: 'flex' }}>
                  {Array.from({ length: 3 }).map((_, articleIndex) => {
                    const article = topRecommended[3 * index + articleIndex];
                    if (article) {
                      return (
                        <div key={articleIndex + 1} style={{ margin: '10px' }} className="interest-item">
                          <Link to={`/detail/${article.article_id}`}>{article.title}</Link>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
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
        <div className="chart-container">
        <h2>연령별 차트</h2>
        <ChartComponent
          data={{
            labels: ageData.map(item => item.age_group),
            values: ageData.map(item => item.count),
          }}
          chartType="bar"
        />
        <h2>성별 차트</h2>
        <ChartComponent
          data={{
            labels: genderData.map(item => item.gender),
            values: genderData.map(item => item.count),
          }}
          chartType="pie"
        />
      </div>
    </div>
    </div>
  );
};

export default DetailPage;
