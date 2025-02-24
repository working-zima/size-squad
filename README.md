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
