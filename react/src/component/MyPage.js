import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../css/MyPage.css';

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
          // 필요한 경우 다른 헤더를 포함시킬 수 있습니다.
        },
        // 필요한 경우 요청 본문을 포함시킬 수 있습니다.
        // body: JSON.stringify({}),
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
        // 성공하지 않은 응답을 처리합니다. 예를 들어 오류 메시지를 표시할 수 있습니다.
        console.error('사용자 삭제에 실패했습니다. 상태:', response.status);
        // 이 오류 케이스를 적절하게 처리하도록 조치할 수 있습니다.
      }
    } catch (error) {
      console.error('탈퇴 중 에러 발생:', error);
      // fetch 중에 다른 오류가 발생할 경우를 처리합니다.
      // 이 오류 케이스를 적절하게 처리하도록 조치할 수 있습니다.
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

            // 가져온 데이터로 사용자 정보 업데이트
            const updatedUserInfo = {
              ...data,
              interests: data.interests || [], //아직 빈 배열
              recentNews: data.recentNews || [], //아직 빈 배열
            };

            setUserData({
              isLoggedIn: true,
              userInfo: updatedUserInfo,
            });
          } else {
            console.error('사용자 정보가 비어있습니다.');
          }
        })
        .catch(error => {
          console.error('사용자 정보를 가져오는 중 오류 발생:', error);
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
        <p>
          관심사: {interests.slice(0, 10).map((interest, index) => (
            <span key={index}>{`#${interest} `}</span>
          ))}
        </p>
        <p>최근 뉴스: {recentNews.slice(0, 10).join(', ')}</p>
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
