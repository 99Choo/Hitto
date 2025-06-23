// 장바구니 관리 함수들

// 장바구니에 상품 추가 함수
function addToCart(product) {
  console.log('addToCart 호출됨:', product);
  
  // 필수 필드 확인
  if (!product || !product.id || !product.title) {
    console.error('유효하지 않은 상품 데이터:', product);
    showToast('상품 정보가 올바르지 않습니다.');
    return false;
  }
  
  // 로컬스토리지에서 장바구니 가져오기
  let cart = getCartFromStorage();
  console.log('현재 장바구니:', cart);
  
  // 이미 장바구니에 있는지 확인
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (!existingProduct) {
    // 상품 추가
    cart.push({
      id: product.id,
      title: product.title,
      image: product.image,
      priceSale: product.priceSale,
      priceNormal: product.priceNormal,
      badges: product.badges || [],
      quantity: 1  // 기본 수량
    });
    
    // 로컬스토리지에 저장
    localStorage.setItem('cartItems', JSON.stringify(cart));
    
    // 알림 메시지 표시
    showToast(`"${product.title}" 상품이 장바구니에 추가되었습니다.`);
    
    console.log('장바구니에 추가됨:', product);
    updateCartCount();
    return true;
  } else {
    // 이미 있으면 수량만 증가
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    
    // 로컬스토리지에 저장
    localStorage.setItem('cartItems', JSON.stringify(cart));
    
    // 알림 메시지 표시
    showToast(`"${product.title}" 상품의 수량이 증가했습니다.`);
    
    console.log('장바구니 상품 수량 증가:', product);
    updateCartCount();
    return true;
  }
}

// 장바구니에서 상품 제거 함수
function removeFromCart(productId) {
  console.log('removeFromCart 호출됨:', productId);
  // 로컬스토리지에서 장바구니 가져오기
  let cart = getCartFromStorage();
  
  // 해당 상품 찾기
  const productIndex = cart.findIndex(item => item.id === productId);
  
  if (productIndex !== -1) {
    // 장바구니에서 제거
    const removedProduct = cart.splice(productIndex, 1)[0];
    
    // 로컬스토리지에 저장
    localStorage.setItem('cartItems', JSON.stringify(cart));
    
    // 알림 메시지 표시
    showToast(`"${removedProduct.title}" 상품이 장바구니에서 제거되었습니다.`);
    
    console.log('장바구니에서 제거됨:', productId);
    updateCartCount();
    return true;
  }
  
  return false;
}

// 로컬스토리지에서 장바구니 데이터 가져오기
function getCartFromStorage() {
  const storedCart = localStorage.getItem('cartItems');
  return storedCart ? JSON.parse(storedCart) : [];
}

// 상품이 장바구니에 있는지 확인하는 함수
function isInCart(productId) {
  if (!productId) {
    console.error('isInCart: productId가 제공되지 않았습니다.');
    return false;
  }
  console.log('isInCart 함수 호출됨:', productId);
  const cart = getCartFromStorage();
  const result = cart.some(item => item.id === productId);
  console.log('장바구니 포함 여부:', result);
  return result;
}

// 장바구니 아이콘 업데이트 함수
function updateCartIcons(productItem, isInCart) {
  // 모든 장바구니 아이콘 (상단 및 하단)
  const icons = productItem.querySelectorAll('.cart-btn i, .cart-btn-bottom i');
  
  icons.forEach(icon => {
    if (isInCart) {
      // 장바구니에 추가 - 체크 아이콘으로
      icon.classList.remove('fa-shopping-cart');
      icon.classList.add('fa-check');
      
      // 애니메이션 효과 추가
      icon.style.transform = 'scale(1.3)';
      setTimeout(() => {
        icon.style.transform = '';
      }, 300);
    } else {
      // 장바구니에서 제거 - 원래 아이콘으로
      icon.classList.remove('fa-check');
      icon.classList.add('fa-shopping-cart');
    }
  });
}

// 알림 메시지 표시 함수
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

// 장바구니 개수 업데이트 함수
function updateCartCount() {
  const cart = getCartFromStorage();
  let totalItems = 0;
  
  // 모든 상품의 수량 합산
  cart.forEach(item => {
    totalItems += (item.quantity || 1);
  });
  
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(element => {
    element.textContent = totalItems;
  });
  
  console.log('장바구니 개수 업데이트:', totalItems);
}

// 장바구니 버튼 클릭 이벤트 핸들러
function cartButtonClickHandler(e) {
  e.preventDefault(); // 기본 링크 동작 방지
  e.stopPropagation(); // 이벤트 버블링 방지
  console.log('장바구니 버튼 클릭됨');
  
  // 상품 데이터 가져오기
  const productItem = this.closest('.product-item') || this.closest('.cart-item');
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
  
  // 장바구니에 추가 (이미 있더라도 수량 증가)
  addToCart(product);
  
  // 상품의 모든 장바구니 아이콘 업데이트 - 항상 체크 아이콘으로
  updateCartIcons(productItem, true);
  
  console.log('장바구니에 추가됨:', productId);
}

// 장바구니 버튼 초기화 함수
function initCartButtons() {
  // 상품 카드의 장바구니 버튼들 찾기
  const cartButtons = document.querySelectorAll('.cart-btn, .cart-btn-bottom');
  
  console.log('[디버깅] 장바구니 버튼 초기화 시작:', cartButtons.length + '개 발견');
  
  cartButtons.forEach(button => {
    // 중요: 기존에 등록된 이벤트 리스너를 모두 제거
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    button = newButton;
    
    // 상품 정보 가져오기
    const productItem = button.closest('.product-item') || button.closest('.cart-item');
    if (!productItem) {
      console.log('[디버깅] 상품 아이템을 찾을 수 없습니다:', button);
      return;
    }
    
    const productId = productItem.dataset.id || productItem.getAttribute('data-id');
    console.log('[디버깅] 버튼의 상품 ID:', productId);
    
    // 이미 장바구니에 있는지 확인하고 아이콘 상태 초기화
    if (isInCart(productId)) {
      const icon = button.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-shopping-cart');
        icon.classList.add('fa-check');
        console.log('[디버깅] 장바구니 상태 초기화:', productId);
      }
    }
    
    // 클릭 이벤트만 설정하고 자동 추가는 하지 않음
    button.addEventListener('click', cartButtonClickHandler);
  });
  
  console.log('[디버깅] 장바구니 버튼 초기화 완료');
  
  // 장바구니 개수 업데이트
  updateCartCount();
}

// 전역 장바구니 이벤트 초기화
function initGlobalCartEvents() {
  console.log('전역 장바구니 이벤트 초기화');
  
  // 초기 장바구니 개수 업데이트
  updateCartCount();
}

// DOM이 로드된 후 초기화 함수 실행
document.addEventListener('DOMContentLoaded', function() {
  console.log('장바구니 기능 초기화');
  
  // 장바구니 버튼 초기화
  initCartButtons();
  
  // 장바구니 개수 업데이트
  updateCartCount();
});

// 전역 함수로 등록 (다른 스크립트에서 사용할 수 있도록)
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.isInCart = isInCart;
window.getCartFromStorage = getCartFromStorage;
window.updateCartCount = updateCartCount;
window.initCartButtons = initCartButtons;