<br/>

<h2>프로젝트 개요</h2>

온라인 서비스에 필요한 추천 기능들이 점점 더 발전해가는 오늘날, 컨텐츠 추천에 핵심인 태그의 중요성과 효율적인 태깅의 필요성을 느꼈습니다.
사용자의 관심 분야를 명시하는 태그와, 뉴스 기사의 내용을 요약하는 태그를 매칭하여, 
사용자가 관심을 가질만한 기사를 추천하는 시스템을 개발하는 것이 이번 프로젝트의 목표입니다.
네이버 뉴스 기사를 Selenium과 Beautiful Soup으로 크롤링하여 기사 정보들을 정형화된 csv파일에 저장한 후, OpenAI의 GPT4.0 API를 활용하여 기사 내용에서 키워드를 추출하여 태그를 부여합니다.
사용자들이 기사를 읽으면 로그데이터에 활동 기록이 남고, 이를 분석하여 각 사용자의 흥미를 유발하는 기사를 추천함으로써 사용자들의 만족도를 높일 수 있습니다.



<h2>프로젝트 기능</h2>


<h3>뉴스 기사 데이터 크롤링</h3>

<h3>기사 내용 키워드 자동 추출(GPT API)</h3>

<h3>기사 추천 알고리즘 개발</h3>

<h3>로그인/로그아웃 기능</h3>

<h3>회원가입/ 회원탈퇴 기능</h3>

<h3>마이페이지</h3>

  － 사용자 정보 , 관심 태그 ,  최근 본 뉴스
  

<h3>메인페이지</h3>

  －헤드라인/관심 태그 별 뉴스 보기

  －오늘의 정보 보기(OpenWeather API)
  
  －검색 기능
  
  －기사 카테고리 선택 기능



<h3>디테일페이지 </h3>

  －기사 상세 내용 보기
  
  －추천/비추천 기능
  
  －뉴스 추천 기능
  
  －연령별/성별 차트
 
<br/>
<h2>프로젝트 사용 기술</h2>

  -데이터 크롤링 – Selenium, Beautiful Soup

  -DBMS - MySQL

  -API - GPT API, OpenWeather API

  -프론트엔드 - React, ChartJs

  -백엔드 - Spring Boot, MyBatis

  -테스트 환경 - JUnit

  -운영/배포 환경 - KT Cloud

  -협업 환경 - GitHub

  -개발 환경 - Visual Studio Code, IntelliJ IDEA, MySQL Workbench, Jupyter Notebook

<br/>

<h2>개발 타임라인</h2>

![image](https://github.com/user-attachments/assets/977f969a-6c0f-4497-81b3-53b52fef9452)
![image](https://github.com/user-attachments/assets/fb99be9e-971a-4689-9f5d-de7881a58aa1)


<h2>시스템 구성도</h2>

![image](https://github.com/user-attachments/assets/1244689b-d4e6-48b9-8c65-162c826d53d0)

<h2>기능 요구사항 정의서</h2>

![image](https://github.com/user-attachments/assets/7ffd9bbd-6d52-49bf-93bf-b16aca66f73b)

<h2>테스트 항목서</h2>

![image](https://github.com/user-attachments/assets/b424d5f4-2b5f-4155-85ea-09938b11058b)

<h2>최종 ERD</h2>

![news](https://github.com/user-attachments/assets/8d2950c7-36c8-4192-844f-d765136b0101)

<h2>수상</h2>

<img src="![KakaoTalk_20240717_171421223](https://github.com/user-attachments/assets/c93a3f60-0893-424d-ab9c-c8f75447c231)" width="400" height="800" />

<p>kt클라우드를 사용하여 배포까지 진행한 프로젝트입니다.</p>

<p>현재는 서버를 닫았습니다.</p>
