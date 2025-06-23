// HittoStore 메인 JavaScript 파일

document.addEventListener('DOMContentLoaded', function() {
  // 배너 슬라이더 기능
  initBannerSlider();
  
  // 카테고리 탭 기능
  initCategoryTabs();
  
  // 사이드바 토글 기능
  initSidebarToggle();
  
  // 스크롤 버튼 기능
  initScrollButtons();
  
  // 푸터 정보 박스 토글 기능
  // initFooterInfoToggle();
  
  // 카테고리별 베스트 상품 로드
  initCategoryProducts();
  
  // 메인 페이지 신상품 로드
  renderNewProducts();
  
  // 메인 페이지 베스트상품 로드
  renderBestProducts();
  
  // 로그인 상태 확인
  updateLoginStatus();
  
  // 위시리스트 버튼 이벤트 초기화 - 직접 호출
  console.log('위시리스트 버튼 초기화 시도 중...');
  if (typeof initWishlistButtons === 'function') {
    console.log('initWishlistButtons 함수 발견, 호출합니다.');
    initWishlistButtons();
  } else {
    console.error('initWishlistButtons 함수를 찾을 수 없습니다!');
  }
  
  // 상품 액션 버튼(찜, 장바구니) 초기화
  initProductActions();

  console.log('메인 페이지 초기화 완료');
});

// 배너 슬라이더 초기화 및 제어
function initBannerSlider() {
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;
  let slideInterval;
  
  // 슬라이드 표시 함수
  function showSlide(n) {
    // 현재 활성화된 슬라이드 숨기기
    slides[currentSlide].style.opacity = '0';
    dots[currentSlide].classList.remove('active');
    
    // 새 슬라이드 인덱스 설정
    currentSlide = (n + slides.length) % slides.length;
    
    // 새 슬라이드 표시
    slides[currentSlide].style.opacity = '1';
    dots[currentSlide].classList.add('active');
  }
  
  // 다음 슬라이드로 이동
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  // 이전 슬라이드로 이동
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  // 자동 슬라이드 시작
  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  // 자동 슬라이드 정지
  function stopSlideInterval() {
    clearInterval(slideInterval);
  }
  
  // 이벤트 리스너 추가
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
      stopSlideInterval();
      startSlideInterval();
    });
    
    nextBtn.addEventListener('click', function() {
      nextSlide();
      stopSlideInterval();
      startSlideInterval();
    });
  }
  
  // 도트 내비게이션 이벤트 리스너
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showSlide(index);
      stopSlideInterval();
      startSlideInterval();
    });
  });
  
  // 슬라이더에 마우스 올렸을 때 자동 슬라이드 정지
  const bannerSlider = document.querySelector('.banner-slider');
  if (bannerSlider) {
    bannerSlider.addEventListener('mouseenter', stopSlideInterval);
    bannerSlider.addEventListener('mouseleave', startSlideInterval);
  }
  
  // 초기 자동 슬라이드 시작
  startSlideInterval();
}

// 카테고리 탭 초기화 및 제어
function initCategoryTabs() {
  const tabButtons = document.querySelectorAll('#category-menu .tab-btn');
  const tabPrev = document.querySelector('.tab-prev');
  const tabNext = document.querySelector('.tab-next');
  const tabsContainer = document.querySelector('.tabs-container');
  
  // 탭 클릭 이벤트
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // 모든 탭에서 active 클래스 제거
      tabButtons.forEach(tab => tab.classList.remove('active'));
      
      // 클릭한 탭에 active 클래스 추가
      this.classList.add('active');
      
      // 해당 카테고리의 상품 로드
      const category = this.getAttribute('data-category');
      renderCategoryProducts(category);
    });
  });
  
  // 탭 스크롤 버튼 기능
  if (tabPrev && tabNext && tabsContainer) {
    tabPrev.addEventListener('click', function() {
      tabsContainer.scrollBy({ left: -200, behavior: 'smooth' });
    });
    
    tabNext.addEventListener('click', function() {
      tabsContainer.scrollBy({ left: 200, behavior: 'smooth' });
    });
  }
}

// 카테고리별 상품 초기화
function initCategoryProducts() {
  // 기본 카테고리(글러브/미트) 상품 로드
  renderCategoryProducts('glove');
}

// 페이지 경로에 따라 이미지 경로 조정 함수
function getFixedImagePath(path) {
  // 현재 페이지가 카테고리 페이지인지 확인
  const isCategory = window.location.href.indexOf('/category/') > -1;
  
  // 경로가 이미 상대 경로로 시작하면 그대로 사용
  if (path.startsWith('../')) {
    return path;
  }
  
  // 카테고리 페이지에서는 한 단계 더 상위 디렉토리를 참조
  if (isCategory) {
    return path.replace('/images/', '../images/');
  }
  
  return path;
}

