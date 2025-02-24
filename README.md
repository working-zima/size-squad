# 내게 꼭 맞는 사이즈, 기억이 아닌 기록으로 - Size Squad

[![일반 로그인](https://img.youtube.com/vi/tTPwqFwgkVY/0.jpg)](https://youtu.be/tTPwqFwgkVY)

<br/>

## 🔥 프로젝트 목표

Size Squad는 사용자가 자신의 의류 사이즈를 기록하고 언제 어디서나 쉽게 조회할 수 있도록 도와주는 서비스입니다.\
온라인 쇼핑에서 개인 맞춤형 사이즈 입력 도구가 부족한 문제를 해결하고, 반복적인 구매 실패를 줄이는 것을 목표로 합니다.

<br/>

## 📏 주요 기능

### 사이즈 기록

사용자가 착용한 옷의 사이즈를 저장하고 관리 가능

### 사이즈 조회

언제든지 자신의 사이즈를 쉽게 검색 및 확인

### 맞춤형 태그

의류 브랜드, 카테고리별로 사이즈를 정리 가능

<br/>

## 💽 프로젝트 설치 및 실행 방법

### 백엔드 서버 실행 (server 폴더)

📌 백엔드 서버 필수 환경

- Node.js 18+
- MongoDB (로컬 또는 클라우드 Atlas)
- dotenv 설정 필수

1. **백엔드 디렉토리로 이동**

   ```bash
   cd server
   ```

2. **백엔드 의존성 설치**

   ```bash
   npm install
   ```

3. **백엔드 환경 변수 설정 (.env 파일 생성)**

    ```plaintext
    #server 배포시 'production', 개발시 'development'
    NODE_ENV=''

    # 포트
    SERVER_PORT=로컬 포트 번호 입력

    # 몽고디비 URL
    MONGODB_URL='몽고디비 URL 입력'

    # jwt
    JWT_SECRET_KEY=""

    # 암호화 레벨
    SALT_ROUND=암호화 레벨 숫자 입력

    # 엑세스 토큰 유효기간
    ACCESS_EXPIRES_IN='유효 시간 입력'

    # 리프레쉬 토큰 유효기간
    REFRESH_EXPIRES_IN='유효 시간 입력'
    ```

4. **백엔드 서버 실행**

   ```bash
   # 개발 모드 실행 (nodemon 사용)
   npm run start:dev

   # 프로덕션 실행
   npm run start
   ```

  백엔드 서버는 <http://localhost:5000> 에서 실행됩니다.

### 프론트엔드 실행 (client 폴더)

1. 프론트엔드 디렉토리로 이동

   ```bash
   cd client
   ```

2. 프론트엔드 패키지 설치

   ```bash
   npm install
   ```

3. 환경 변수 설정 (.env 파일 생성)
.env 파일을 만들고 다음 값을 입력하세요.

    ```plaintext
    # emailjs service id
    REACT_APP_SERVICE_ID = ""

    # emailjs template id
    REACT_APP_TEMPLATE_ID = ""

    # emailjs Public Key
    REACT_APP_PUBLIC_KEY = ""

    # client 배포시 'production', 개발시 'development'
    REACT_APP_NODE_ENV = "development"

    # API Base URL
    API_BASE_URL = ''
    ```

4. 프로젝트 실행

    ```bash
    # 개발 모드 실행
    npm run start
    ```

  프론트엔드는 <http://localhost:8000> 에서 실행됩니다.

<br/>

## 📂 환경 변수 설명

### 🛠️ 기본 환경

- `NODE_ENV`: 애플리케이션 실행 환경 (development, production 등).
- `PORT`: 서버가 실행될 포트 번호.
- `REACT_APP_NODE_ENV`: 클라이언트 애플리케이션 실행 환경 (development, production).
- `REACT_APP_API_BASE_URL`: API 요청의 기본 URL.

### 🔐 토큰 및 보안

- `JWT_SECRET_KEY`: JWT 서명에 사용되는 비밀 키.
- `ACCESS_EXPIRES_IN`: 엑세스 토큰 유효 기간.
- `REFRESH_EXPIRES_IN`: 리프레시 토큰 유효 기간.
- `SALT_ROUND`: bcrypt 해싱 시 라운드 수.

### 📦 데이터베이스

- `MONGODB_URL`: MongoDB 데이터베이스 연결 문자열.

### 🌍 CORS 설정

- `CORS_ALLOWED_ORIGINS`: CORS 정책에 따라 허용할 도메인 목록.

### ✉️ 이메일 서비스 (EmailJS)

- `REACT_APP_SERVICE_ID`: EmailJS 서비스 ID.
- `REACT_APP_TEMPLATE_ID`: EmailJS 템플릿 ID.
- `REACT_APP_PUBLIC_KEY`: EmailJS API 호출을 위한 공개 키.

<br/>

## ⚙️ 사용 기술 스택

### 프론트엔드

![Next.js](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Styled-components](https://img.shields.io/badge/Styled--Components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white)
![useStore-ts](https://img.shields.io/badge/useStore--ts-52303d?style=flat-square&logo=zustand&logoColor=white)

### 백엔드 및 데이터 처리

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/bcrypt-FF6A00?style=flat-square&logo=bcrypt&logoColor=white)
