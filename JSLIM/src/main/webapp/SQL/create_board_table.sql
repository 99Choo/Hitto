

-- 📄 게시판 테이블 생성 SQL (board)
CREATE TABLE board (
  id INT(11) NOT NULL AUTO_INCREMENT,           -- 게시글 고유 ID (PK, 자동 증가)
  category VARCHAR(20) NOT NULL,                -- 게시글 분류 (예: 자유, 공지 등)
  title VARCHAR(100) NOT NULL,                  -- 제목
  content TEXT NOT NULL,                        -- 내용
  author VARCHAR(50) NOT NULL,                  -- 작성자 ID (user 테이블 참조 가능)
  regdate DATETIME DEFAULT CURRENT_TIMESTAMP,   -- 작성일 (기본값: 현재 시간)
  views INT(11) DEFAULT 0,                      -- 조회수 (기본값: 0)
  writer_name VARCHAR(50) NOT NULL,             -- 작성자 이름
  
  PRIMARY KEY (id)                              -- 기본키 설정
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;