import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../css/MyPage.css';
import { Link } from 'react-router-dom';
import { dataDomain } from "./common";

const MyPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    isLoggedIn: true,
    userInfo: {
      user_id: null,  // 사용자 아이디
      age: null,      // 사용자 나이
      gender: '',     // 사용자 성별
      interests: [],  // 사용자 관심사
      recentNews: [], // 사용자 최근 뉴스
    },
  });
  const [isWithdrawalModalOpen, setWithdrawalModalOpen] = useState(false);

  // 회원 탈퇴 버튼 클릭 시 모달 열기
  const handleWithdrawal = () => {
    setWithdrawalModalOpen(true);
  };

  // 회원 탈퇴 확인 버튼 클릭 시
  const handleConfirmWithdrawal = async () => {
    try {
      // Spring Boot 서버에 DELETE 요청 보내기
      const response = await fetch(`${dataDomain}/api/users/delete/${user_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // 응답 상태가 200-299 범위에 있는지 확인하여 성공 여부 판단
      if (response.ok) {
        // 로그인 상태와 사용자 정보 초기화
        setUserData({
          isLoggedIn: false,
          userInfo: {},
        });
  
        // 세션에서 사용자 아이디 삭제
        sessionStorage.removeItem('user_id');
  
        // 모달 닫기 및 페이지 리로드
        setWithdrawalModalOpen(false);
        navigate("/");
        window.location.reload();
      } else {
        console.error('사용자 삭제에 실패했습니다. 상태:', response.status);
      }
    } catch (error) {
      console.error('탈퇴 중 에러 발생:', error);
    }
  };

  // 모달 닫기 버튼 클릭 시
  const handleCloseModal = () => {
    setWithdrawalModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = sessionStorage.getItem('user_id');
  
        if (userData.isLoggedIn && user_id) {
          // Fetch user information
          const userInfoResponse = await fetch(`${dataDomain}/api/users/${user_id}`);
          const userInfoData = await userInfoResponse.json();
  
          // Fetch user interests
          const interestsResponse = await fetch(`${dataDomain}/api/users/interests/${user_id}`);
          const interestsData = await interestsResponse.json();
  
          // Fetch user recent news
          const recentNewsResponse = await fetch(`${dataDomain}/api/users/recent-news/${user_id}`);
          const recentNewsData = await recentNewsResponse.json();
  
          // Update state
          setUserData(prevState => ({
            ...prevState,
            userInfo: {
              ...prevState.userInfo,
              user_id: userInfoData.user_id,
              age: userInfoData.age,
              gender: userInfoData.gender,
              interests: interestsData || [],
              recentNews: recentNewsData || [],
            },
          }));
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };
  
    fetchData();
  }, [userData.isLoggedIn]);
  
  const { user_id, age, gender, interests = [], recentNews = [] } = userData.userInfo;
 // 성별 표시를 "여자" 또는 "남자"로 변환
 const genderLabel = gender === 'F' ? '여자' : gender === 'M' ? '남자' : '';

  return (
    <div className="my-page-container">
      <h2 className="my-page-header">마이 페이지</h2>
      <div className="my-page-info">
        <table>
          <tbody>
            <tr>
              <td>아이디</td>
              <td>{user_id}</td>
            </tr>
            <tr>
              <td>나이</td>
              <td>{age}</td>
            </tr>
            <tr>
              <td>성별</td>
              <td>{genderLabel}</td>
            </tr>
            <tr>
              <td>관심 태그</td>
              <td>
                {interests.slice(0, 10).map((interest, index) => (
                  <span key={index}>{`#${interest} `}</span>
                ))}
              </td>
            </tr>
            <tr>
              <td>최근 본 뉴스</td>
              <td>
                {recentNews.slice(0, 10).map((news, index) => (
                  <span key={index}>
                    <Link to={`/detail/${news.article_id}`}>
                      {`${news.title} `}
                    </Link>
                    <br />
                  </span>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-page-buttons">
        <button onClick={handleWithdrawal}>회원 탈퇴</button>
      </div>

      <Modal
        isOpen={isWithdrawalModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Withdrawal Confirmation"
        className="my-page-modal-content"
      >
        <h2>탈퇴하시겠습니까?</h2>
        <div className="my-page-modal-buttons">
          <button onClick={handleConfirmWithdrawal}>확인</button>
          <button onClick={handleCloseModal}>취소</button>
        </div>
      </Modal>
    </div>
  );
};

export default MyPage;
