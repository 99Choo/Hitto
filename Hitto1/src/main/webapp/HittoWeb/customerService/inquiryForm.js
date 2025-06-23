// inquiryForm.jsp 전용 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 문의하기 폼 제출 처리 초기화
    initInquiryFormSubmit();
});

// 문의하기 폼 제출 처리
function initInquiryFormSubmit() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    if(!inquiryForm) return;

    inquiryForm.addEventListener('submit', function(e) {
        // 폼 유효성 검사
        const privacyAgree = document.getElementById('privacy-agree');
        if (!privacyAgree.checked) {
            e.preventDefault(); // 폼 제출 중단
            alert('개인정보 수집에 동의하셔야 문의 접수가 가능합니다.');
            privacyAgree.focus();
            return;
        }

        // 폼 제출이 진행되면, 페이지가 이동되므로 별도의 성공 메시지는 서블릿 처리 후 응답 페이지에서 표시
        console.log('폼이 서버로 제출됩니다.');
    });
} 