// 카테고리별 상품 렌더링 함수
function renderCategoryProducts(category) {
  const productList = document.getElementById('product-list');
  if (!productList) return;
  
  // 상품 목록 비우기
  productList.innerHTML = '';
  
  // 카테고리 상품 가져오기
  const categoryProducts = products[category] || [];
  
  // 상품이 없는 경우
  if (categoryProducts.length === 0) {
    productList.innerHTML = '<p class="no-products">해당 카테고리에 상품이 없습니다.</p>';
    return;
  }
  
  // 최대 5개 상품만 렌더링
  const productsToShow = categoryProducts.slice(0, 5);
  
  // 상품 요소 생성 및 추가
  productsToShow.forEach(product => {
    // 배지 HTML 생성
    let badgesHTML = '';
    if (product.badges && product.badges.length > 0) {
      badgesHTML = '<div class="product-badges">';
      product.badges.forEach(badge => {
        badgesHTML += `<span class="badge ${badge.type}">${badge.text}</span>`;
      });
      badgesHTML += '</div>';
    }
    
    // 이미지 경로 수정
    const imagePath = getFixedImagePath(product.image);
    
    // 상품 아이템 요소 생성
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.setAttribute('data-id', product.id);
    productItem.innerHTML = `
      <div class="product-thumb">
        <img src="${imagePath}" alt="${product.title}">
        ${badgesHTML}
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">
          <span class="price-sale">${product.priceSale}원</span>
          <span class="price-normal">${product.priceNormal}원</span>
        </div>
        <div class="product-rating">
          <span class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </span>
          <span class="review-count">(32)</span>
        </div>
      </div>
    `;
    
    productList.appendChild(productItem);
  });
  
  // 상품 상세 페이지 링크 초기화
  if (typeof window.initProductDetailLinks === 'function') {
    window.initProductDetailLinks();
  }
}

