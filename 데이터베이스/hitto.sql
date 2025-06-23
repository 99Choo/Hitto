CREATE TABLE hitto (
    id INT AUTO_INCREMENT PRIMARY KEY,             -- 고유 회원 번호 (자동 증가)
    username VARCHAR(50) NOT NULL,                   -- 사용자 이름
    userid VARCHAR(50) NOT NULL UNIQUE,            -- 아이디 (로그인용)
    password VARCHAR(100) NOT NULL,                -- 비밀번호 (암호화 안했을 경우 길이 넉넉히)
    birth DATE NOT NULL,                           -- 생년월일
    phone VARCHAR(20) NOT NULL,                    -- 휴대폰 번호 (010-1234-5678 형식)
    team VARCHAR(50),                              -- 좋아하는 야구 구단
    email VARCHAR(100),                            -- 이메일 주소 (선택사항)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 가입일시 자동 기록
);

-- 컬럼 문자셋을 한글 깨짐 방지용으로 utf8mb4로 변경
ALTER TABLE hitto 
  MODIFY username VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  MODIFY team VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;