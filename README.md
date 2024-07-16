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

<h2>시스템 구성도</h2>
[https://github.com/whiteblossom/Try-pjt/issues/1#issue-2410921957](https://private-user-images.githubusercontent.com/39724731/349067515-1bdeb0ea-d61d-455d-8887-92d461536505.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjExMzA4MDUsIm5iZiI6MTcyMTEzMDUwNSwicGF0aCI6Ii8zOTcyNDczMS8zNDkwNjc1MTUtMWJkZWIwZWEtZDYxZC00NTVkLTg4ODctOTJkNDYxNTM2NTA1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA3MTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzE2VDExNDgyNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWJhYWI0ZmM1YmQxZjU2NGI0ODk1ZWMwZjAwNDBiMjZhOTc3NmQzMTFkOGNiY2ZlN2ZmZmI2OGFhNTRhMTg3OTImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.n9Go3vRa5gXNhj9uo9OXPiCK4DHLOi3Cu0s5amQT5ds)
<p>kt클라우드를 사용하여 배포까지 진행한 프로젝트입니다.</p>

<p>현재는 서버를 닫았습니다.</p>