// 사이드바 토글 기능
function initSidebarToggle() {
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebarWrapper = document.querySelector('.sidebar-wrapper');
  
  if (!sidebarToggleBtn) {
    console.error('사이드바 토글 버튼을 찾을 수 없습니다.');
    return;
  }

  if (!sidebarWrapper) {
    console.error('사이드바 래퍼를 찾을 수 없습니다.');
    return;
  }
  
  // 콘솔 로그 추가
  console.log('사이드바 토글 기능 초기화 중...');
  console.log('사이드바 토글 버튼:', sidebarToggleBtn);
  console.log('사이드바 래퍼:', sidebarWrapper);
  
  sidebarToggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('사이드바 토글 버튼 클릭됨');
    sidebarWrapper.classList.toggle('open');
    
    // 아이콘 회전 처리
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
  
  console.log('사이드바 토글 기능 초기화 완료');
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

// 로그인 모달 닫기 함수 (이미 HTML에 정의되어 있지만 여기에도 추가)
function closeLoginModal() {
  const loginModalOverlay = document.querySelector('.login-modal-overlay');
  if (loginModalOverlay) {
    loginModalOverlay.classList.remove('show');
    
    // 애니메이션 완료 후 모달 HTML 제거
    setTimeout(() => {
      const modalContainer = document.getElementById('modal-container');
      if (modalContainer) {
        modalContainer.innerHTML = '';
      }
    }, 300);
  }
}

function updateLoginStatus() {
  const loginLink = document.querySelector('.top-menu-right a:first-child');
  const myAccountLink = document.querySelector('.header-icons a[title="내 계정"]');

  const userId = window.sessionUserId;
  const userName = window.sessionUserName;
  const team = window.sessionTeam;

  if (userId && loginLink) {
    // ✅ 로그인 상태일 때
    loginLink.textContent = '로그아웃';
    loginLink.setAttribute('href', 'logout.jsp');

    // 사용자 이름 + 하트 표시
    const userLinks = document.querySelectorAll('.top-menu-right a');
		if (userLinks.length > 1 && userName) {
		  const heartColor = window.sessionHeartColor || "#d3d3d3";
		  userLinks[1].innerHTML = `${userName}님 <span style="color:${heartColor}">❤️</span>`;
		  userLinks[1].removeAttribute('href');
		}

    // 내 계정 링크 숨기기 또는 제거
    if (myAccountLink) {
      myAccountLink.style.display = 'none'; // 또는 removeAttribute('href')
    }

  } else if (loginLink) {
    // ❌ 로그아웃 상태일 때
    loginLink.textContent = '로그인';
    loginLink.setAttribute('onclick', 'openLoginModal(); return false;');

    if (myAccountLink) {
      myAccountLink.style.display = 'none';
    }
  }
}



// 로그아웃
function logout() {
  // 서버에 로그아웃 요청 → 세션 무효화
  window.location.href = 'logout.jsp';
}


// 푸터 정보 박스 토글 기능
// function initFooterInfoToggle() {
//   const toggleBtn = document.getElementById('footer-info-toggle');
//   const infoBoxes = document.querySelector('.footer-info-boxes');

//   if (!toggleBtn || !infoBoxes) return;

//   // 이벤트 리스너 중복 방지
//   toggleBtn.removeEventListener('click', toggleFooterInfo);

//   function toggleFooterInfo(e) {
//       e.preventDefault();
//       const isClosed = infoBoxes.classList.toggle('closed');
//       toggleBtn.classList.toggle('closed', isClosed);
      
//       // 로컬 스토리지에 상태 저장
//       if (isClosed) {
//           localStorage.setItem('footerInfoBoxesClosed', 'true');
//       } else {
//           localStorage.removeItem('footerInfoBoxesClosed');
//       }
//   }

//   toggleBtn.addEventListener('click', toggleFooterInfo);

//   // 페이지 로드 시 로컬 스토리지 상태 확인
//   if (localStorage.getItem('footerInfoBoxesClosed') === 'true') {
//       infoBoxes.classList.add('closed');
//       toggleBtn.classList.add('closed');
//   } else {
//     localStorage.removeItem('footerInfoBoxesClosed');
//   }
// }

// 카테고리별 상품 데이터
const products = {
  // 글러브/미트 상품 (5개)
  glove: [
    {
      id: 'g1',
      title: '모리모토 커브 스타일 내야 야구 글러브 11.75인치',
      image: './images/glove1.jpg',
      badges: [{type: 'discount', text: '41%'}, {type: 'hot', text: 'HOT'}],
      priceSale: '99,000',
      priceNormal: '169,000'
    },
    {
      id: 'g2',
      title: 'BMC TRD PRO 올라운드 야구 글러브 블랙/탄 K11',
      image: './images/glove2.jpg',
      badges: [{type: 'discount', text: '25%'}],
      priceSale: '179,000',
      priceNormal: '239,000'
    },
    {
      id: 'g3',
      title: '윌슨 A1500 내야 야구 3등급 글러브 11.75인치 레드',
      image: './images/glove3.jpg',
      badges: [{type: 'discount', text: '15%'}],
      priceSale: '289,000',
      priceNormal: '340,000'
    },
    {
      id: 'g4',
      title: '롤링스 MLB 어센틱 내야 글러브 HOH 올라운드모델',
      image: './images/glove4.jpg',
      badges: [{type: 'new', text: 'NEW'}],
      priceSale: '390,000',
      priceNormal: '490,000'
    },
    {
      id: 'g5',
      title: '윈에이티 포수 미트 야구 글러브 프리미엄 SGN등급',
      image: './images/glove5.jpg',
      badges: [{type: 'hot', text: 'BEST'}],
      priceSale: '340,000',
      priceNormal: '420,000'
    }
  ],
  
  // 배트 상품 (5개)
  bat: [
    {
      id: 'b1',
      title: '이스턴 고스트 X 알루미늄 배트 33/30',
      image: './images/bat1.jpg',
      badges: [{type: 'hot', text: '인기'}, {type: 'discount', text: '35%'}],
      priceSale: '260,000',
      priceNormal: '400,000'
    },
    {
      id: 'b2',
      title: '루이빌 메타 BBCOR 배트 33인치',
      image: './images/bat2.jpg',
      badges: [{type: 'new', text: 'NEW'}],
      priceSale: '450,000',
      priceNormal: '520,000'
    },
    {
      id: 'b3',
      title: '마루치 CAT9 BBCOR 배트 33/30 콤프 커넥트',
      image: './images/bat3.jpg',
      badges: [{type: 'discount', text: '22%'}],
      priceSale: '310,000',
      priceNormal: '398,000'
    },
    {
      id: 'b4',
      title: '윌슨 드마리니 비전 프로 배트 34인치',
      image: './images/bat4.jpg',
      badges: [{type: 'hot', text: 'BEST'}],
      priceSale: '390,000',
      priceNormal: '450,000'
    },
    {
      id: 'b5',
      title: '롤링스 5150 알로이 배트 USA 청소년용',
      image: './images/bat5.jpg',
      badges: [{type: 'discount', text: '18%'}],
      priceSale: '220,000',
      priceNormal: '268,000'
    }
  ],
  
  // 야구공 상품 (5개)
  ball: [
    {
      id: 'bl1',
      title: '공인구 12개 세트',
      image: './images/ball1.jpg',
      badges: [{type: 'new', text: 'NEW'}],
      priceSale: '48,000',
      priceNormal: '60,000'
    },
    {
      id: 'bl2',
      title: '연식 야구공 10개 세트',
      image: './images/ball2.jpg',
      badges: [{type: 'hot', text: '인기'}],
      priceSale: '35,000',
      priceNormal: '45,000'
    },
    {
      id: 'bl3',
      title: '프로 경기용 하드볼 3개 세트',
      image: './images/ball3.jpg',
      badges: [{type: 'discount', text: '15%'}],
      priceSale: '25,000',
      priceNormal: '30,000'
    },
    {
      id: 'bl4',
      title: '실내 연습용 소프트볼 6개 세트',
      image: './images/ball4.jpg',
      badges: [{type: 'discount', text: '20%'}],
      priceSale: '22,000',
      priceNormal: '28,000'
    },
    {
      id: 'bl5',
      title: '투수 그립연습 야구공 특수제작',
      image: './images/ball5.jpg',
      badges: [{type: 'new', text: 'NEW'}, {type: 'hot', text: 'HOT'}],
      priceSale: '39,000',
      priceNormal: '50,000'
    }
  ],
  
  // 의류/잠바 상품 (5개)
  clothing: [
    {
      id: 'c1',
      title: '프로팀 레플리카 유니폼',
      image: './images/clothing1.jpg',
      badges: [{type: 'discount', text: '25%'}],
      priceSale: '220,000',
      priceNormal: '295,000'
    },
    {
      id: 'c2',
      title: '야구 트레이닝 져지',
      image: './images/clothing2.jpg',
      badges: [{type: 'new', text: 'NEW'}],
      priceSale: '89,000',
      priceNormal: '120,000'
    },
    {
      id: 'c3',
      title: '프리미엄 야구 잠바',
      image: './images/clothing3.jpg',
      badges: [{type: 'hot', text: 'BEST'}],
      priceSale: '159,000',
      priceNormal: '210,000'
    },
    {
      id: 'c4',
      title: '경량 트레이닝 풀오버 재킷',
      image: './images/clothing4.jpg',
      badges: [{type: 'discount', text: '15%'}],
      priceSale: '110,000',
      priceNormal: '130,000'
    },
    {
      id: 'c5',
      title: '프로 스타일 야구 바지',
      image: './images/clothing5.jpg',
      badges: [{type: 'discount', text: '10%'}],
      priceSale: '76,000',
      priceNormal: '85,000'
    }
  ],
  
  // 신발/스파이크 상품 (5개)
  shoes: [
    {
      id: 's1',
      title: '프로 스파이크 신발',
      image: './images/shoes1.jpg',
      badges: [{type: 'hot', text: 'BEST'}],
      priceSale: '175,000',
      priceNormal: '210,000'
    },
    {
      id: 's2',
      title: '프리미엄 야구화',
      image: './images/shoes2.jpg',
      badges: [{type: 'discount', text: '30%'}],
      priceSale: '180,000',
      priceNormal: '260,000'
    },
    {
      id: 's3',
      title: '경량 인조잔디용 스파이크',
      image: './images/shoes3.jpg',
      badges: [{type: 'new', text: 'NEW'}],
      priceSale: '160,000',
      priceNormal: '185,000'
    },
    {
      id: 's4',
      title: '실내용 트레이닝화',
      image: './images/shoes4.jpg',
      badges: [{type: 'discount', text: '15%'}],
      priceSale: '120,000',
      priceNormal: '145,000'
    },
    {
      id: 's5',
      title: '하이엔드 금속 스파이크',
      image: './images/shoes5.jpg',
      badges: [{type: 'hot', text: '인기'}, {type: 'discount', text: '10%'}],
      priceSale: '230,000',
      priceNormal: '260,000'
    }
  ],
  
  // 장비용품 상품 (5개)
  equipment: [
    {
      id: 'e1',
      title: '포수 마스크 프로용',
      image: './images/equipment1.jpg',
      badges: [{type: 'new', text: 'NEW'}],
      priceSale: '140,000',
      priceNormal: '175,000'
    },
    {
      id: 'e2',
      title: '배팅 헬멧 양귀 프리미엄',
      image: './images/equipment2.jpg',
      badges: [{type: 'hot', text: 'HOT'}],
      priceSale: '98,000',
      priceNormal: '135,000'
    },
    {
      id: 'e3',
      title: '포수 프로텍터 세트',
      image: './images/equipment3.jpg',
      badges: [{type: 'discount', text: '20%'}],
      priceSale: '220,000',
      priceNormal: '280,000'
    },
    {
      id: 'e4',
      title: '심판용 장비 세트',
      image: './images/equipment4.jpg',
      badges: [{type: 'new', text: 'NEW'}],
      priceSale: '340,000',
      priceNormal: '420,000'
    },
    {
      id: 'e5',
      title: '타자 보호 팔꿈치 가드',
      image: './images/equipment5.jpg',
      badges: [{type: 'discount', text: '15%'}],
      priceSale: '40,000',
      priceNormal: '48,000'
    }
  ]
};

// 전역 products 객체 설정 (카테고리 페이지에서 접근할 수 있도록)
window.products = products;

// 신상품 데이터
const newProducts = [
  {
    id: 'new1',
    title: '공인구 12개 세트 신제품',
    image: './images/best10.jpg',
    badges: [{type: 'new', text: 'NEW'}, {type: 'hot', text: 'HOT'}],
    priceSale: '48,000',
    priceNormal: '60,000',
    category: 'ball'
  },
  {
    id: 'new2',
    title: '프로급 헬멧 신제품',
    image: './images/best11.jpg',
    badges: [{type: 'new', text: 'NEW'}, {type: 'hot', text: 'HOT'}],
    priceSale: '128,000',
    priceNormal: '160,000',
    category: 'equipment'
  },
  {
    id: 'new3',
    title: '프로 배팅 장갑 신제품',
    image: './images/best12.jpg',
    badges: [{type: 'new', text: 'NEW'}],
    priceSale: '89,000',
    priceNormal: '110,000',
    category: 'equipment'
  },
  {
    id: 'new4',
    title: '타자용 팔꿈치 보호대 신제품',
    image: './images/best13.jpg',
    badges: [{type: 'discount', text: '15%'}, {type: 'new', text: 'NEW'}],
    priceSale: '145,000',
    priceNormal: '170,000',
    category: 'equipment'
  },
  {
    id: 'new5',
    title: '초경량 배팅 헬멧 프리미엄 신제품',
    image: './images/best14.jpg',
    badges: [{type: 'new', text: 'NEW'}, {type: 'discount', text: '30%'}],
    priceSale: '112,000',
    priceNormal: '160,000',
    category: 'equipment'
  }
];

// 전역 newProducts 객체 설정
window.newProducts = newProducts;

// 상품 렌더링 함수 (홈페이지용)
function renderProducts(sectionId, productList, count = 4) {
  const container = document.getElementById(sectionId);
  if (!container) return;
  
  const productContainer = container.querySelector('.product-list');
  if (!productContainer) return;
  
  // 표시할 상품 수 제한
  const productsToShow = productList.slice(0, count);
  
  productContainer.innerHTML = '';
  
  productsToShow.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product-item';
    productElement.setAttribute('data-id', product.id); // data-id 속성 추가
    
    // 할인율 계산
    let discountRate = '';
    if (product.priceNormal) {
      const salePrice = parseInt(product.priceSale.replace(/[^\d]/g, ''));
      const normalPrice = parseInt(product.priceNormal.replace(/[^\d]/g, ''));
      const discountPercent = Math.round((normalPrice - salePrice) / normalPrice * 100);
      discountRate = `<span class="discount-rate">${discountPercent}%</span>`;
    }
    
    // 배지 HTML 생성
    let badgesHtml = '';
    if (product.badges && product.badges.length) {
      badgesHtml = '<div class="product-badges">';
      product.badges.forEach(badge => {
        badgesHtml += `<span class="badge ${badge.type}">${badge.text}</span>`;
      });
      badgesHtml += '</div>';
    }
    
    productElement.innerHTML = `
      <div class="product-thumb">
        <img src="${product.image}" alt="${product.title}">
        ${badgesHtml}
        <div class="product-actions">
          <button class="cart-btn" aria-label="장바구니에 추가" data-product-id="${product.id}">
            <i class="fas fa-shopping-cart"></i>
          </button>
          <button class="wishlist-btn" aria-label="위시리스트에 추가" data-product-id="${product.id}">
            <i class="far fa-heart"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">
          ${discountRate}
          <span class="price-sale">${product.priceSale}</span>
          ${product.priceNormal ? `<span class="price-normal">${product.priceNormal}</span>` : ''}
        </div>
      </div>
    `;
    
    productContainer.appendChild(productElement);
  });
  
  // 상품 상세 페이지 링크 초기화
  initProductDetailLinks();
}

