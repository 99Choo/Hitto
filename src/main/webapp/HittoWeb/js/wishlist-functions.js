// 위시리스트 관리 함수들

// 함수 선언들을 미리 해두기
function addToWishlist(product) {
  console.log('addToWishlist 호출됨:', product);
  
  // 필수 필드 확인
  if (!product || !product.id || !product.title) {
    console.error('유효하지 않은 상품 데이터:', product);
    showToast('상품 정보가 올바르지 않습니다.');
    return false;
  }
  
  // 로컬스토리지에서 위시리스트 가져오기
  let wishlist = getWishlistFromStorage();
  console.log('현재 위시리스트:', wishlist);
  
  // 이미 위시리스트에 있는지 확인
  const existingProduct = wishlist.find(item => item.id === product.id);
  
  if (!existingProduct) {
    // 상품 추가
    wishlist.push({
      id: product.id,
      title: product.title,
      image: product.image,
      priceSale: product.priceSale,
      priceNormal: product.priceNormal,
      badges: product.badges || []
    });
    
    // 로컬스토리지에 저장
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // 알림 메시지 표시
    showToast(`"${product.title}" 상품이 위시리스트에 추가되었습니다.`);
    
    console.log('위시리스트에 추가됨:', product);
    return true;
  } else {
    console.log('이미 위시리스트에 있는 상품:', product.id);
    showToast('이미 위시리스트에 있는 상품입니다.');
    return false;
  }
}

function removeFromWishlist(productId) {
  console.log('removeFromWishlist 호출됨:', productId);
  // 로컬스토리지에서 위시리스트 가져오기
  let wishlist = getWishlistFromStorage();
  
  // 해당 상품 찾기
  const productIndex = wishlist.findIndex(item => item.id === productId);
  
  if (productIndex !== -1) {
    // 위시리스트에서 제거
    const removedProduct = wishlist.splice(productIndex, 1)[0];
    
    // 로컬스토리지에 저장
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // 알림 메시지 표시
    showToast(`"${removedProduct.title}" 상품이 위시리스트에서 제거되었습니다.`);
    
    console.log('위시리스트에서 제거됨:', productId);
    return true;
  }
  
  return false;
}

function getWishlistFromStorage() {
  const storedWishlist = localStorage.getItem('wishlist');
  return storedWishlist ? JSON.parse(storedWishlist) : [];
}

function isInWishlist(productId) {
  if (!productId) {
    console.error('isInWishlist: productId가 제공되지 않았습니다.');
    return false;
  }
  console.log('isInWishlist 함수 호출됨:', productId);
  const wishlist = getWishlistFromStorage();
  const result = wishlist.some(item => item.id === productId);
  console.log('위시리스트 포함 여부:', result);
  return result;
}

