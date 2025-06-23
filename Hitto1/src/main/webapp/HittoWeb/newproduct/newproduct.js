/**
 * HittoStore 신상품 페이지 JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log("신상품 페이지 로드됨");
  
  // window.newProducts 데이터 확인
  if (!window.newProducts || window.newProducts.length === 0) {
    console.warn("main.js에서 정의된 window.newProducts가 없거나 비어 있습니다. 기본 데이터를 설정합니다.");
    window.newProducts = [
      {
        id: 'new1',
        title: '공인구 12개 세트 신제품',
        image: '../images/best10.jpg',
        badges: [{type: 'new', text: 'NEW'}, {type: 'hot', text: 'HOT'}],
        priceSale: '48,000',
        priceNormal: '60,000',
        category: 'ball'
      },
      {
        id: 'new2',
        title: '프로급 헬멧 신제품',
        image: '../images/best11.jpg',
        badges: [{type: 'new', text: 'NEW'}, {type: 'hot', text: 'HOT'}],
        priceSale: '128,000',
        priceNormal: '160,000',
        category: 'equipment'
      },
      {
        id: 'new3',
        title: '프로 배팅 장갑 신제품',
        image: '../images/best12.jpg',
        badges: [{type: 'new', text: 'NEW'}],
        priceSale: '89,000',
        priceNormal: '110,000',
        category: 'equipment'
      },
      {
        id: 'new4',
        title: '타자용 팔꿈치 보호대 신제품',
        image: '../images/best13.jpg',
        badges: [{type: 'discount', text: '15%'}, {type: 'new', text: 'NEW'}],
        priceSale: '145,000',
        priceNormal: '170,000',
        category: 'equipment'
      },
      {
        id: 'new5',
        title: '초경량 배팅 헬멧 프리미엄 신제품',
        image: '../images/best14.jpg',
        badges: [{type: 'new', text: 'NEW'}, {type: 'discount', text: '30%'}],
        priceSale: '112,000',
        priceNormal: '160,000',
        category: 'equipment'
      }
    ];
  } else {
    console.log("main.js에서 정의된 window.newProducts가 로드되었습니다:", window.newProducts.length + "개 항목");
  }
  
  // 정렬 옵션 변경 이벤트
  const sortOptions = document.getElementById('sort-options');
  if (sortOptions) {
    sortOptions.addEventListener('change', function() {
      console.log('정렬 옵션 변경:', this.value);
      loadNewProducts(this.value);
    });
  }
  
  // 뷰 모드 변경 이벤트
  const gridViewBtn = document.querySelector('.grid-view');
  const listViewBtn = document.querySelector('.list-view');
  const productList = document.querySelector('.product-list');
  
  if (gridViewBtn && listViewBtn && productList) {
    gridViewBtn.addEventListener('click', function() {
      productList.classList.remove('list-view');
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', function() {
      productList.classList.add('list-view');
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
    });
  }
  
  // 신상품 로드 (기본 정렬: 신상품순)
  loadNewProducts('newest');
});

/**
 * 신상품 로드 함수
 * @param {string} sortBy - 정렬 옵션
 */
function loadNewProducts(sortBy = 'newest') {
  // newProducts 데이터는 main.js에 정의되어 있음
  if (!window.newProducts) {
    console.error('신상품 데이터를 찾을 수 없습니다.');
    return;
  }
  
  // 신상품 데이터 복사
  const newProductsList = [...window.newProducts];
  
  // 정렬 처리
  switch(sortBy) {
    case 'popular':
      // 인기순 정렬 (hot 배지가 있는 상품)
      newProductsList.sort((a, b) => {
        const aIsHot = a.badges && a.badges.some(badge => badge.text.toLowerCase().includes('hot') || 
                                           badge.text.includes('인기')) ? 1 : 0;
        const bIsHot = b.badges && b.badges.some(badge => badge.text.toLowerCase().includes('hot') || 
                                           badge.text.includes('인기')) ? 1 : 0;
        return bIsHot - aIsHot;
      });
      break;
    case 'price-low':
      // 가격 낮은순 정렬
      newProductsList.sort((a, b) => {
        const aPrice = parseInt(a.priceSale.replace(/,/g, ''));
        const bPrice = parseInt(b.priceSale.replace(/,/g, ''));
        return aPrice - bPrice;
      });
      break;
    case 'price-high':
      // 가격 높은순 정렬
      newProductsList.sort((a, b) => {
        const aPrice = parseInt(a.priceSale.replace(/,/g, ''));
        const bPrice = parseInt(b.priceSale.replace(/,/g, ''));
        return bPrice - aPrice;
      });
      break;
    default: // 신상품순 (기본값)
      // 이미 신상품 순으로 정렬되어 있으므로 추가 작업 필요 없음
      break;
  }
  
  // 신상품 렌더링
  renderNewProducts(newProductsList);
}