// 신상품 렌더링 함수
function renderNewProducts() {
  const productList = document.getElementById('new-product-list');
  if (!productList) return;
  
  // 상품 목록 비우기
  productList.innerHTML = '';
  
  // 상품이 없는 경우
  if (newProducts.length === 0) {
    productList.innerHTML = '<p class="no-products">신상품이 없습니다.</p>';
    return;
  }
  
  // 신상품 렌더링
  newProducts.forEach(product => {
    // 배지 HTML 생성
    let badgesHTML = '';
    if (product.badges && product.badges.length > 0) {
      badgesHTML = '<div class="product-badges">';
      product.badges.forEach(badge => {
        badgesHTML += `<span class="badge ${badge.type}">${badge.text}</span>`;
      });
      badgesHTML += '</div>';
    }
    
    // 이미지 경로 수정 - 메인 페이지에서는 다른 경로 처리 필요
    let imagePath = product.image;
    if (imagePath.startsWith('../')) {
      // 메인 페이지에서는 상대경로를 수정
      imagePath = imagePath.replace('../', '');
    }
    
    // 상품 아이템 요소 생성
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.setAttribute('data-id', product.id);
    productItem.innerHTML = `
      <div class="product-thumb">
        <img src="${imagePath}" alt="${product.title}">
        ${badgesHTML}
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">
          <span class="price-sale">${product.priceSale}원</span>
          <span class="price-normal">${product.priceNormal}원</span>
          <span class="discount-rate">${getDiscountRate(product.priceNormal, product.priceSale)}%</span>
        </div>
        <div class="product-rating">
          <span class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </span>
          <span class="review-count">(${Math.floor(Math.random() * 50) + 10})</span>
        </div>
      </div>
    `;
    
    productList.appendChild(productItem);
  });
  
  // 상품 상세 페이지 링크 초기화
  if (typeof window.initProductDetailLinks === 'function') {
    window.initProductDetailLinks();
    console.log('신상품 섹션 상품 상세 페이지 링크 초기화 완료');
  }
}

