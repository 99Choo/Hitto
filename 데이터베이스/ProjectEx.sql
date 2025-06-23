USE backend;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(5) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    nickname VARCHAR(8) NOT NULL,
    password CHAR(255) NOT NULL,
    phone VARCHAR(13) NOT NULL,
    `ROLE` ENUM('user', 'admin') DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;

INSERT INTO users (user_name, email, nickname, password, phone)
VALUES ('hong', 'hong@naver.com', '홍홍', '123456', '01012345678');

UPDATE users
SET nickname = '홍홍홍'
WHERE user_name = 'hong';

DELETE FROM users
WHERE email= 'hong@naver.com';