// 토스트 메시지 표시 함수
function showToast(message) {
  console.log('토스트 메시지:', message);
  // 기존 토스트가 있다면 제거
  const existingToast = document.querySelector('.toast-message');
  if (existingToast) {
    existingToast.remove();
  }
  
  // 새 토스트 생성
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
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

// 알림 메시지 표시 함수 (이전 버전 호환성 유지)
function showNotification(message) {
  console.log('알림 메시지:', message);
  showToast(message);
}

function wishlistButtonClickHandler(e) {
  e.preventDefault(); // 기본 링크 동작 방지
  console.log('위시리스트 버튼 클릭됨');
  
  // 상품 데이터 가져오기
  const productItem = this.closest('.product-item') || this.closest('.wishlist-item');
  if (!productItem) {
    console.log('클릭 이벤트: 상품 아이템을 찾을 수 없습니다');
    return;
  }
  
  const productId = productItem.dataset.id || productItem.getAttribute('data-id');
  const productTitle = productItem.querySelector('.product-title').textContent;
  const productImage = productItem.querySelector('img').src;
  const productPriceSale = productItem.querySelector('.price-sale').textContent;
  const productPriceNormal = productItem.querySelector('.price-normal')?.textContent;
  
  console.log('클릭된 상품 ID:', productId);
  
  // 배지 정보 수집
  const badges = [];
  const badgeElements = productItem.querySelectorAll('.badge');
  badgeElements.forEach(badge => {
    badges.push({
      type: badge.classList.contains('discount') ? 'discount' : 
           badge.classList.contains('new') ? 'new' : 'hot',
      text: badge.textContent
    });
  });
  
  // 상품 객체 생성
  const product = {
    id: productId,
    title: productTitle,
    image: productImage,
    priceSale: productPriceSale,
    priceNormal: productPriceNormal || productPriceSale,
    badges: badges
  };
  
  const icon = this.querySelector('i');
  
  // 이미 위시리스트에 있는지 확인
  if (isInWishlist(productId)) {
    // 위시리스트에서 제거
    removeFromWishlist(productId);
    
    // 상품의 모든 위시리스트 아이콘 업데이트 - 빈 하트로
    updateWishlistIcons(productItem, false);
    
    console.log('위시리스트에서 제거됨:', productId);
  } else {
    // 위시리스트에 추가
    addToWishlist(product);
    
    // 상품의 모든 위시리스트 아이콘 업데이트 - 채워진 하트로
    updateWishlistIcons(productItem, true);
    
    console.log('위시리스트에 추가됨:', productId);
  }
}

// 해당 상품의 모든 위시리스트 아이콘 업데이트
function updateWishlistIcons(productItem, isInWishlist) {
  // 모든 위시리스트 아이콘 (상단 및 하단)
  const icons = productItem.querySelectorAll('.wishlist-btn i, .wishlist-btn-bottom i');
  
  icons.forEach(icon => {
    if (isInWishlist) {
      // 위시리스트에 추가 - 채워진 하트로
      icon.classList.remove('far');
      icon.classList.add('fas');
      icon.style.color = '#e74c3c';
      
      // 애니메이션 효과 추가
      icon.style.transform = 'scale(1.3)';
      setTimeout(() => {
        icon.style.transform = '';
      }, 300);
    } else {
      // 위시리스트에서 제거 - 빈 하트로
      icon.classList.remove('fas');
      icon.classList.add('far');
      icon.style.color = '';
    }
  });
}

function initWishlistButtons() {
  // 상품 카드의 위시리스트 버튼들 찾기
  const wishlistButtons = document.querySelectorAll('.wishlist-btn, .wishlist-btn-bottom');
  
  console.log('[디버깅] 위시리스트 버튼 초기화 시작:', wishlistButtons.length + '개 발견');
  
  wishlistButtons.forEach(button => {
    // 상품 정보 가져오기
    const productItem = button.closest('.product-item') || button.closest('.wishlist-item');
    if (!productItem) {
      console.log('[디버깅] 상품 아이템을 찾을 수 없습니다:', button);
      return;
    }
    
    const productId = productItem.dataset.id || productItem.getAttribute('data-id');
    console.log('[디버깅] 버튼의 상품 ID:', productId);
    
    // 이미 위시리스트에 있는지 확인하고 아이콘 상태 초기화
    if (isInWishlist(productId)) {
      const icon = button.querySelector('i');
      if (icon) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c';
        console.log('[디버깅] 위시리스트 상태 초기화:', productId);
      }
    }
    
    // 기존 이벤트 리스너 제거 (중복 방지)
    button.removeEventListener('click', wishlistButtonClickHandler);
    
    // 클릭 이벤트 설정
    button.addEventListener('click', wishlistButtonClickHandler);
  });
  
  console.log('[디버깅] 위시리스트 버튼 초기화 완료');
}

