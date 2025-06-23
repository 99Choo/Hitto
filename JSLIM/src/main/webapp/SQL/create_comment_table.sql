CREATE TABLE comment (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- 댓글 고유 ID
    post_id INT NOT NULL,                       -- 게시글 ID
    author VARCHAR(50) NOT NULL,                -- 유저 아이디
    writer_name VARCHAR(50) NOT NULL,           -- 작성자 이름
    content TEXT NOT NULL,                      -- 댓글 내용
    regdate DATETIME DEFAULT CURRENT_TIMESTAMP, -- 작성일
    parent_id INT DEFAULT NULL,                 -- 부모 댓글 ID (NULL이면 일반 댓글)

    FOREIGN KEY (parent_id) REFERENCES comment(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
