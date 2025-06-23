// 고객센터 페이지 JavaScript

// FAQ 카테고리 필터링
function initFaqCategories() {
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqCategories.forEach(category => {
        category.addEventListener('click', function() {
            // 모든 카테고리 비활성화
            faqCategories.forEach(cat => {
                cat.classList.remove('active');
            });
            
            // 클릭한 카테고리 활성화
            this.classList.add('active');
            
            // 카테고리 필터링
            const selectedCategory = this.getAttribute('data-category');
            
            faqItems.forEach(item => {
                if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 파일 업로드 처리
function initFileUpload() {
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const maxFiles = 3;
    let uploadedFiles = [];
    
    fileInput.addEventListener('change', function(e) {
        const files = e.target.files;
        
        if (uploadedFiles.length + files.length > maxFiles) {
            alert(`최대 ${maxFiles}개의 파일만 첨부 가능합니다.`);
            return;
        }
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // 파일 크기 체크 (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('파일 크기는 5MB를 초과할 수 없습니다.');
                continue;
            }
            
            uploadedFiles.push(file);
            
            // 파일 목록에 표시
            const fileItem = document.createElement('div');
            fileItem.className = 'file-list-item';
            fileItem.innerHTML = `
                <i class="fas fa-file"></i>
                <span>${file.name}</span>
                <span class="file-remove" data-name="${file.name}">
                    <i class="fas fa-times"></i>
                </span>
            `;
            fileList.appendChild(fileItem);
        }
        
        // 파일 입력 초기화
        fileInput.value = '';
        
        // 파일 삭제 이벤트 연결
        const removeButtons = document.querySelectorAll('.file-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const fileName = this.getAttribute('data-name');
                uploadedFiles = uploadedFiles.filter(file => file.name !== fileName);
                this.parentElement.remove();
            });
        });
    });
}

// 문의하기 폼 제출 처리
function initInquiryForm() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault(); // 폼 제출 기본 동작 방지
        
        // 폼 데이터 수집
        const formData = {
            type: document.getElementById('inquiryType').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // 실제 서버 연동 없이 콘솔에 출력
        console.log('문의 데이터:', formData);
        
        // 폼 제출 처리 함수 호출 (향후 구현)
        sendInquiry(formData);
        
        // 사용자에게 성공 메시지 표시
        alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
        
        // 폼 초기화
        this.reset();
    });
}

// 문의 데이터 전송 함수 (향후 서버 연동 시 구현)
function sendInquiry(data) {
    // 서버로 데이터 전송 로직
    // 예: fetch('/api/inquiry', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    
    console.log('문의 데이터가 전송되었습니다 (테스트):', data);
    return true; // 성공 여부 반환
}

// 문의 내역 로드 함수 (향후 서버 연동 시 구현)
function loadInquiries() {
    // 서버에서 문의 내역 로드 로직
    // 예: fetch('/api/inquiries')
    //     .then(response => response.json())
    //     .then(data => displayInquiries(data))
    
    console.log('문의 내역을 로드합니다 (테스트)');
    
    // 로그인 상태에 따라 표시 여부 결정
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        document.querySelector('.login-prompt').style.display = 'none';
        document.querySelector('.inquiry-table').style.display = 'table';
        // displayInquiries([]); // 빈 배열 전달 (테스트)
    } else {
        document.querySelector('.login-prompt').style.display = 'block';
        document.querySelector('.inquiry-table').style.display = 'none';
    }
}

// 문의 내역 표시 함수 (향후 서버 연동 시 구현)
function displayInquiries(inquiries) {
    const tableBody = document.querySelector('.inquiry-table tbody');
    
    // 테이블 내용 초기화
    tableBody.innerHTML = '';
    
    if (inquiries.length === 0) {
        // 문의 내역이 없는 경우
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 2rem;">
                문의 내역이 없습니다.
            </td>
        `;
        tableBody.appendChild(row);
    } else {
        // 문의 내역 표시
        inquiries.forEach(inquiry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${inquiry.date}</td>
                <td>${inquiry.type}</td>
                <td>${inquiry.subject}</td>
                <td>
                    <span class="inquiry-status status-${inquiry.status == 'answered' ? 'answered' : 'pending'}">
                        ${inquiry.status == 'answered' ? '답변완료' : '답변대기'}
                    </span>
                </td>
                <td>
                    <button class="view-btn" data-id="${inquiry.id}">보기</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // 문의 개수 업데이트
    document.querySelector('.history-count').textContent = `(${inquiries.length})`;
}

// FAQ 아이템 토글 기능
function initFaqToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
}

// 로그인 모달 관련 함수
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// 모달 초기화
function initModal() {
    const closeModal = document.querySelector('.close-modal');
    const modal = document.getElementById('loginModal');
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // 모달 외부 클릭 시 닫기
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // 로그인 폼 제출
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            console.log('로그인 시도:', email);
            
            // 여기에 로그인 처리 로직을 추가하세요 (향후 서버 연동)
            // 테스트를 위한 임시 로그인 처리
            alert('로그인 되었습니다.');
            localStorage.setItem('isLoggedIn', 'true');
            modal.style.display = 'none';
            
            // 로그인 후 페이지 새로고침 (UI 업데이트)
            location.reload();
        });
    }
}

// 페이지 초기화 함수
function initCustomerService() {
    // FAQ 카테고리 필터링 초기화
    initFaqCategories();
    
    // 파일 업로드 초기화
    initFileUpload();
    
    // 문의 폼 초기화
    initInquiryForm();
    
    // FAQ 토글 초기화
    initFaqToggle();
    
    // 모달 초기화
    initModal();
    
    // 문의 내역 로드
    loadInquiries();
}

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initCustomerService();
}); 