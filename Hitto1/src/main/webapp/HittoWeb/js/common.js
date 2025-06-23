// 모든 페이지에서 공통으로 사용하는 기능

// 페이지 로드 시 즉시 사이드바 처리 (DOMContentLoaded 이벤트 전에 실행)
(function() {
  console.log('사이드바 초기화 시작 - 즉시 실행 함수');
  
  // DOMContentLoaded 이벤트에 리스너 추가
  window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료, 사이드바 초기화 중...');
    
    // 기존 사이드바 제거 (중복 방지)
    removeExistingSidebar();
    
    // 사이드바 HTML 삽입
    insertSidebar();
    
    // 사이드바 토글 기능 초기화 (약간의 지연 추가)
    setTimeout(function() {
      initSidebarToggle();
      initScrollButtons();
      
      // localStorage에서 사이드바 상태 확인 후 적용
      // 페이지 접속 시 자동으로 열리지 않도록 제거
      // const sidebarState = localStorage.getItem('sidebarState');
      // if (sidebarState === 'open') {
      //   openSidebar();
      // }
      
      console.log('사이드바 초기화 완료');
    }, 100);
  });
})();

// 기존 사이드바 및 토글 버튼 제거
function removeExistingSidebar() {
  const existingSidebar = document.querySelector('.sidebar-wrapper');
  const existingToggle = document.querySelector('.sidebar-toggle');
  
  if (existingSidebar) {
    existingSidebar.remove();
    console.log('기존 사이드바 제거됨');
  }
  
  if (existingToggle) {
    existingToggle.remove();
    console.log('기존 토글 버튼 제거됨');
  }
}