// 할인율 계산 함수
function getDiscountRate(originalPrice, salePrice) {
  // 문자열에서 콤마 제거하고 숫자로 변환
  const original = parseInt(originalPrice.replace(/,/g, ''));
  const sale = parseInt(salePrice.replace(/,/g, ''));
  
  // 할인율 계산 및 반올림
  const discountRate = Math.round(((original - sale) / original) * 100);
  return discountRate;
}

/**
 * 모든 카테고리에서 베스트상품 추출
 * @returns {Array} - 베스트상품 배열
 */
function getAllBestProducts() {
  const bestProducts = [];
  
  // 베스트상품 페이지와 동일한 고정 상품 5개 추가
  const mainBestProducts = [
    {
      id: 'best1',
      title: '프로용 최고급 글러브',
      image: './images/best6.png',
      badges: [{type: 'new', text: 'NEW'}],
      priceSale: '55,000',
      priceNormal: '70,000',
      category: 'glove'
    },
    {
      id: 'best2',
      title: '알루미늄 베트 프리미엄',
      image: './images/best7.png',
      badges: [{type: 'new', text: 'NEW'}, {type: 'hot', text: 'HOT'}],
      priceSale: '98,000',
      priceNormal: '135,000',
      category: 'bat'
    },
    {
      id: 'best3',
      title: '프로팀 레플리카 유니폼',
      image: './images/best8.png',
      badges: [{type: 'discount', text: '25%'}],
      priceSale: '220,000',
      priceNormal: '295,000',
      category: 'clothing'
    },
    {
      id: 'best4',
      title: '프로 스파이크 신발',
      image: './images/best9.png',
      badges: [{type: 'hot', text: 'BEST'}],
      priceSale: '175,000',
      priceNormal: '210,000',
      category: 'shoes'
    },
    {
      id: 'best5',
      title: '프로페셔널 야구 장비 가방',
      image: './images/best15.jpg',
      badges: [{type: 'hot', text: '인기'}, {type: 'discount', text: '22%'}],
      priceSale: '78,000',
      priceNormal: '100,000',
      category: 'equipment'
    }
  ];
  
  // 고정 베스트 상품 추가
  mainBestProducts.forEach(product => {
    bestProducts.push(product);
  });
  
  return bestProducts;
}

