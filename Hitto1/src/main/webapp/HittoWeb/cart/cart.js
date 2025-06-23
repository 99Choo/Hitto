// 장바구니 페이지 스크립트
document.addEventListener('DOMContentLoaded', function() {
    // 초기화
    loadCartItems();
    initEvents();
    updateCartCount();
});

// 장바구니 아이템 로드
function loadCartItems() {
    // 로컬스토리지에서 장바구니 데이터 가져오기
    const cartItems = getCartFromStorage();
    
    // UI 업데이트
    updateCartUI(cartItems);
}

// 장바구니 UI 업데이트
function updateCartUI(items) {
    const emptyCart = document.getElementById('empty-cart');
    const cartItemsWrapper = document.getElementById('cart-items-wrapper');
    const cartItems = document.getElementById('cart-items');
    
    // 장바구니가 비어있을 경우
    if (!items || items.length === 0) {
        emptyCart.style.display = 'flex';
        cartItemsWrapper.style.display = 'none';
        return;
    }
    
    // 장바구니에 아이템이 있는 경우
    emptyCart.style.display = 'none';
    cartItemsWrapper.style.display = 'block';
    
    // 장바구니 아이템 목록 비우기
    cartItems.innerHTML = '';
    
    // 각 장바구니 아이템 렌더링
    items.forEach(item => {
        const itemElement = createCartItemElement(item);
        cartItems.appendChild(itemElement);
    });
    
    // 가격 정보 업데이트
    updateCartSummary();
}

// 장바구니 아이템 요소 생성 함수
function createCartItemElement(item) {
    // 필수 필드 확인
    if (!item || !item.id || !item.title || !item.priceSale) {
        console.error('잘못된 아이템 형식:', item);
        return document.createElement('div'); // 빈 요소 반환
    }
    
    // 상품 가격 처리
    const normalPrice = parseInt(item.priceNormal?.replace(/[^0-9]/g, '')) || 0;
    const salePrice = parseInt(item.priceSale.replace(/[^0-9]/g, '')) || normalPrice || 0;
    
    // 상품 할인율 계산
    let discountRate = 0;
    if (normalPrice > salePrice && normalPrice > 0) {
        discountRate = Math.floor((normalPrice - salePrice) / normalPrice * 100);
    }
    
    // 수량 확인 및 기본값 설정
    if (!item.quantity || item.quantity < 1) {
        item.quantity = 1;
    }
    
    // 아이템 요소 생성
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.id = item.id;
    
    // 소계 계산 (상품 가격 × 수량)
    const subtotal = salePrice * item.quantity;
    
    // 배송비 계산 (5만원 이상 무료배송)
    const FREE_DELIVERY_THRESHOLD = 50000;
    const DELIVERY_FEE = 3000;
    const deliveryText = subtotal >= FREE_DELIVERY_THRESHOLD ? '무료' : DELIVERY_FEE.toLocaleString() + '원';
    
    // HTML 내용 채우기
    cartItem.innerHTML = `
      <div class="cart-checkbox">
        <input type="checkbox" class="item-checkbox" checked>
      </div>
      <div class="cart-product">
        <img src="${item.image || '../images/logo.png'}" alt="${item.title}" class="cart-product-image" onerror="this.src='../images/logo.png'">
        <div class="cart-product-details">
          <p class="product-brand">브랜드</p>
          <h4 class="product-title">${item.title}</h4>
          <div class="product-badges">
            ${item.badges && Array.isArray(item.badges) ? item.badges.map(badge => 
              `<span class="badge ${badge.type || 'default'}">${badge.text || ''}</span>`
            ).join('') : ''}
            ${discountRate > 0 ? `<span class="badge discount">${discountRate}% 할인</span>` : ''}
          </div>
        </div>
      </div>
      <div class="quantity-control">
        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-id="${item.id}">
        <button class="quantity-btn increase" data-id="${item.id}">+</button>
      </div>
      <div class="cart-price">
        ${normalPrice !== salePrice && normalPrice > 0 ? `<span class="price-normal">${normalPrice.toLocaleString()}원</span>` : ''}
        <span class="price-sale">${salePrice.toLocaleString()}원</span>
      </div>
      <div class="cart-delivery">
        ${deliveryText}
      </div>
      <div class="cart-total">${subtotal.toLocaleString()}원</div>
      <div class="cart-actions">
        <button class="action-btn remove-btn" data-id="${item.id}">삭제</button>
        <button class="action-btn wishlist-btn-cart" data-id="${item.id}">위시리스트</button>
      </div>
    `;
    
    return cartItem;
}

