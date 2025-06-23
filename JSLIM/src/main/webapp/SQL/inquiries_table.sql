CREATE TABLE inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY, -- 각 문의의 고유번호 (기본키, 자동 증가)
    
    user_id VARCHAR(100) NOT NULL,     -- 문의한 사용자 ID (로그인 사용자 기준)
    
    inquiry_type VARCHAR(50) NOT NULL, -- 문의 유형 (예: 배송, 환불, 상품 등)
    
    order_number VARCHAR(50),          -- 관련 주문 번호 (선택 사항)
    
    name VARCHAR(100) NOT NULL,        -- 문의자 이름
    
    email VARCHAR(100) NOT NULL,       -- 문의자 이메일 주소
    
    phone VARCHAR(50),                 -- 문의자 연락처 (선택 사항)
    
    subject VARCHAR(200) NOT NULL,     -- 문의 제목
    
    message TEXT NOT NULL,             -- 문의 본문 내용
    
    file1 VARCHAR(200),                -- 첨부파일 1 경로 (선택 사항)
    file2 VARCHAR(200),                -- 첨부파일 2 경로
    file3 VARCHAR(200),                -- 첨부파일 3 경로
    
    agree_personal TINYINT(1) DEFAULT 0,   -- 개인정보 처리 동의 여부 (0: 미동의, 1: 동의)
    
    receive_email TINYINT(1) DEFAULT 0,    -- 이메일 수신 동의 여부 (0: 미동의, 1: 동의)
    
    answer TEXT,                       -- 관리자 답변 내용 (있을 경우)
    
    is_answered TINYINT(1) DEFAULT 0,  -- 답변 여부 (0: 미답변, 1: 답변 완료)
    
    answered_at TIMESTAMP NULL DEFAULT NULL, -- 답변한 시각 (답변 시 자동 기록)
    
    status VARCHAR(20) DEFAULT 'active',     -- 문의 상태 (예: 'active', 'deleted', 'closed' 등)
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 문의 작성 시각 (자동 기록)
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 최근 수정 시각 (수정 시 자동 갱신)
                 ON UPDATE CURRENT_TIMESTAMP
);