// 메인 페이지 베스트상품 렌더링 함수
function renderBestProducts() {
  // 메인 페이지에서만 실행
  if (window.location.pathname.includes('index.jsp') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/HittoStore/')) {
    const bestProductsList = getAllBestProducts();
    const bestContainer = document.getElementById('best-products-container');
    
    if (!bestContainer) {
      console.error('베스트상품 컨테이너(#best-products-container)를 찾을 수 없습니다.');
      return;
    }
    
    console.log('베스트상품 렌더링 시작:', bestProductsList.length + '개 항목');
    
    // 기존 하드코딩된 상품 제거
    bestContainer.innerHTML = '';
    
    // 베스트상품 최대 5개만 표시
    const productsToShow = bestProductsList.slice(0, 5);
    
    // 베스트상품 렌더링
    productsToShow.forEach(product => {
      // 배지 HTML 생성
      let badgesHTML = '';
      if (product.badges && product.badges.length > 0) {
        badgesHTML = '<div class="product-badges">';
        product.badges.forEach(badge => {
          badgesHTML += `<span class="badge ${badge.type}">${badge.text}</span>`;
        });
        badgesHTML += '</div>';
      }
      
      // 이미지 경로 수정 - 메인 페이지 경로 조정
      let imagePath = product.image;
      if (imagePath.startsWith('../')) {
        imagePath = imagePath.replace('../', '');
      }
      
      // 할인율 계산
      const discountRate = getDiscountRate(product.priceNormal, product.priceSale);
      
      // 리뷰 수 생성 (랜덤)
      const reviewCount = Math.floor(Math.random() * 50) + 10;
      
      // 위시리스트 경로 설정
      const wishlistPath = getWishlistPath();
      
      // 상품 아이템 요소 생성
      const productItem = document.createElement('div');
      productItem.className = 'product-item';
      productItem.setAttribute('data-id', product.id);
      productItem.innerHTML = `
        <div class="product-thumb">
          <img src="${imagePath}" alt="${product.title}">
          ${badgesHTML}
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <div class="product-price">
            <span class="price-sale">${product.priceSale}원</span>
            <span class="price-normal">${product.priceNormal}원</span>
            <span class="discount-rate">${discountRate}%</span>
          </div>
          <div class="product-rating">
            <span class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </span>
            <span class="review-count">(${reviewCount})</span>
          </div>
        </div>
      `;
      
      bestContainer.appendChild(productItem);
    });
    
    // 상품 렌더링 완료 후 위시리스트 버튼 초기화
    console.log('베스트상품 렌더링 완료, 위시리스트 버튼 초기화');
    if (typeof window.initWishlistButtons === 'function') {
      window.initWishlistButtons();
    } else {
      console.warn('위시리스트 초기화 함수를 찾을 수 없습니다');
    }
    
    // 상품 상세 페이지 링크 초기화
    if (typeof window.initProductDetailLinks === 'function') {
      window.initProductDetailLinks();
      console.log('베스트상품 섹션 상품 상세 페이지 링크 초기화 완료');
    }
  }
}