// 빈 장바구니 화면 표시
function showEmptyCart() {
    document.getElementById('empty-cart').style.display = 'flex';
    document.getElementById('cart-items-wrapper').style.display = 'none';
}

// 로컬스토리지에서 장바구니 가져오기
function getCartFromStorage() {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
}

// 이벤트 리스너 초기화
function initEvents() {
    // 전체 선택 체크박스
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.item-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateCartSummary();
        });
    }
    
    // 이벤트 위임 방식으로 처리
    document.addEventListener('click', function(e) {
        // 수량 감소 버튼
        if (e.target.classList.contains('decrease')) {
            const productId = e.target.dataset.id;
            const inputElement = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            
            if (inputElement && inputElement.value > 1) {
                inputElement.value = parseInt(inputElement.value) - 1;
                updateItemQuantity(productId, parseInt(inputElement.value));
            }
        }
        
        // 수량 증가 버튼
        if (e.target.classList.contains('increase')) {
            const productId = e.target.dataset.id;
            const inputElement = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            
            if (inputElement && inputElement.value < 99) {
                inputElement.value = parseInt(inputElement.value) + 1;
                updateItemQuantity(productId, parseInt(inputElement.value));
            }
        }
        
        // 삭제 버튼
        if (e.target.classList.contains('remove-btn')) {
            const productId = e.target.dataset.id;
            removeCartItem(productId);
        }
        
        // 위시리스트 버튼
        if (e.target.classList.contains('wishlist-btn-cart')) {
            const productId = e.target.dataset.id;
            moveToWishlist(productId);
        }
    });
    
    // 수량 입력 필드 변경 시
    document.addEventListener('change', function(e) {
        // 개별 항목 체크박스 변경
        if (e.target.classList.contains('item-checkbox')) {
            // 모든 체크박스가 선택되었는지 확인
            const allCheckboxes = document.querySelectorAll('.item-checkbox');
            const allChecked = Array.from(allCheckboxes).every(checkbox => checkbox.checked);
            
            // 전체 선택 체크박스 상태 업데이트
            const selectAllCheckbox = document.getElementById('select-all-checkbox');
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
            }
            
            // 선택된 상품 금액 계산
            updateCartSummary();
        }
        
        // 수량 입력 필드 변경 시
        if (e.target.classList.contains('quantity-input')) {
            const productId = e.target.dataset.id;
            let quantity = parseInt(e.target.value) || 1;
            
            // 입력값 범위 제한
            if (quantity < 1) quantity = 1;
            if (quantity > 99) quantity = 99;
            
            e.target.value = quantity;
            updateItemQuantity(productId, quantity);
        }
    });
    
    // 선택 상품 삭제 버튼
    const removeSelectedBtn = document.getElementById('remove-selected-btn');
    if (removeSelectedBtn) {
        removeSelectedBtn.addEventListener('click', removeSelectedItems);
    }
    
    // 선택 상품 위시리스트에 담기 버튼
    const addSelectedToWishlistBtn = document.getElementById('add-selected-to-wishlist');
    if (addSelectedToWishlistBtn) {
        addSelectedToWishlistBtn.addEventListener('click', moveSelectedToWishlist);
    }
    
    // 쇼핑 계속하기 버튼
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            window.location.href = '../index.jsp';
        });
    }
    
    // 주문하기 버튼
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
}