/**
 * 신상품 렌더링 함수
 * @param {Array} products - 신상품 데이터 배열
 */
function renderNewProducts(products) {
  const productList = document.getElementById('new-product-list');
  if (!productList) {
    console.error('상품 목록 컨테이너(#new-product-list)를 찾을 수 없습니다.');
    return;
  }
  
  console.log('상품 렌더링 시작:', products ? products.length + '개 항목' : '데이터 없음');
  
  // products가 제공되지 않은 경우 전역 데이터 사용
  if (!products) {
    products = window.newProducts || [];
    console.log('전역 데이터 사용:', products.length + '개 항목');
  }
  
  // 상품 목록 비우기
  productList.innerHTML = '';
  
  // 상품이 없는 경우
  if (products.length === 0) {
    console.error('렌더링할 상품이 없습니다.');
    productList.innerHTML = '<p class="no-products">신상품이 없습니다.</p>';
    return;
  }
  
  // 신상품 렌더링
  products.forEach(product => {
    console.log('상품 렌더링:', product.id, product.title);
    
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
    console.log('이미지 경로:', product.image, '->', imagePath);
    
    // 할인율 계산
    const discountRate = getDiscountRate(product.priceNormal, product.priceSale);
    
    // 리뷰 수 생성 (랜덤)
    const reviewCount = Math.floor(Math.random() * 50) + 10;
    
    // 상품 아이템 요소 생성
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.setAttribute('data-id', product.id);
    productItem.innerHTML = `
      <div class="product-thumb">
        <img src="${imagePath}" alt="${product.title}" onerror="this.onerror=null; this.src='../images/logo.png'; console.error('이미지 로드 실패:', this.alt);">
        ${badgesHTML}
        <div class="product-actions">
          <button class="wishlist-btn" title="위시리스트에 추가">
            <i class="far fa-heart"></i>
          </button>
          <button class="cart-btn" title="장바구니에 추가">
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
        <div class="product-button-group">
          <button class="buy-now-btn">바로 구매</button>
          <button class="cart-btn-bottom" title="장바구니에 추가">
            <i class="fas fa-shopping-cart"></i>
          </button>
          <button class="wishlist-btn-bottom" title="위시리스트에 추가">
            <i class="far fa-heart"></i>
          </button>
        </div>
      </div>
    `;
    
    productList.appendChild(productItem);
    
    // 하단 찜하기 버튼 이벤트 연결
    const wishlistBtnBottom = productItem.querySelector('.wishlist-btn-bottom');
    if (wishlistBtnBottom) {
      // 초기 위시리스트 상태 확인
      if (typeof window.isInWishlist === 'function' && window.isInWishlist(product.id)) {
        const icon = wishlistBtnBottom.querySelector('i');
        if (icon) {
          icon.classList.remove('far');
          icon.classList.add('fas');
          icon.style.color = '#e74c3c';
        }
      }
      
      wishlistBtnBottom.addEventListener('click', function() {
        // 위시리스트에 추가/제거
        const productId = productItem.getAttribute('data-id');
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
          const topWishlistBtn = productItem.querySelector('.wishlist-btn i');
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
            title: productItem.querySelector('.product-title').textContent,
            image: productItem.querySelector('img').src,
            priceSale: productItem.querySelector('.price-sale').textContent.replace('원', ''),
            priceNormal: productItem.querySelector('.price-normal').textContent.replace('원', '')
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
          const topWishlistBtn = productItem.querySelector('.wishlist-btn i');
          if (topWishlistBtn) {
            topWishlistBtn.classList.remove('far');
            topWishlistBtn.classList.add('fas');
            topWishlistBtn.style.color = '#e74c3c';
          }
        }
      });
    }
    
    // 상단 위시리스트 버튼 이벤트 연결
    const wishlistBtn = productItem.querySelector('.wishlist-btn');
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
        const productId = productItem.getAttribute('data-id');
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
          const bottomWishlistBtn = productItem.querySelector('.wishlist-btn-bottom i');
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
            title: productItem.querySelector('.product-title').textContent,
            image: productItem.querySelector('img').src,
            priceSale: productItem.querySelector('.price-sale').textContent.replace('원', ''),
            priceNormal: productItem.querySelector('.price-normal').textContent.replace('원', '')
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
          const bottomWishlistBtn = productItem.querySelector('.wishlist-btn-bottom i');
          if (bottomWishlistBtn) {
            bottomWishlistBtn.classList.remove('far');
            bottomWishlistBtn.classList.add('fas');
            bottomWishlistBtn.style.color = '#e74c3c';
          }
        }
      });
    }
  });
  
  console.log('상품 렌더링 완료');
  
  // 이벤트 리스너 다시 연결
  initProductEvents();
  
  // 위시리스트 버튼 초기화
  if (typeof initWishlistButtons === 'function') {
    setTimeout(() => {
      initWishlistButtons();
    }, 100);
  }
  
  // 장바구니 버튼 초기화
  if (typeof window.initCartButtons === 'function') {
    console.log('장바구니 버튼 초기화 함수 실행');
    window.initCartButtons();
  } else {
    console.warn('장바구니 초기화 함수를 찾을 수 없습니다');
  }
  
  // 상품 상세 페이지 링크 초기화
  if (typeof window.initProductDetailLinks === 'function') {
    console.log('상품 상세 페이지 링크 초기화 함수 실행');
    window.initProductDetailLinks();
  } else {
    console.warn('상품 상세 페이지 링크 초기화 함수를 찾을 수 없습니다');
  }
}

