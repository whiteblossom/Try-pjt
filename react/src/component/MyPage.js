// MyPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../css/MyPage.css'; 

const MyPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    isLoggedIn: true,
    userInfo: {
      id: sessionStorage.getItem('user_id'),
      age: 25,
      gender: '남성',
      interests: ['프로그래밍', '기술', '스포츠', '음악', '영화', '책', '여행', '음식', '미술', '과학'],
      recentNews: [
        '뉴스 1',
        '뉴스 2',
        '뉴스 3',
        '뉴스 4',
        '뉴스 5',
        '뉴스 6',
        '뉴스 7',
        '뉴스 8',
        '뉴스 9',
        '뉴스 10',
      ],
    },
  });
  const [isWithdrawalModalOpen, setWithdrawalModalOpen] = useState(false);

  const handleWithdrawal = () => {
    setWithdrawalModalOpen(true);
  };

  const handleConfirmWithdrawal = () => {
    setUserData({
      isLoggedIn: false,
      userInfo: {},
    });
    setWithdrawalModalOpen(false);
  };

  const handleCloseModal = () => {
    setWithdrawalModalOpen(false);
  };

  if (!userData.isLoggedIn) {
    navigate('/login');
    return null;
  }


  const { id: user_id, age, gender, interests, recentNews } = userData.userInfo;

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

      {/* 회원탈퇴 확인 모달 */}
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
