# EML Generator Project

CSV 데이터를 기반으로 EML(이메일) 파일을 생성하는 Node.js 프로젝트입니다.

## 프로젝트 실행 방법

### 1. Node.js 설치

- Node.js 18.20.5 버전 이상 설치 필요

### 2. 패키지 설치

```bash
npm install
```

### 3. 기본 변수 설정

`main.js` 파일의 다음 변수들을 프로젝트에 맞게 수정하세요.(아래는 예시입니다)

```javascript
// CSV 파일 경로
const CSV_PATH = "./dataset/eng_phishing_full_information.csv";

// 첨부파일 경로 배열
const ATTACHMENT_PATH_ARR = ["./dataset/test.sh"];

// 생성된 EML 파일 저장 디렉토리
const SAVE_DIR_PATH = "./dataset/new_eml";
```

### 4. 프로젝트 실행

```bash
node main.js
```

## CSV 파일 형식

CSV 파일은 다음 컬럼들을 포함해야 합니다:

- `To`: 받는 사람 이메일 (필수)
- `From`: 보내는 사람 이메일 (선택)
- `Subject`: 이메일 제목 (선택)
- `text`: 텍스트 내용 (선택)
- `html`: HTML 내용 (선택)
- `fileName`: 생성될 EML 파일명 (필수)
