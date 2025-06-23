/**
 * 카테고리 페이지 JavaScript
 */

// 메인 페이지의 products 객체를 사용함
// 카테고리별 상품 데이터는 ../js/main.js에 정의되어 있음

// 카테고리 타입에 따른 제목 매핑
const categoryTitles = {
  glove: '글러브/미트',
  bat: '배트',
  ball: '야구공',
  clothing: '의류/잠바',
  shoes: '신발/스파이크',
  equipment: '장비용품'
};

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', () => {
  // 디버깅: window.products 확인
  console.log('[카테고리] 페이지 로드 후 window.products 확인:', window.products);
  
  // main.js 로드 여부 확인
  console.log('[카테고리] main.js 로드 여부:', typeof window.products !== 'undefined' ? '로드됨' : '로드되지 않음');
  
  // URL에서 카테고리 타입 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const categoryType = urlParams.get('type') || 'glove'; // 기본값은 글러브/미트
  
  // 카테고리 제목 설정
  const categoryTitle = document.getElementById('category-title');
  categoryTitle.textContent = categoryTitles[categoryType] || '전체 상품';
  
  // 상품 로드 (약간의 지연 추가)
  setTimeout(() => {
    console.log('[카테고리] 지연 후 window.products 확인:', window.products);
    loadProducts(categoryType);
  }, 100);
  
  // 정렬 옵션 변경 이벤트
  const sortOptions = document.getElementById('sort-options');
  sortOptions.addEventListener('change', () => {
    loadProducts(categoryType, sortOptions.value);
  });
  
  // 뷰 모드 변경 이벤트
  const gridViewBtn = document.querySelector('.grid-view');
  const listViewBtn = document.querySelector('.list-view');
  const productList = document.querySelector('.product-list');
  
  gridViewBtn.addEventListener('click', () => {
    productList.classList.remove('list-view');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
  });
  
  listViewBtn.addEventListener('click', () => {
    productList.classList.add('list-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
  });
});

/**
 * 상품 로드 함수
 * @param {string} categoryType - 카테고리 타입
 * @param {string} sortBy - 정렬 옵션
 */
function loadProducts(categoryType, sortBy = 'popular') {
  // products 객체가 없는 경우 처리
  if (typeof window.products === 'undefined' || !window.products) {
    console.error('[카테고리] window.products가 정의되지 않았습니다. main.js가 먼저 로드되었는지 확인하세요.');
    
    // 임시 데이터 생성
    window.products = {
      glove: [
        {
          id: 'g1',
          title: '모리모토 커브 스타일 내야 야구 글러브 11.75인치',
          image: '../images/glove1.jpg',
          badges: [{type: 'discount', text: '41%'}, {type: 'hot', text: 'HOT'}],
          priceSale: '99,000',
          priceNormal: '169,000'
        }
      ],
      bat: [],
      ball: [],
      clothing: [],
      shoes: [],
      equipment: []
    };
  }
  
  // 카테고리 상품 데이터
  const categoryProducts = window.products[categoryType] || [];
  console.log(`[카테고리] ${categoryType} 상품 데이터:`, categoryProducts);
  
  // 상품 정렬
  let sortedProducts = [...categoryProducts];
  
  // 카테고리 상품이 없을 경우 빈 배열 처리
  if (!sortedProducts || sortedProducts.length === 0) {
    console.warn(`[카테고리] ${categoryType}에 해당하는 상품이 없습니다.`);
    renderCategoryProducts(categoryType); // 빈 컨테이너로 렌더링
    return;
  }
  
  // 정렬 처리
  switch(sortBy) {
    case 'newest':
      // 신상품 우선 정렬 (new 배지가 있는 상품)
      sortedProducts = sortedProducts.sort((a, b) => {
        const aIsNew = a.badges && a.badges.some(badge => badge.text === 'NEW') ? 1 : 0;
        const bIsNew = b.badges && b.badges.some(badge => badge.text === 'NEW') ? 1 : 0;
        return bIsNew - aIsNew;
      });
      break;
    case 'price-low':
      sortedProducts = sortedProducts.sort((a, b) => {
        // 문자열 형태의 가격을 숫자로 변환
        const aPrice = parseInt(a.priceSale.replace(/,/g, ''));
        const bPrice = parseInt(b.priceSale.replace(/,/g, ''));
        return aPrice - bPrice;
      });
      break;
    case 'price-high':
      sortedProducts = sortedProducts.sort((a, b) => {
        // 문자열 형태의 가격을 숫자로 변환
        const aPrice = parseInt(a.priceSale.replace(/,/g, ''));
        const bPrice = parseInt(b.priceSale.replace(/,/g, ''));
        return bPrice - aPrice;
      });
      break;
    default: // 인기순 (hot 태그가 있는 항목 우선)
      sortedProducts = sortedProducts.sort((a, b) => {
        const aIsHot = a.badges && a.badges.some(badge => badge.text.toLowerCase().includes('hot') || 
                                      badge.text.includes('인기')) ? 1 : 0;
        const bIsHot = b.badges && b.badges.some(badge => badge.text.toLowerCase().includes('hot') || 
                                      badge.text.includes('인기')) ? 1 : 0;
        return bIsHot - aIsHot;
      });
      break;
  }
  
  // window.products 객체 업데이트
  if (window.products) {
    window.products[categoryType] = sortedProducts;
  }
  
  // 항상 카테고리 페이지 자체 렌더링 함수 사용
  renderCategoryProducts(categoryType);
}