/**
 * 상품 이벤트 초기화 함수
 */
function initProductEvents() {
  console.log('[디버깅] 신상품 페이지 - 상품 이벤트 초기화');
  
  // 바로 구매 버튼 이벤트
  const buyNowBtns = document.querySelectorAll('.buy-now-btn');
  console.log('[신상품] 바로 구매 버튼 초기화 - 버튼 수:', buyNowBtns.length);
  
  buyNowBtns.forEach(btn => {
    // 이벤트 중복 방지를 위해 기존 이벤트 리스너 제거
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 상품 ID 가져오기
      const productItem = this.closest('.product-item');
      if (!productItem) {
        console.error('[신상품] 상품 아이템을 찾을 수 없습니다');
        return;
      }
      
      const productId = productItem.getAttribute('data-id');
      if (!productId) {
        console.error('[신상품] 상품 ID를 찾을 수 없습니다');
        return;
      }
      
      console.log('[신상품] 바로 구매 버튼 클릭 - 상품 ID:', productId);
      
      // 신상품 데이터에서 해당 상품 확인 (검증용)
      const matchedProduct = window.newProducts.find(p => p.id === productId);
      if (matchedProduct) {
        console.log('[신상품] 상품 찾음:', matchedProduct.title);
      } else {
        console.warn('[신상품] 주의: 상품 ID는 있지만 데이터에서 찾을 수 없습니다. 그래도 페이지 이동은 진행합니다.');
      }
      
      // 상품 상세 페이지로 이동
      window.location.href = '../product/detail.jsp?id=' + productId;
    });
  });
}

/**
 * 이미지 경로 수정 함수 (main.js에서 가져옴)
 * @param {string} path - 이미지 경로
 * @returns {string} - 수정된 이미지 경로
 */
function getFixedImagePath(path) {
  // 디버깅 - 경로 로깅
  console.log('원본 이미지 경로:', path);
  
  // 이미 ../images로 시작하는 경우 그대로 반환
  if (path.startsWith('../images/')) {
    console.log('수정 없이 반환:', path);
    return path;
  }
  
  // 경로에 images가 포함되어 있으면 처리
  if (path.includes('images/')) {
    // images/로 시작하는 경우
    if (path.startsWith('images/')) {
      const newPath = '../' + path;
      console.log('수정된 경로 1:', newPath);
      return newPath;
    }
    
    // /images/로 시작하는 경우
    if (path.includes('/images/')) {
      const newPath = '..' + path.substring(path.indexOf('/images/'));
      console.log('수정된 경로 2:', newPath);
      return newPath;
    }
  }
  
  // 그 외의 경우 (상대 경로가 아닌 경우)
  if (!path.startsWith('../') && !path.startsWith('/')) {
    const newPath = '../images/' + path;
    console.log('수정된 경로 3:', newPath);
    return newPath;
  }
  
  // 기본값 - 원래 경로 반환
  console.log('기본 반환:', path);
  return path;
}

/**
 * 할인율 계산 함수
 * @param {string} originalPrice - 원래 가격
 * @param {string} salePrice - 할인 가격
 * @returns {number} - 할인율 (%)
 */
function getDiscountRate(originalPrice, salePrice) {
  // 문자열에서 콤마 제거하고 숫자로 변환
  const original = parseInt(originalPrice.replace(/,/g, ''));
  const sale = parseInt(salePrice.replace(/,/g, ''));
  
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