// 로그인 모달 열기 함수
function openLoginModal() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) {
    console.error('모달 컨테이너가 존재하지 않습니다.');
    return;
  }

  let basePath = '';
  
  // 현재 페이지 경로에 따라 상대 경로 설정
  const path = window.location.pathname;
  if (path.includes('/category/') || 
      path.includes('/bestproduct/') || 
      path.includes('/newproduct/') || 
      path.includes('/orderDelivery/') || 
      path.includes('/customerService/') ||
      path.includes('/community/')) {
    basePath = '../';
  }

  // components/login-modal.html 불러오기
  fetch(basePath + 'components/login-modal.jsp')
    .then(response => {
      if (!response.ok) {
        throw new Error('모달을 불러오는데 실패했습니다.');
      }
      return response.text();
    })
    .then(html => {
      // 모달 HTML 삽입
      modalContainer.innerHTML = html;

      // CSS와 JS 경로 수정
      const cssLinks = modalContainer.querySelectorAll('link');
      cssLinks.forEach(link => {
        if (link.getAttribute('href') === 'components/login-modal.css') {
          link.setAttribute('href', basePath + 'components/login-modal.css');
        }
      });

      const scripts = modalContainer.querySelectorAll('script');
      scripts.forEach(script => {
        if (script.getAttribute('src') === 'components/login-modal.js') {
          script.setAttribute('src', basePath + 'components/login-modal.js');
        }
      });

      // 모달 표시
      const loginModalOverlay = document.querySelector('.login-modal-overlay');
      if (loginModalOverlay) {
        loginModalOverlay.classList.add('show');

        // 모달 내 스크립트 강제 실행
        const scripts = modalContainer.querySelectorAll('script');
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          Array.from(script.attributes).forEach(attr =>
            newScript.setAttribute(attr.name, attr.value)
          );
          newScript.textContent = script.textContent;
          script.parentNode.replaceChild(newScript, script);
        });

        // 닫기 버튼
        const closeModalBtn = document.getElementById('close-modal');
        if (closeModalBtn) {
          closeModalBtn.addEventListener('click', closeLoginModal);
        }

        // 바깥 클릭 시 닫기
        loginModalOverlay.addEventListener('click', function(e) {
          if (e.target === loginModalOverlay) {
            closeLoginModal();
          }
        });

        // ESC 닫기
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape' && loginModalOverlay.classList.contains('show')) {
            closeLoginModal();
          }
        });

        // ✅ [정상] 로그인 폼 이벤트 핸들러
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
          loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const userId = document.getElementById('user-id').value.trim();
            const password = document.getElementById('user-password').value.trim();

            if (!userId || !password) {
              const errorMsg = document.getElementById('login-error-message');
              if (errorMsg) {
                errorMsg.textContent = '아이디와 비밀번호를 모두 입력해주세요.';
                errorMsg.style.display = 'block';
              }
              return;
            }

            // ✅ 서버에 로그인 요청
            fetch('loginProc.jsp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `userId=${encodeURIComponent(userId)}&password=${encodeURIComponent(password)}`
            })
              .then(res => res.text())
              .then(result => {
                const trimmed = result.trim();
                console.log('로그인 응답:', trimmed);

                if (trimmed === 'success') {
                  alert('로그인 되었습니다.');
                  window.location.href = 'index.jsp';
                } else if (trimmed === 'wrong-password') {
                  alert('❌ 비밀번호가 틀렸습니다.');
                } else if (trimmed === 'not-found') {
                  alert('❌ 존재하지 않는 아이디입니다.');
                } else {
                  alert('❌ 로그인 중 오류가 발생했습니다.');
                }
              })
              .catch(error => {
                console.error('❌ 로그인 요청 실패:', error);
                alert('서버 연결에 실패했습니다.');
              });
          });
        }
      }
    })
    .catch(error => {
      console.error('모달 로딩 오류:', error);
      alert('로그인 모달을 불러오는데 실패했습니다.');
    });
}