/**
 * 카테고리 페이지용 상품 렌더링 함수 (fallback)
 * @param {string} category - 카테고리 타입
 */
function renderCategoryProducts(category) {
  const productContainer = document.getElementById('product-container');
  if (!productContainer) return;
  
  // 상품 목록 비우기
  productContainer.innerHTML = '';
  
  // 카테고리 상품 가져오기
  const categoryProducts = window.products ? window.products[category] || [] : [];
  
  // 상품이 없는 경우
  if (categoryProducts.length === 0) {
    productContainer.innerHTML = '<div class="no-products">상품이 없습니다.</div>';
    return;
  }
  
  // 상품 렌더링 (전체 상품 표시)
  categoryProducts.forEach(product => {
    const productCard = createProductCard(product);
    productContainer.appendChild(productCard);
  });
  
  // 위시리스트 버튼 초기화
  if (typeof window.initWishlistButtons === 'function') {
    setTimeout(() => {
      window.initWishlistButtons();
    }, 100);
  }
  
  // 장바구니 버튼 초기화
  if (typeof window.initCartButtons === 'function') {
    console.log('[카테고리] 장바구니 버튼 초기화 함수 실행');
    window.initCartButtons();
  }
  
  // 상품 상세 페이지 링크 초기화
  if (typeof window.initProductDetailLinks === 'function') {
    window.initProductDetailLinks();
  }
  
  // 바로 구매 버튼 이벤트 처리
  initBuyButtons();
}

/**
 * 상품 카드 생성 함수 (fallback)
 * @param {Object} product - 상품 데이터
 * @returns {HTMLElement} - 상품 카드 요소
 */