// 사이드바 HTML 동적 삽입 함수
function insertSidebar() {
  const path = window.location.pathname;

  // 고객센터 관련 페이지에서는 사이드바를 삽입하지 않음
  if (path.includes('/customerService/')) {
    console.log('고객센터 페이지에서는 사이드바를 삽입하지 않습니다.');
    return;
  }

  // 현재 경로에 따라 상대 경로 조정
  let basePath = '';
  
  // 경로에 따른 basePath 설정 개선
  if (path.includes('/category/') || 
      path.includes('/cart/') || 
      path.includes('/wishlist/') || 
      path.includes('/mypage/') ||
      path.includes('/community/') ||
      path.includes('/bestproduct/') ||
      path.includes('/newproduct/')) {
    basePath = '../';
  }
  
  console.log('현재 경로:', path);
  console.log('사용할 basePath:', basePath);
  
  // 사이드바 토글 버튼 HTML
  const sidebarToggleHTML = `
    <div class="sidebar-toggle">
      <button id="sidebar-toggle-btn" type="button" aria-label="사이드 메뉴 열기/닫기">
        <i class="fas fa-chevron-left"></i>
      </button>
    </div>
  `;
  
  // 사이드바 HTML
  const sidebarHTML = `
    <div class="sidebar-wrapper">
      <div class="sidebar-content">
        <div class="icon-list">
          <div class="icon-item">
            <a href="${basePath}cart/index.jsp" title="장바구니">
              <i class="fas fa-shopping-cart"></i>장바구니
            </a>
          </div>
          <div class="icon-item">
            <a href="${basePath}wishlist/index.jsp" title="위시리스트">
              <i class="fas fa-heart"></i>위시리스트
            </a>
          </div>
          <div class="icon-item">
            <a href="#" title="최근 본 상품">
              <i class="fas fa-history"></i>최근 본 상품
            </a>
          </div>
          <div class="icon-item">
            <a href="#" id="scroll-up" title="위로 스크롤">
              <i class="fas fa-chevron-up"></i>맨 위로
            </a>
          </div>
          <div class="icon-item">
            <a href="#" id="scroll-down" title="아래로 스크롤">
              <i class="fas fa-chevron-down"></i>맨 아래로
            </a>
          </div>
        </div>
        <div class="full-info">
          <div class="store-info">
            <div class="store-image">
              <img src="${basePath}images/logo.png" alt="HittoStore">
            </div>
            <h3>⚾HittoStore⚾</h3>
            <div class="info-nav">
              <a href="${basePath}orderDelivery/orderDelivery.jsp" class="info-btn">주문/배송</a>
              <a href="#" class="info-btn">카카오톡 상담</a>
              <a href="#" class="info-btn">1:1문의</a>
              <a href="#" onclick="openLoginModal(); return false;" class="info-btn">로그인</a>
              <a href="${basePath}signup/signup.jsp" class="info-btn">회원가입</a>
            </div>
          </div>
          <div class="customer-support">
            <h4>고객센터</h4>
            <p class="phone-number">010-6410-0391</p>
            <p class="working-hours">월 - 금 오후 01:00 - 05:00</p>
            <p class="working-hours">주말 및 공휴일 절대휴무~!</p>
          </div>
          <div class="account-info">
            <h4>계좌안내</h4>
            <p>카카오뱅크</p>
            <p class="account-number">3333184917999</p>
            <p class="account-holder">예금주: 권법진</p>
          </div>
          <div class="social-links">
            <a href="#"><i class="fas fa-comment"></i></a>
            <a href="#"><i class="fas fa-blog"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // body 태그 끝 부분에 사이드바와 토글 버튼 삽입
  document.body.insertAdjacentHTML('beforeend', sidebarToggleHTML);
  document.body.insertAdjacentHTML('beforeend', sidebarHTML);
  
  console.log('사이드바 HTML 삽입 완료');
}

// 사이드바 열기 함수
function openSidebar() {
  const sidebarWrapper = document.querySelector('.sidebar-wrapper');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  
  if (sidebarWrapper && sidebarToggleBtn) {
    sidebarWrapper.classList.add('open');
    
    // 아이콘 변경
    const icon = sidebarToggleBtn.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-chevron-left');
      icon.classList.add('fa-chevron-right');
    }
    
    // 상태 저장
    localStorage.setItem('sidebarState', 'open');
    console.log('사이드바 열림 상태로 저장됨');
  }
}

// 사이드바 닫기 함수
function closeSidebar() {
  const sidebarWrapper = document.querySelector('.sidebar-wrapper');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  
  if (sidebarWrapper && sidebarToggleBtn) {
    sidebarWrapper.classList.remove('open');
    
    // 아이콘 변경
    const icon = sidebarToggleBtn.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-chevron-right');
      icon.classList.add('fa-chevron-left');
    }
    
    // 상태 저장
    localStorage.setItem('sidebarState', 'closed');
    console.log('사이드바 닫힘 상태로 저장됨');
  }
}

// 사이드바 토글 기능 초기화
function initSidebarToggle() {
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebarWrapper = document.querySelector('.sidebar-wrapper');
  
  if (!sidebarToggleBtn || !sidebarWrapper) {
    console.error('사이드바 토글 버튼 또는 사이드바를 찾을 수 없습니다');
    return;
  }
  
  console.log('사이드바 토글 버튼 찾음:', sidebarToggleBtn);
  console.log('사이드바 요소 찾음:', sidebarWrapper);
  
  // 직접 이벤트 등록 (클릭 이벤트를 감지하기 위한 즉시 실행)
  sidebarToggleBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('사이드바 토글 버튼 클릭됨');
    
    // 토글 동작
    if (sidebarWrapper.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };
  
  // 사이드바 외부 클릭 시 닫기
  document.addEventListener('click', function(event) {
    const isClickInside = sidebarWrapper.contains(event.target) || 
                         sidebarToggleBtn.contains(event.target);
    
    if (!isClickInside && sidebarWrapper.classList.contains('open')) {
      closeSidebar();
    }
  });
  
  console.log('사이드바 토글 이벤트 등록 완료');
}

// 스크롤 버튼 기능 초기화
function initScrollButtons() {
  const scrollUpBtn = document.getElementById('scroll-up');
  const scrollDownBtn = document.getElementById('scroll-down');
  
  if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * 상품 상세 페이지로 이동하는 함수
 * 모든 상품 아이템에 클릭 이벤트를 추가합니다.
 */
function initProductDetailLinks() {
  // 모든 상품 아이템에 클릭 이벤트 추가
  const productItems = document.querySelectorAll('.product-item');
  
  productItems.forEach(item => {
    item.style.cursor = 'pointer'; // 커서 스타일 변경
    
    // 이미 클릭 이벤트가 있는지 확인 (중복 방지)
    const existingClickHandler = item.getAttribute('data-has-click-handler');
    
    if (!existingClickHandler) {
      item.setAttribute('data-has-click-handler', 'true');
      
      item.addEventListener('click', function(e) {
        // 장바구니, 위시리스트 버튼 클릭 시 이벤트 전파 중지
        if (e.target.closest('.product-actions') || 
            e.target.closest('.cart-btn') || 
            e.target.closest('.wishlist-btn')) {
          return;
        }
        
        const productId = this.getAttribute('data-id');
        if (productId) {
          window.location.href = `${getDetailPagePath()}?id=${productId}`;
        }
      });
    }
  });
}

/**
 * 현재 페이지에 따라 상세 페이지 경로 반환
 */
function getDetailPagePath() {
  const currentPath = window.location.pathname;
  
  // 현재 페이지 경로에 따라 상대 경로 계산
  if (currentPath.includes('/index.jsp') || currentPath.endsWith('/')) {
    return 'product/detail.jsp';
  } else if (currentPath.includes('/category/') || 
             currentPath.includes('/bestproduct/') || 
             currentPath.includes('/newproduct/')) {
    return '../product/detail.jsp';
  }
  
  // 기본값
  return '../product/detail.jsp';
}

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  // ... existing code ...
  
  // 상품 아이템 클릭 이벤트 초기화
  initProductDetailLinks();
});

/**
 * 모든 페이지에 사이드바 로드
 * 페이지 로드 시 사이드바 컴포넌트를 동적으로 추가하고 초기화합니다.
 */
function loadSidebar() {
  console.log('사이드바 로드 시작');
  
  // 이미 사이드바가 있는지 확인
  if (document.querySelector('.sidebar-wrapper')) {
    console.log('사이드바가 이미 존재합니다');
    // 사이드바가 이미 존재하면 토글 기능만 초기화
    if (typeof window.initSidebarToggle === 'function') {
      window.initSidebarToggle();
    }
    return;
  }
  
  // 현재 경로에 따른 상대 경로 설정
  const basePath = getBasePath();
  
  // 사이드바 컨테이너 생성
  const sidebarContainer = document.createElement('div');
  sidebarContainer.id = 'sidebar-container';
  
  // 사이드바 HTML 구조 생성
  const sidebarHTML = `
    <div class="sidebar-wrapper">
      <aside class="sidebar">
        <div class="sidebar-header">
          <h3>카테고리</h3>
          <button class="close-sidebar">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <nav class="sidebar-menu">
          <ul>
            <li><a href="${basePath}category/category.jsp?category=glove"><i class="fas fa-baseball-ball"></i> 글러브/미트</a></li>
            <li><a href="${basePath}category/category.jsp?category=bat"><i class="fas fa-baseball-bat"></i> 배트</a></li>
            <li><a href="${basePath}category/category.jsp?category=ball"><i class="fas fa-circle"></i> 야구공</a></li>
            <li><a href="${basePath}category/category.jsp?category=clothing"><i class="fas fa-tshirt"></i> 의류/잠바</a></li>
            <li><a href="${basePath}category/category.jsp?category=shoes"><i class="fas fa-shoe-prints"></i> 신발/스파이크</a></li>
            <li><a href="${basePath}category/category.jsp?category=equipment"><i class="fas fa-cog"></i> 장비용품</a></li>
          </ul>
        </nav>
        
        <div class="sidebar-section">
          <h4>고객센터</h4>
          <ul>
            <li><a href="${basePath}customer-service/faq.jsp"><i class="fas fa-question-circle"></i> FAQ</a></li>
            <li><a href="${basePath}customer-service/inquiry.jsp"><i class="fas fa-envelope"></i> 1:1 문의</a></li>
            <li><a href="${basePath}customer-service/notice.jsp"><i class="fas fa-bullhorn"></i> 공지사항</a></li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <h4>회원정보</h4>
          <ul>
            <li><a href="${basePath}mypage/mypage.jsp"><i class="fas fa-user"></i> 마이페이지</a></li>
            <li><a href="${basePath}orderDelivery/orderDelivery.jsp"><i class="fas fa-box"></i> 주문/배송조회</a></li>
            <li><a href="${basePath}wishlist/index.jsp"><i class="fas fa-heart"></i> 위시리스트</a></li>
          </ul>
        </div>
      </aside>
      
      <div class="sidebar-backdrop"></div>
    </div>
    
    <button id="sidebar-toggle-btn" class="sidebar-toggle">
      <i class="fas fa-chevron-left"></i>
    </button>
  `;
  
  // 사이드바 HTML 추가
  sidebarContainer.innerHTML = sidebarHTML;
  document.body.appendChild(sidebarContainer);
  
  // 사이드바 토글 버튼 이벤트
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebarWrapper = document.querySelector('.sidebar-wrapper');
  const closeBtn = document.querySelector('.close-sidebar');
  const backdrop = document.querySelector('.sidebar-backdrop');
  
  if (sidebarToggleBtn && sidebarWrapper) {
    // 토글 버튼 클릭 이벤트
    sidebarToggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      sidebarWrapper.classList.toggle('open');
      
      // 아이콘 회전
      const icon = this.querySelector('i');
      if (icon) {
        if (sidebarWrapper.classList.contains('open')) {
          icon.classList.remove('fa-chevron-left');
          icon.classList.add('fa-chevron-right');
        } else {
          icon.classList.remove('fa-chevron-right');
          icon.classList.add('fa-chevron-left');
        }
      }
    });
    
    // 닫기 버튼 이벤트
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        sidebarWrapper.classList.remove('open');
        
        // 아이콘 원래대로
        const icon = sidebarToggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-chevron-right');
          icon.classList.add('fa-chevron-left');
        }
      });
    }
    
    // 배경 클릭 시 닫기
    if (backdrop) {
      backdrop.addEventListener('click', function() {
        sidebarWrapper.classList.remove('open');
        
        // 아이콘 원래대로
        const icon = sidebarToggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-chevron-right');
          icon.classList.add('fa-chevron-left');
        }
      });
    }
    
    // 사이드바 외부 클릭 시 닫기
    document.addEventListener('click', function(event) {
      const isClickInside = sidebarWrapper.contains(event.target) || 
                          sidebarToggleBtn.contains(event.target);
      
      if (!isClickInside && sidebarWrapper.classList.contains('open')) {
        sidebarWrapper.classList.remove('open');
        
        // 아이콘 원래대로
        const icon = sidebarToggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-chevron-right');
          icon.classList.add('fa-chevron-left');
        }
      }
    });
  }
  
  console.log('사이드바 로드 완료');
}

/**
 * 현재 페이지 경로에 따른 기본 경로 반환
 * @returns {string} - 상대 경로 접두사
 */
function getBasePath() {
  const path = window.location.pathname;
  
  // 메인 페이지이거나 루트 디렉토리인 경우
  if (path.endsWith('/') || 
      path.endsWith('/index.jsp') || 
      path.endsWith('/HittoStore/') || 
      path.endsWith('/HittoStore/index.jsp')) {
    return '';
  }
  
  // 1단계 깊이의 디렉토리인 경우
  if ((path.match(/\//g) || []).length <= 2 && !path.includes('/HittoStore/')) {
    return '../';
  }
  
  // HittoStore 내 1단계 깊이의 디렉토리인 경우
  if (path.includes('/HittoStore/') && (path.match(/\//g) || []).length <= 3) {
    return '../';
  }
  
  // 2단계 이상 깊이의 디렉토리인 경우
  return '../../';
}

// 페이지 로드 완료 시 사이드바 로드
document.addEventListener('DOMContentLoaded', function() {
  // loadSidebar 함수가 이미 위에서 호출되었으므로 중복 호출 방지
  // loadSidebar();
});

// 전역 함수로 등록
window.loadSidebar = loadSidebar; 