// DOM이 로드된 후 초기화 함수
document.addEventListener('DOMContentLoaded', function() {
  console.log('위시리스트 함수 초기화됨');
  
  // 함수들을 전역 객체에 바로 노출시키기
  window.addToWishlist = addToWishlist;
  window.removeFromWishlist = removeFromWishlist;
  window.isInWishlist = isInWishlist;
  window.getWishlistFromStorage = getWishlistFromStorage;
  window.showToast = showToast;
  window.showNotification = showNotification;
  window.updateWishlistIcons = updateWishlistIcons;
  window.initWishlistButtons = initWishlistButtons;
  window.wishlistButtonClickHandler = wishlistButtonClickHandler;
  
  // 위시리스트 전체 페이지 이벤트 등록 (이벤트 위임)
  initGlobalWishlistEvents();
  
  // 위시리스트 버튼 이벤트 연결
  console.log('DOM이 로드된 후 initWishlistButtons 호출');
  initWishlistButtons();
  
  // 페이지 로드 후 1초 뒤에 다시 한번 초기화 (지연 로드된 요소들을 위해)
  setTimeout(() => {
    console.log('지연 호출: initWishlistButtons 재실행');
    initWishlistButtons();
  }, 1000);
  
  console.log('위시리스트 초기화 완료');
});

// 전역 위시리스트 이벤트 등록 (페이지 전체에 이벤트 위임 방식으로 적용)
function initGlobalWishlistEvents() {
  console.log('전역 위시리스트 이벤트 등록');
  
  // 페이지 전체에 클릭 이벤트 위임
  document.addEventListener('click', function(e) {
    // 위시리스트 버튼 또는 하위 아이콘이 클릭되었는지 확인
    const wishlistBtn = e.target.closest('.wishlist-btn, .wishlist-btn-bottom');
    if (!wishlistBtn) return; // 위시리스트 버튼이 아니면 무시
    
    e.preventDefault(); // 기본 동작 방지
    console.log('위시리스트 버튼 클릭 감지:', wishlistBtn);
    
    // 상품 아이템 찾기
    const productItem = wishlistBtn.closest('.product-item');
    if (!productItem) {
      console.log('상품 아이템을 찾을 수 없습니다');
      return;
    }
    
    // 상품 정보 가져오기
    const productId = productItem.getAttribute('data-id');
    console.log('클릭된 상품 ID:', productId);
    
    // 아이콘 요소
    const icon = wishlistBtn.querySelector('i');
    if (!icon) {
      console.log('위시리스트 아이콘을 찾을 수 없습니다');
      return;
    }
    
    // 이미 위시리스트에 있는지 확인
    if (isInWishlist(productId)) {
      // 위시리스트에서 제거
      removeFromWishlist(productId);
      
      // 상품의 모든 위시리스트 아이콘 업데이트 - 빈 하트로
      updateWishlistIcons(productItem, false);
    } else {
      // 상품 정보 수집
      const productTitle = productItem.querySelector('.product-title')?.textContent || '상품';
      const productImage = productItem.querySelector('img')?.src || '';
      const productPriceSale = productItem.querySelector('.price-sale')?.textContent.replace('원', '') || '0';
      const productPriceNormal = productItem.querySelector('.price-normal')?.textContent.replace('원', '') || productPriceSale;
      
      // 배지 정보 수집
      const badges = [];
      const badgeElements = productItem.querySelectorAll('.badge');
      badgeElements.forEach(badge => {
        badges.push({
          type: badge.classList.contains('discount') ? 'discount' : 
               badge.classList.contains('new') ? 'new' : 'hot',
          text: badge.textContent
        });
      });
      
      // 상품 객체 생성
      const product = {
        id: productId,
        title: productTitle,
        image: productImage,
        priceSale: productPriceSale,
        priceNormal: productPriceNormal,
        badges: badges
      };
      
      // 위시리스트에 추가
      addToWishlist(product);
      
      // 상품의 모든 위시리스트 아이콘 업데이트 - 채워진 하트로
      updateWishlistIcons(productItem, true);
    }
  });
  
  console.log('전역 위시리스트 이벤트 등록 완료');
}