function createProductCard(product) {
  // 상품 ID 확인 및 로깅
  console.log('[카테고리] 상품 카드 생성 시작:', product.id, product.title);
  
  if (!product.id) {
    console.error('[카테고리] 상품 ID가 없습니다:', product);
    product.id = 'product-' + Math.random().toString(36).substr(2, 9);
    console.log('[카테고리] 임시 ID 생성:', product.id);
  }
  
  const card = document.createElement('div');
  card.className = 'product-item';
  card.setAttribute('data-id', product.id);
  
  // 배지 HTML 생성
  const badgesHTML = product.badges && product.badges.length > 0 
    ? product.badges.map(badge => `<span class="badge ${badge.type}">${badge.text}</span>`).join('') 
    : '';
  
  // 이미지 경로 수정 (상대 경로로)
  let imagePath = product.image;
  if (imagePath.startsWith('/')) {
    imagePath = '..' + imagePath;
  }
  
  // 상품 카드 HTML
  card.innerHTML = `
    <div class="product-image">
      <img src="${imagePath}" alt="${product.title}">
      <div class="product-badges">
        ${badgesHTML}
      </div>
      <div class="product-actions">
        <button class="wishlist-btn" title="위시리스트에 추가">
          <i class="far fa-heart"></i>
        </button>
        <button class="cart-btn" data-id="${product.id}" title="장바구니에 추가">
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-title">${product.title}</h3>
      <div class="product-price">
        <span class="price-sale">${product.priceSale}원</span>
        <span class="price-normal">${product.priceNormal}원</span>
      </div>
      <div class="discount-info">
        <span class="discount-rate">${calculateDiscountRate(product.priceNormal, product.priceSale)}%</span>
      </div>
      <div class="product-rating">
        <div class="stars">
          ${generateStarsHTML(product.rating || 4.5)}
        </div>
        <span class="review-count">(${product.reviews || Math.floor(Math.random() * 50) + 10})</span>
      </div>
      <div class="product-button-group">
        <button class="buy-now-btn">바로 구매</button>
        <button class="cart-btn-bottom" data-id="${product.id}" title="장바구니에 추가">
          <i class="fas fa-shopping-cart"></i>
        </button>
        <button class="wishlist-btn-bottom" title="위시리스트에 추가">
          <i class="far fa-heart"></i>
        </button>
      </div>
    </div>
  `;
  
  // 생성된 카드에서 data-id 확인
  console.log('[카테고리] 카드 생성 완료 - data-id:', card.getAttribute('data-id'));
  console.log('[카테고리] 장바구니 버튼 data-id:', card.querySelector('.cart-btn').getAttribute('data-id'));
  
  // 하단 찜하기 버튼 이벤트 연결
  const wishlistBtnBottom = card.querySelector('.wishlist-btn-bottom');
  if (wishlistBtnBottom) {
    // 초기 위시리스트 상태 확인
    if (typeof window.isInWishlist === 'function' && window.isInWishlist(product.id)) {
      const icon = wishlistBtnBottom.querySelector('i');
      if (icon) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c';
        console.log('[디버깅] 위시리스트 상태 초기화:', product.id);
      }
    }
    
    wishlistBtnBottom.addEventListener('click', function() {
      // 위시리스트에 추가/제거
      const productId = card.getAttribute('data-id');
      const icon = this.querySelector('i');
      
      // isInWishlist 함수를 통해 위시리스트에 있는지 확인
      const isInWishlistAlready = typeof window.isInWishlist === 'function' && window.isInWishlist(productId);
      
      if (isInWishlistAlready) {
        // 이미 찜한 상태면 제거
        window.removeFromWishlist(productId);
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        
        // 상단 위시리스트 버튼도 업데이트
        const topWishlistBtn = card.querySelector('.wishlist-btn i');
        if (topWishlistBtn) {
          topWishlistBtn.classList.remove('fas');
          topWishlistBtn.classList.add('far');
          topWishlistBtn.style.color = '';
        }
        
        // 알림 표시
        showToast('위시리스트에서 제거되었습니다.');
      } else {
        // 찜하기
        // 현재 렌더링된 상품 정보 생성
        const newProduct = {
          id: productId,
          title: card.querySelector('.product-title').textContent,
          image: card.querySelector('img').src,
          priceSale: card.querySelector('.price-sale').textContent.replace('원', ''),
          priceNormal: card.querySelector('.price-normal').textContent.replace('원', '')
        };
        
        window.addToWishlist(newProduct);
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c';
        
        // 애니메이션 효과 추가
        icon.style.transform = 'scale(1.3)';
        setTimeout(() => {
          icon.style.transform = '';
        }, 300);
        
        // 상단 위시리스트 버튼도 업데이트
        const topWishlistBtn = card.querySelector('.wishlist-btn i');
        if (topWishlistBtn) {
          topWishlistBtn.classList.remove('far');
          topWishlistBtn.classList.add('fas');
          topWishlistBtn.style.color = '#e74c3c';
        }
      }
    });
  }
  
  // 상단 위시리스트 버튼 이벤트 연결
  const wishlistBtn = card.querySelector('.wishlist-btn');
  if (wishlistBtn) {
    // 초기 위시리스트 상태 확인
    if (typeof window.isInWishlist === 'function' && window.isInWishlist(product.id)) {
      const icon = wishlistBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c';
      }
    }
    
    wishlistBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // 위시리스트에 추가/제거
      const productId = card.getAttribute('data-id');
      const icon = this.querySelector('i');
      
      // isInWishlist 함수를 통해 위시리스트에 있는지 확인
      const isInWishlistAlready = typeof window.isInWishlist === 'function' && window.isInWishlist(productId);
      
      if (isInWishlistAlready) {
        // 이미 찜한 상태면 제거
        window.removeFromWishlist(productId);
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        
        // 하단 위시리스트 버튼도 업데이트
        const bottomWishlistBtn = card.querySelector('.wishlist-btn-bottom i');
        if (bottomWishlistBtn) {
          bottomWishlistBtn.classList.remove('fas');
          bottomWishlistBtn.classList.add('far');
          bottomWishlistBtn.style.color = '';
        }
        
        // 알림 표시
        showToast('위시리스트에서 제거되었습니다.');
      } else {
        // 찜하기
        // 현재 렌더링된 상품 정보 생성
        const newProduct = {
          id: productId,
          title: card.querySelector('.product-title').textContent,
          image: card.querySelector('img').src,
          priceSale: card.querySelector('.price-sale').textContent.replace('원', ''),
          priceNormal: card.querySelector('.price-normal').textContent.replace('원', '')
        };
        
        window.addToWishlist(newProduct);
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c';
        
        // 애니메이션 효과 추가
        icon.style.transform = 'scale(1.3)';
        setTimeout(() => {
          icon.style.transform = '';
        }, 300);
        
        // 하단 위시리스트 버튼도 업데이트
        const bottomWishlistBtn = card.querySelector('.wishlist-btn-bottom i');
        if (bottomWishlistBtn) {
          bottomWishlistBtn.classList.remove('far');
          bottomWishlistBtn.classList.add('fas');
          bottomWishlistBtn.style.color = '#e74c3c';
        }
      }
    });
  }

  return card;
}

