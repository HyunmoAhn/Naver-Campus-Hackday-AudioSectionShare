# Naver Campus HackDay
`HackDay 기간: 2017.11.23 ~ 2017.11.24`

**현재 저장소는 hackday당시 작업한 코드를 fork하여 public으로 공개 후 리펙토링한 저장소입니다.**

**`client`폴더의 코드는 본인이 모두 작성한 코드입니다.**

## Audio Section Share
- 실행 방법
```
git clone https://github.com/HyunmoAhn/Naver-Campus-Hackday-AudioSectionShare.git
cd client
yarn && yarn start
```
mock-server(json-server)실행
```
cd client
yarn server
```

test 커버리지 확인
```
cd client
yarn test:coverage && yarn coverage
```


- 기술 스택
    - React(v15)
    - Redux
    - React-router(v3)
    - Redux-thunk

- branch
    - `master`: hackday이후 클라이언트부분에 테스트코드작성, mock-api등 리펙토링작업을 완료한 코드
    - `hackday/project-end`: hackday 완료시점까지 작업한 코드


# 프로젝트 내용

## 제목 : 오디오 구간 공유

### 주제 선정 배경
오디오클립, 팟빵과 같은 오디오 콘텐츠는 재생 시간이 길어서 콘텐츠를 함께 공감하거나 공유하는데 어려움이 있음
오디오의 내가 좋아하는 구간, 중요한 구간만 공유하여 페이스북 같은 소셜 서비스에서 쉽게 소비 하는게 목적임
어학 학습시 구간 반복 감상을 구간 공유하기로도 활용 할 수 있음

### 요구사항(필수)
- 웹 환경에서의 오디오 재생 기능 (웹 표준 재생 구현)
- 오디오파일의 특정 구간을 선택 및 재생 할 수 있는 기능 구현
- SNS 공유하기 기능 개발
- 공유된 구간만 재생

### 요구사항(선택)
쉽게 공유 및 구간 재생 할 수 있는 UX

### 개발언어
- JavaScript, HTML5
- 웹 개발 기술

### 플랫폼
웹

### 멘토
- 이소라님

### 멘티
- 1팀
    - 박정현님
    - 배현수님
- **2팀**
    - **안현모님**
    - **이현호님**


