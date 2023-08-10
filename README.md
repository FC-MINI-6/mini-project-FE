# 온앤오프 (OnOff)

<p align='center'><img src="https://github.com/EungBug/eungbug.github.io/assets/108085046/5cb5fdb5-89b1-4a8d-9280-ad5b86f7b7ee"></p>


## 📋 프로젝트 소개

개발 기간 : 2023. 07. 24 ~ 2023. 08. 10 <br/>
배포 링크 : [온앤오프](https://on-n-off-mini.netlify.app/) <br/>
Github : [프론트엔드](https://github.com/FC-MINI-6/mini-project-FE), [백엔드](https://github.com/FC-MINI-6/MiniProject_BE)

## 👥 개발 팀원 및 역할

| <a href="https://github.com/wngkfla01"><img src="https://avatars.githubusercontent.com/u/64509945?v=4" width=200px alt="주하림" /></a> | <a href="https://github.com/HyunJunPark0"><img src="https://avatars.githubusercontent.com/u/122239514?v=4" width=200px alt="박현준" /></a> | <a href="https://github.com/EungBug"><img src="https://avatars.githubusercontent.com/u/108085046?v=4" width=200px alt="이은비" /></a> | 
| :----------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | 
|                                                 [주하림](https://github.com/wngkfla01)                                                  |                                                 [박현준](https://github.com/HyunJunPark0)                                                  |                                                 [이은비](https://github.com/EungBug)
|                                                          프로젝트 팀장<br /> 관리자 휴가/당직 관리 페이지<br /> 관리자 사원 관리 페이지<br /> Navigation 메뉴바                                                       |                                                        로그인 페이지<br /> 회원가입 페이지 <br /> 마이 페이지                                                       |                                                            초기 개발 세팅<br /> 일정 페이지<br /> 휴가 페이지<br /> 당직 페이지 <br />  엑셀 다운로드<br />  휴가/당직 처리 알림 기능

##  ⚒️ 기술 스택 및 개발 환경

### Development

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />
<img src="https://img.shields.io/badge/Sass-CC6699?style=flat&logo=Sass&logoColor=white" />
<img src="https://img.shields.io/badge/Ant Design-0170FE?style=flat&logo=antdesign&logoColor=white" />
<img src="https://img.shields.io/badge/StyledComponents-DB7093?style=flat&logo=styledcomponents&logoColor=white"/>
<img src="https://img.shields.io/badge/Zustand-133011?style=flat&logo=&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=white"/>
</p>

### Config

<p>
<img src="https://img.shields.io/badge/npm-CB3837?style=flat&logo=Npm&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white"/></a>
</p>

### Deployment

<img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white"/></a>

### Environment

<p>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/></a>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a>
</p>

### Cowork Tools
<p>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white" />
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white" />
<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white" />
<img src="https://img.shields.io/badge/Zoom-2D8CFF?style=flat&logo=Zoom&logoColor=white" />
</p>

## 📌 프로젝트 기능 소개

## API 설계

- custom hook을 통해 axios interceptor를 활용하여 AccessToken을 자동으로 Headers에 설정하도록 구현
- AccessToken 만료 시 interceptor를 통해 로그아웃 처리 및 로그인  페이지로 이동하도록 예외처리 구현

## 알림 기능

- firebase firestore 연동을 통해 관리자가 휴가 및 당직의 승인/반려 처리 시 알림 기능 추가
- 알림 읽음(선택) 시 알림 읽음 처리 및 처리 상태를 확인 하기 위한 페이지로 이동 구현

## 로그인 / 회원가입 Page

## 내 정보 Page

## 홈 - 일정 Page

- 캘린더를 통한 월별 사원들의 휴가/당직 일정 조회
- 사용자 선택 시 해당 사용자의 일정만 조회 가능
- 엑셀 다운로드 시 현재 캘린더로 조회하고 있는 일정을 엑셀 파일로 다운로드 
- 캘린더 헤더와 스타일 커스텀 (주말 색상 구분 등)

##  휴가/당직 신청 조회

### 휴가 Page

#### 휴가 조회
- 사용자의 휴가일수 조회 및 사용한 휴가일수 계산을 통한 휴가일수 현황 표시
- 사용자의 휴가 신청 내역을 테이블 형태로 조회
- 사용자의 휴가 사용 내역을 테이블 형태로 조회
- 테이블의 정렬 또는 필터 기능 추가
- 신청한 휴가 취소 기능
- 휴가 조회 실패 및 취소 실패 등 다양한 API 통신 에러 예외처리 추가

#### 휴가 신청
- 연차 / 오전 반차 / 오후 반차 타입 제공
- 휴가 일정 선택 시 주말 제외
- 휴가 타입에 따른 휴가 일정 유효성 검사 추가
- 신청가능한 휴가일수에 따른 유효성 검사 추가
- 휴가 신청 API 통신 에러 예외처리 추가

### 당직 Page
#### 당직 조회
- 사용자의 당직 신청 내역을 테이블 형태로 조회
- 사용자의 당직 기록 내역을 테이블 형태로 조회
- 테이블의 정렬 또는 필터 기능 추가
- 신청한 당직 취소 기능
- 당직 조회 실패 및 취소 실패 등 다양한 API 통신 에러 예외처리 추가

#### 당직 신청
- 당직 일정 선택 시 주말 제외
- 당직 신청 API 통신 에러 예외처리 추가

## 관리자

### 휴가/당직 관리 Page
#### 휴가/당직 신청현황 조회
- 모든 사용자의 휴가/당직 신청현황 테이블 형태로 조회
- '승인/반려'처리를 하지 않은 신청 내역을 가장 상단에 오도록 정렬 기능 추가
- 각 테이블 column별로 필터링 기능 추가
- Pagination기능 추가

#### 휴가/당직 승인/반려
- 모든 신청 내역을 '승인' 또는 '반려' 버튼으로 처리(상태값 변경)
- Popconfirm 메시지 기능을 추가해 실수로 클릭해 처리하는것 방지

### 사원 관리 Page
#### 사원 조회
- 모든 User정보를 테이블 형태로 조회
- 각 테이블 column별로 필터링 기능 추가
- Pagination기능 추가
- 이름 또는 이메일로 사원 검색 기능 추가

#### 사원 정보 수정
- 테이블에서 특정 사용자의 해당 row 클릭 시 Modal창으로 사용자의 상세 정보 표출
- 특정 정보(직급, 권한, 연락처) 수정 기능 추가
- 연락처 입력 Input 숫자만 입력 가능 및 자릿수 체킹 기능 추가

## 📂 프로젝트 구조

<details>
<summary>접기/펼치기</summary>

📦src  
 ┣ 📂apis  
 ┃ ┣ 📜axios.ts  
 ┃ ┗  📜index.ts  
 ┃ 
 ┣ 📂components  
 ┃ ┣ 📂admin  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📂calendar  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📂common  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📂dayoff  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📂duty  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📂login  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📂mypage  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📂signup  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┗ 📜index.ts  
 ┣ 📂constants  
 ┃ ┗ 📜index.ts  
 ┣ 📂hooks  
 ┃ ┗ 📜index.ts  
 ┣ 📂pages  
 ┃ ┣ 📜AdminEmployee.tsx  
 ┃ ┣ 📜AdminSchedule.tsx  
 ┃ ┣ 📜App.tsx  
 ┃ ┣ 📜DayOff.tsx  
 ┃ ┣ 📜Duty.tsx  
 ┃ ┣ 📜HomeCalendar.tsx  
 ┃ ┣ 📜Login.tsx  
 ┃ ┣ 📜MyPage.tsx  
 ┃ ┣ 📜SignUp.tsx  
 ┃ ┗ 📜index.ts  
 ┣ 📂stores   
 ┃ ┗ 📜index.ts  
 ┣ 📂types  
 ┃ ┣ 📂admin  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📂calendar  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📂common  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📂dayoff  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📂duty  
 ┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📜IUser.ts  
 ┃ ┗ 📜index.ts  
 ┣ 📂utils  
 ┃ ┗ 📜index.ts  
 ┣ 📜GlobalStyle.ts  
 ┣ 📜GlobalThemeConfig.ts  
 ┣ 📜firebase.ts  
 ┣ 📜main.tsx  
 ┗ 📜vite-env.d.ts

</details>

## 🖼️ 결과물

 로그인 페이지 | 회원가입 페이지 |
| ------------------ | -------------------- |
| ![로그인 페이지](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/5c5f2ba4-28a3-48bd-b594-958deeddeb0c)          | ![회원가입 페이지](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/5f527eed-59ae-4a11-bfb0-3dfd982bc0ff)            |

| 홈 페이지(일반) | 홈 페이지(관리자) |
| ----------------------------- | ------------------------------- |
| ![홈 페이지](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/ac89cbfe-6747-4b80-b641-cfad90d9208b)                     | ![홈 페이지 관리자](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/49dc7917-ce4c-4839-9375-972b08f0ec1c)                       |


| 알림 조회 | 일정 상세 조회 |
| ------------------- | --------------------- |
| ![image](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/9b5a1571-80b6-45bd-80e7-0a6904dcc271)           | ![image](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/6bb8a7d2-9995-4a92-a175-d6d1bc069225)             |


| 내 정보 페이지 | 비밀번호 변경 페이지 |
| ----------------------------- | ------------------------------- |
| ![내 정보 페이지 전화번호 변경](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/aa943c84-40bf-4856-b41c-8d8baef55e82)                     | ![내 정보 페이지 비밀번호변경](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/11f2d8dc-3638-4080-8e18-02cf28391ffb)                       |

| 휴가 페이지 | 휴가 등록 |
| ------------------- | --------------------- |
| ![image](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/b6894265-49c5-481f-9729-d473bfcc09fb)           | ![image](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/3b67b553-ee7e-4d64-b79b-6c592b278a91)             |

| 당직 페이지 | 당직 등록 |
| ------------------- | --------------------- |
| ![image](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/2b64967f-985e-4fff-99b9-e10a43691f9e)           | ![image](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/2fa9d165-3f20-41f3-b7c2-ba80c4264ef2)             
|

| 관리자 휴가/당직 관리 | 관리자 사원 관리 |
| ------------------- | --------------------- |
| ![휴가 관리 페이지](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/f463c9b0-9f5c-42d1-9b5a-9f5fdc6474d9)           | ![사원관리 페이지](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/6fc6e136-21eb-428e-9f73-2ef945213f66)             |

| 사원 정보 조회 및 수정 | 엑셀 다운로드 |
| ------------------- | --------------------- |
| ![사원관리 페이지 사원 세부 정보](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/ab0c2910-ebd3-489b-b97c-f3d56cd24391)           | ![액셀 다운](https://github.com/FC-MINI-6/mini-project-FE/assets/108085046/afd84702-4300-4faf-bc75-2561e293d0de)             |