/**
 * 별점 HTML 생성 함수
 * @param {number} rating - 평점 (0~5)
 * @returns {string} - 별점 HTML
 */
function generateStarsHTML(rating) {
  let starsHTML = '';
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  
  // 꽉 찬 별
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  // 반 별
  if (halfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // 빈 별
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  return starsHTML;
}

/**
 * 가격 포맷 함수
 * @param {number} price - 가격
 * @returns {string} - 포맷된 가격
 */
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 할인율 계산 함수
 * @param {string} priceNormal - 정상가
 * @param {string} priceSale - 할인가
 * @returns {number} - 할인율
 */
function calculateDiscountRate(priceNormal, priceSale) {
  // 문자열에서 콤마 제거하고 숫자로 변환
  const original = parseInt(priceNormal.replace(/,/g, ''));
  const sale = parseInt(priceSale.replace(/,/g, ''));
  
  // 할인율 계산 및 반올림
  const discountRate = Math.round(((original - sale) / original) * 100);
  return discountRate;
}

/**
 * 토스트 메시지 표시 함수
 * @param {string} message - 표시할 메시지
 */
function showToast(message) {
  // 기존 토스트가 있다면 제거
  const existingToast = document.querySelector('.toast-message');
  if (existingToast) {
    existingToast.remove();
  }
  
  // 토스트 요소 생성
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  
  // 문서에 추가
  document.body.appendChild(toast);
  
  // 애니메이션 효과를 위한 클래스 추가
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // 3초 후 제거
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

/**
 * 바로 구매 버튼 이벤트 초기화 함수
 */
function initBuyButtons() {
  const buyNowBtns = document.querySelectorAll('.buy-now-btn');
  console.log('[카테고리] 바로 구매 버튼 초기화 - 버튼 수:', buyNowBtns.length);
  
  buyNowBtns.forEach(btn => {
    // 이벤트 중복 방지를 위해 기존 이벤트 제거
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // 상품 ID 가져오기
      const productItem = this.closest('.product-item');
      if (productItem) {
        const productId = productItem.getAttribute('data-id');
        if (productId) {
          console.log('[카테고리] 바로 구매 버튼 클릭 - 상품 ID:', productId);
          // 상품 상세 페이지로 이동
          window.location.href = '../product/detail.jsp?id=' + productId;
        } else {
          console.error('[카테고리] 상품 ID를 찾을 수 없습니다');
        }
      } else {
        console.error('[카테고리] 상품 아이템을 찾을 수 없습니다');
      }
    });
  });
} 