// 선택된 상품 금액 계산 및 요약 정보 업데이트
function updateCartSummary() {
    const cart = getCartFromStorage();
    
    // 선택된 상품들만 필터링
    const selectedItems = getSelectedItems();
    
    // 총 상품 금액 계산
    let totalProductsPrice = 0;
    selectedItems.forEach(itemId => {
        const cartItem = cart.find(item => item.id === itemId);
        if (cartItem) {
            const price = parseInt(cartItem.priceSale.replace(/[^0-9]/g, '')) || 0;
            totalProductsPrice += price * cartItem.quantity;
        }
    });
    
    // 배송비 계산 (5만원 이상 무료배송)
    const FREE_DELIVERY_THRESHOLD = 50000;
    const DELIVERY_FEE = 3000;
    const deliveryPrice = totalProductsPrice >= FREE_DELIVERY_THRESHOLD || totalProductsPrice === 0 ? 0 : DELIVERY_FEE;
    
    // 최종 결제 예정 금액
    const totalPrice = totalProductsPrice + deliveryPrice;
    
    // UI 업데이트
    document.getElementById('total-products-price').textContent = totalProductsPrice.toLocaleString() + '원';
    document.getElementById('delivery-price').textContent = deliveryPrice > 0 ? deliveryPrice.toLocaleString() + '원' : '무료';
    document.getElementById('total-price').textContent = totalPrice.toLocaleString() + '원';
    
    // 장바구니 카운트 업데이트
    updateCartCount();
}

// 선택된 상품 ID 배열 반환
function getSelectedItems() {
    const selectedItems = [];
    const checkboxes = document.querySelectorAll('.item-checkbox');
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const cartItem = checkbox.closest('.cart-item');
            if (cartItem && cartItem.dataset.id) {
                selectedItems.push(cartItem.dataset.id);
            }
        }
    });
    
    return selectedItems;
}

// 상품 수량 업데이트
function updateItemQuantity(productId, quantity) {
    // 로컬스토리지에서 장바구니 가져오기
    let cart = getCartFromStorage();
    
    // 해당 상품 찾기
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        // 수량 업데이트
        cart[itemIndex].quantity = quantity;
        
        // 로컬스토리지에 저장
        localStorage.setItem('cartItems', JSON.stringify(cart));
        
        // UI 업데이트
        updateCartItemUI(productId, quantity);
        updateCartSummary();
    }
}

// 장바구니 항목 UI 업데이트
function updateCartItemUI(productId, quantity) {
    const cart = getCartFromStorage();
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    const itemElement = document.querySelector(`.cart-item[data-id="${productId}"]`);
    if (!itemElement) return;
    
    // 가격 정보
    const salePrice = parseInt(item.priceSale.replace(/[^0-9]/g, '')) || 0;
    const subtotal = salePrice * quantity;
    
    // 수량 필드 업데이트
    const quantityInput = itemElement.querySelector('.quantity-input');
    if (quantityInput) {
        quantityInput.value = quantity;
    }
    
    // 소계 업데이트
    const totalElement = itemElement.querySelector('.cart-total');
    if (totalElement) {
        totalElement.textContent = subtotal.toLocaleString() + '원';
    }
    
    // 배송비 업데이트
    const FREE_DELIVERY_THRESHOLD = 50000;
    const DELIVERY_FEE = 3000;
    const deliveryElement = itemElement.querySelector('.cart-delivery');
    if (deliveryElement) {
        deliveryElement.textContent = subtotal >= FREE_DELIVERY_THRESHOLD ? '무료' : DELIVERY_FEE.toLocaleString() + '원';
    }
}

// 장바구니 항목 삭제
function removeCartItem(productId) {
    // 로컬스토리지에서 장바구니 가져오기
    let cart = getCartFromStorage();
    
    // 제거할 상품 찾기
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        // 해당 상품 제거
        const removedItem = cart.splice(itemIndex, 1)[0];
        
        // 로컬스토리지에 저장
        localStorage.setItem('cartItems', JSON.stringify(cart));
        
        // UI에서 제거 (애니메이션 추가)
        const itemElement = document.querySelector(`.cart-item[data-id="${productId}"]`);
        if (itemElement) {
            itemElement.style.opacity = '0';
            itemElement.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                itemElement.remove();
                
                // 장바구니가 비었는지 확인
                if (cart.length === 0) {
                    showEmptyCart();
                }
                
                // 업데이트
                updateCartSummary();
            }, 300);
        }
        
        // 알림 메시지 표시
        showNotification(`"${removedItem.title}" 상품이 장바구니에서 제거되었습니다.`);
    }
}