document.addEventListener('DOMContentLoaded', function() {
  window.openLoginModal = openLoginModal;
  updateLoginStatus();
});


// 위시리스트 경로 설정
function getWishlistPath() {
  // 현재 페이지 경로에 따라 상대 경로 설정
  const path = window.location.pathname;
  if (path.includes('/category/') || 
      path.includes('/bestproduct/') || 
      path.includes('/newproduct/') || 
      path.includes('/orderDelivery/') || 
      path.includes('/customerService/') ||
      path.includes('/community/') ||
      path.includes('/mypage/')) {
    return '../wishlist/index.jsp';
  } else {
    // 메인 페이지이거나 다른 루트 경로의 페이지
    return 'wishlist/index.jsp';
  }
}

// 상품 액션 버튼(찜, 장바구니) 초기화
function initProductActions() {
  console.log('상품 액션 버튼 초기화 시작');
  
  // 로컬스토리지에서 위시리스트 상태 확인 함수 (백업용)
  function isProductInWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist.some(item => item.id === productId);
  }
  
  // 위시리스트/장바구니 초기화를 위시리스트 함수 사용으로 대체
  if (typeof window.initWishlistButtons === 'function') {
    console.log('wishlist-functions.js의 initWishlistButtons 함수 사용');
    window.initWishlistButtons();
  } else {
    console.error('wishlist-functions.js가 로드되지 않았습니다. 기본 액션 사용.');
    
    // 위시리스트 버튼 이벤트
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    console.log('위시리스트 버튼 개수:', wishlistBtns.length);
    
    wishlistBtns.forEach(btn => {
      // 상품 데이터 가져오기
      const productItem = btn.closest('.product-item');
      if (!productItem) return;
      
      const productId = productItem.getAttribute('data-id') || 'unknown';
      
      // 이미 위시리스트에 있는지 확인하고 아이콘 초기화
      if (isProductInWishlist(productId)) {
        const icon = btn.querySelector('i');
        if (icon) {
          icon.classList.remove('far');
          icon.classList.add('fas');
          icon.style.color = '#e74c3c';
          console.log(`상품 ID(${productId}) 위시리스트 상태: 추가됨`);
        }
      }
      
      btn.addEventListener('click', function(e) {
        e.preventDefault(); // 링크 이동 방지
        console.log('위시리스트 버튼 클릭됨');
        
        // 경고 메시지 표시
        console.warn('위시리스트 함수가 로드되지 않았습니다. 페이지 새로고침 필요');
        alert('위시리스트 기능이 초기화되지 않았습니다. 페이지를 새로고침해 주세요.');
      });
    });
    
    // 장바구니 버튼 이벤트도 구현 생략
  }
  
  console.log('상품 액션 버튼 초기화 완료');
}

// 알림 메시지 표시 함수 (wishlist-functions.js에 정의되지 않은 경우 대비)
function showNotification(message) {
  if (typeof window.showNotification === 'function') {
    window.showNotification(message);
    return;
  }
  
    // 로그인 모달 함수 전역으로 등록
  window.openLoginModal = openLoginModal;
  window.closeLoginModal = closeLoginModal;
  
  // wishlist-functions.js의 함수가 없는 경우 직접 알림 생성
  // 이미 있는 알림은 제거
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // 새 알림 생성
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // 스타일 적용
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';
  notification.style.backgroundColor = 'rgba(52, 152, 219, 0.9)';
  notification.style.color = 'white';
  notification.style.padding = '12px 24px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  notification.style.zIndex = '9999';
  notification.style.opacity = '0';
  notification.style.transition = 'opacity 0.3s ease';
  
  // 알림 표시 애니메이션
  setTimeout(() => {
    notification.style.opacity = '1';
  }, 10);
  
  // 3초 후 알림 사라짐
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}
  