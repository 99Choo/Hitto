// inquiryList.jsp 전용 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 케밥 메뉴(점 3개) 초기화
    initKebabMenus();
    
    // 문의내역 상세 보기/접기 기능 초기화
    initInquiryDetailToggle();

    // 삭제 링크에 확인창 기능 추가
    initDeleteConfirmation();
});

/**
 * 케밥 메뉴(점 3개)의 클릭 이벤트를 처리하는 함수
 */
function initKebabMenus() {
    const kebabBtns = document.querySelectorAll('.kebab-btn');

    kebabBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.stopPropagation(); // 이벤트가 부모로 전파되는 것을 막음
            const options = this.nextElementSibling;
            
            // 현재 메뉴를 제외한 다른 모든 메뉴를 닫음
            closeAllKebabMenus(options);
            
            // 현재 메뉴의 활성 상태를 토글
            options.classList.toggle('active');
        });
    });

    // 문서의 다른 곳을 클릭하면 모든 케밥 메뉴를 닫음
    document.addEventListener('click', function() {
        closeAllKebabMenus();
    });
}

/**
 * 모든 케밥 메뉴를 닫는 헬퍼 함수
 * @param {Element} exceptMenu - 닫지 않을 특정 메뉴 요소
 */
function closeAllKebabMenus(exceptMenu = null) {
    document.querySelectorAll('.kebab-options').forEach(options => {
        if (options !== exceptMenu) {
            options.classList.remove('active');
        }
    });
}

/**
 * 문의내역 상세 보기/접기 기능을 초기화하는 함수
 */
function initInquiryDetailToggle() {
    const detailBtns = document.querySelectorAll('.view-detail-btn');
    
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const detailRow = this.closest('tr').nextElementSibling;
            if (detailRow && detailRow.classList.contains('inquiry-detail-row')) {
                const isVisible = detailRow.style.display !== 'none';
                detailRow.style.display = isVisible ? 'none' : 'table-row';
                this.textContent = isVisible ? '보기' : '접기';
            }
        });
    });
}

/**
 * 삭제 링크 클릭 시 확인창을 띄우는 함수
 */
function initDeleteConfirmation() {
    const deleteLinks = document.querySelectorAll('.delete-link');

    deleteLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 기본 링크 동작 방지
            const userConfirmed = confirm('정말로 이 문의를 삭제하시겠습니까?');
            
            if (userConfirmed) {
                // 사용자가 '확인'을 누른 경우 (실제 삭제 로직은 여기에 구현)
                console.log('삭제가 확인되었습니다. 실제 삭제 로직을 실행합니다.');
                
                // 임시로 해당 행을 숨김 처리
                const rowToDelete = this.closest('tr');
                const detailRow = rowToDelete.nextElementSibling;
                rowToDelete.style.display = 'none';
                if(detailRow && detailRow.classList.contains('inquiry-detail-row')) {
                    detailRow.style.display = 'none';
                }

                alert('문의가 삭제되었습니다.');
            } else {
                // 사용자가 '취소'를 누른 경우
                console.log('삭제가 취소되었습니다.');
            }
        });
    });
} 