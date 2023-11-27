import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../css/MyPage.css';
import { Link } from 'react-router-dom';

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
      const response = await fetch(`/api/users/delete/${user_id}`, {
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
    // 세션에서 사용자 아이디 가져오기
    const user_id = sessionStorage.getItem('user_id');

    // 로그인 상태이면서 사용자 아이디가 있는 경우에만 실행
    if (userData.isLoggedIn && user_id) {
      // 서버에서 사용자 정보 가져오기
      fetch(`/api/users/${user_id}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            console.log('Fetched user data:', data);

            // 직접 data를 사용하여 사용자 정보 업데이트
          setUserData({
            isLoggedIn: true,
            userInfo: {
              user_id: data.user_id,
              age: data.age,
              gender: data.gender,
              interests: data.interests || [],
              recentNews: data.recentNews || [],
            },
          });
          } else {
            console.error('사용자 정보가 비어있습니다.');
          }
        })
        .catch(error => {
          console.error('사용자 정보를 가져오는 중 오류 발생:', error);
        });

       // 사용자의 관심사 및 최근 본 뉴스 가져오기
       fetch(`/api/users/interests/${user_id}`)
       .then(response => response.json())
       .then(data => {
         if (data) {
           console.log('Fetched user interests:', data);
           setUserData(prevState => ({
             ...prevState,
             userInfo: {
               ...prevState.userInfo,
               interests: data || [],
             },
           }));
         } else {
           console.error('사용자의 관심사 정보가 비어있습니다.');
         }
       })
       .catch(error => {
         console.error('사용자의 관심사 정보를 가져오는 중 오류 발생:', error);
       });

     fetch(`/api/users/recent-news/${user_id}`)
       .then(response => response.json())
       .then(data => {
         if (data) {
           console.log('Fetched user recent news:', data);
           setUserData(prevState => ({
             ...prevState,
             userInfo: {
               ...prevState.userInfo,
               recentNews: data || [],
             },
           }));
         } else {
           console.error('사용자의 최근 본 뉴스 정보가 비어있습니다.');
         }
       })
       .catch(error => {
         console.error('사용자의 최근 본 뉴스 정보를 가져오는 중 오류 발생:', error);
       });
   }
 }, [userData.isLoggedIn]);

  const { user_id, age, gender, interests = [], recentNews = [] } = userData.userInfo;

  return (
    <div className="my-page-container">
      <h2 className="my-page-header">마이 페이지</h2>
      <div className="my-page-info">
      <p>아이디: {user_id}</p>
        <p>나이: {age}</p>
        <p>성별: {gender}</p>
        <p><br />
          관심사 <br />{interests.slice(0, 10).map((interest, index) => (
            <span key={index}>{`#${interest} `}</span>
          ))}
        </p>
        <p><br />
          최근 본 뉴스 <br />{recentNews.slice(0, 10).map((news, index) => (
             <span key={index}>
             <Link to={`/detail/${news.article_id}`}>
               {`${news.title} `}
             </Link>
             <br />
           </span>
          ))}
        </p>
      </div>
      <div className="my-page-buttons">
        <button onClick={handleWithdrawal}>회원 탈퇴</button>
      </div>

      {/* 회원 탈퇴 확인 모달 */}
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