// 상품을 위시리스트로 이동
function moveToWishlist(productId) {
    // 로컬스토리지에서 장바구니 가져오기
    let cart = getCartFromStorage();
    
    // 이동할 상품 찾기
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        const product = cart[itemIndex];
        
        // 위시리스트에 추가
        if (typeof window.addToWishlist === 'function') {
            window.addToWishlist(product);
            
            // 장바구니에서 제거
            cart.splice(itemIndex, 1);
            
            // 로컬스토리지에 저장
            localStorage.setItem('cartItems', JSON.stringify(cart));
            
            // UI에서 제거 (애니메이션 추가)
            const itemElement = document.querySelector(`.cart-item[data-id="${productId}"]`);
            if (itemElement) {
                itemElement.style.opacity = '0';
                itemElement.style.transform = 'translateX(20px)';
                
                setTimeout(() => {
                    itemElement.remove();
                    
                    // 장바구니가 비었는지 확인
                    if (cart.length === 0) {
                        showEmptyCart();
                    }
                    
                    // 업데이트
                    updateCartSummary();
                }, 300);
            }
            
            // 알림 메시지 표시
            showNotification(`"${product.title}" 상품이 위시리스트로 이동되었습니다.`);
        } else {
            alert('위시리스트 기능을 사용할 수 없습니다.');
        }
    }
}

// 선택된 상품 삭제
function removeSelectedItems() {
    const selectedItems = getSelectedItems();
    
    if (selectedItems.length === 0) {
        showNotification('선택된 상품이 없습니다.');
        return;
    }
    
    if (confirm('선택한 상품을 장바구니에서 삭제하시겠습니까?')) {
        // 로컬스토리지에서 장바구니 가져오기
        let cart = getCartFromStorage();
        
        // 선택되지 않은 상품만 필터링
        cart = cart.filter(item => !selectedItems.includes(item.id));
        
        // 로컬스토리지에 저장
        localStorage.setItem('cartItems', JSON.stringify(cart));
        
        // 장바구니 UI 새로고침
        loadCartItems();
        
        // 알림 메시지 표시
        showNotification(`${selectedItems.length}개 상품이 장바구니에서 제거되었습니다.`);
    }
}

// 선택된 상품을 위시리스트로 이동
function moveSelectedToWishlist() {
    const selectedItems = getSelectedItems();
    
    if (selectedItems.length === 0) {
        showNotification('선택된 상품이 없습니다.');
        return;
    }
    
    // 위시리스트 함수 확인
    if (typeof window.addToWishlist !== 'function') {
        alert('위시리스트 기능을 사용할 수 없습니다.');
        return;
    }
    
    if (confirm('선택한 상품을 위시리스트로 이동하시겠습니까?')) {
        // 로컬스토리지에서 장바구니 가져오기
        let cart = getCartFromStorage();
        
        // 위시리스트로 이동할 상품 찾기
        const itemsToMove = cart.filter(item => selectedItems.includes(item.id));
        
        // 각 상품을 위시리스트에 추가
        itemsToMove.forEach(item => {
            window.addToWishlist(item);
        });
        
        // 장바구니에서 선택된 상품 제거
        cart = cart.filter(item => !selectedItems.includes(item.id));
        
        // 로컬스토리지에 저장
        localStorage.setItem('cartItems', JSON.stringify(cart));
        
        // 장바구니 UI 새로고침
        loadCartItems();
        
        // 알림 메시지 표시
        showNotification(`${itemsToMove.length}개 상품이 위시리스트로 이동되었습니다.`);
    }
}

// 결제 진행하기
function proceedToCheckout() {
    const selectedItems = getSelectedItems();
    
    if (selectedItems.length === 0) {
        showNotification('선택된 상품이 없습니다.');
        return;
    }
    
    // 결제 페이지가 아직 없으므로 알림만 표시
    alert('주문 및 결제 페이지는 현재 개발 중입니다.');
}

// 장바구니 개수 업데이트
function updateCartCount() {
    const cart = getCartFromStorage();
    let totalItems = 0;
    
    // 모든 상품의 수량 합산
    cart.forEach(item => {
        totalItems += (item.quantity || 1);
    });
    
    // 헤더의 장바구니 카운트 업데이트
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// 알림 메시지 표시
function showNotification(message) {
    // 기존 토스트 메시지 요소가 있으면 제거
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 토스트 메시지 요소 생성
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