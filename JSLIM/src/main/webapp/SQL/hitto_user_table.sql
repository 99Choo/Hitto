-- 회원 테이블 생성
CREATE TABLE hitto (
    id INT AUTO_INCREMENT PRIMARY KEY,               -- 고유 회원 번호 (자동 증가)
    username VARCHAR(50) NOT NULL,                   -- 사용자 이름 (표시용 이름)
    userid VARCHAR(50) NOT NULL UNIQUE,              -- 아이디 (로그인 시 사용, 중복 불가)
    password VARCHAR(100) NOT NULL,                  -- 비밀번호 (암호화 고려해 길이 충분히 확보)
    birth DATE NOT NULL,                             -- 생년월일
    phone VARCHAR(20) NOT NULL,                      -- 휴대폰 번호 (형식 제한 없음)
    team VARCHAR(50),                                -- 선호 구단 (선택사항)
    email VARCHAR(100),                              -- 이메일 (선택사항)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- 가입일시 (자동 기록)
);

-- 한글 깨짐 방지: 특정 문자셋 설정 (username, team만 별도로 설정)
ALTER TABLE hitto 
  MODIFY username VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  MODIFY team VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
