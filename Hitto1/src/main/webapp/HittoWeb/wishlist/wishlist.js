// 위시리스트 페이지 스크립트
document.addEventListener('DOMContentLoaded', function() {
    // 초기화
    loadWishlistItems();
    initEvents();
    initRecommendedItemsState();
});

// 위시리스트 아이템 로드
function loadWishlistItems() {
    // 로컬스토리지에서 위시리스트 데이터 가져오기
    const wishlistItems = getWishlistFromStorage();
    
    // UI 업데이트
    updateWishlistUI(wishlistItems);
}

// 위시리스트 UI 업데이트
function updateWishlistUI(items) {
    const emptyWishlist = document.getElementById('empty-wishlist');
    const wishlistItems = document.getElementById('wishlist-items');
    const wishlistControls = document.querySelector('.wishlist-controls');
    
    // 위시리스트가 비어있을 경우
    if (!items || items.length === 0) {
        emptyWishlist.style.display = 'flex';
        wishlistItems.style.display = 'none';
        wishlistControls.style.display = 'none';
        return;
    }
    
    // 위시리스트에 아이템이 있는 경우
    emptyWishlist.style.display = 'none';
    wishlistItems.style.display = 'grid';
    wishlistControls.style.display = 'flex';
    
    // 위시리스트 아이템 목록 비우기
    wishlistItems.innerHTML = '';
    
    // 각 위시리스트 아이템 렌더링
    items.forEach(item => {
        const itemElement = createWishlistItemElement(item);
        wishlistItems.appendChild(itemElement);
    });
    
    // 아이템 선택 이벤트 초기화
    initSelectedItems();
}

// 위시리스트 아이템 엘리먼트 생성
function createWishlistItemElement(product) {
    const item = document.createElement('div');
    item.className = 'wishlist-item';
    item.setAttribute('data-id', product.id);
    
    // 할인율 계산
    let discountRate = '';
    let originalPriceHTML = '';
    
    if (product.priceNormal && product.priceSale) {
        const priceNormal = parseInt(product.priceNormal.replace(/[^0-9]/g, ''));
        const priceSale = parseInt(product.priceSale.replace(/[^0-9]/g, ''));
        
        if (priceNormal > priceSale) {
            discountRate = Math.round((priceNormal - priceSale) / priceNormal * 100);
            discountRate = `<span class="discount">${discountRate}%</span>`;
            originalPriceHTML = `<span class="original-price">${product.priceNormal}</span>`;
        }
    }
    
    // 브랜드 추출 (상품명에서 첫 단어를 브랜드로 사용)
    const brandMatch = product.title.match(/^(\S+)/);
    const brand = brandMatch ? brandMatch[1] : '';
    
    // HTML 구성
    item.innerHTML = `
        <div class="item-remove">
            <button type="button" class="remove-btn" aria-label="삭제">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="item-image">
            <img src="${product.image}" alt="${product.title}">
            <div class="add-cart-overlay">
                <button class="add-to-cart-btn">장바구니에 담기</button>
            </div>
        </div>
        <div class="item-info">
            <p class="item-brand">${brand}</p>
            <h3 class="item-name">${product.title}</h3>
            <p class="item-price">
                ${discountRate}
                <span class="price">${product.priceSale}</span>
                ${originalPriceHTML}
            </p>
        </div>
    `;
    
    return item;
}

// 이벤트 리스너 초기화
function initEvents() {
    // 제거 버튼 이벤트 위임 (동적으로 생성된 요소에도 동작)
    document.addEventListener('click', function(e) {
        const removeBtn = e.target.closest('.remove-btn');
        if (removeBtn) {
            const wishlistItem = removeBtn.closest('.wishlist-item');
            const productId = wishlistItem.getAttribute('data-id');
            
            // 애니메이션 효과와 함께 아이템 제거
            wishlistItem.style.opacity = '0';
            wishlistItem.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                // 위시리스트에서 제거
                removeFromWishlist(productId);
                
                // UI 업데이트
                loadWishlistItems();
            }, 300);
        }
    });
    
    // 장바구니에 담기 버튼 이벤트 위임
    document.addEventListener('click', function(e) {
        const addToCartBtn = e.target.closest('.add-to-cart-btn');
        if (addToCartBtn) {
            const wishlistItem = addToCartBtn.closest('.wishlist-item');
            const productId = wishlistItem.getAttribute('data-id');
            
            // 위시리스트에서 해당 상품 정보 가져오기
            const wishlist = getWishlistFromStorage();
            const product = wishlist.find(item => item.id === productId);
            
            if (product) {
                // 장바구니에 추가
                addToCart(product);
                
                // 버튼 효과
                addToCartBtn.textContent = '장바구니에 추가됨';
                addToCartBtn.style.backgroundColor = '#2ecc71';
                
                // 3초 후 버튼 원상 복구
                setTimeout(() => {
                    addToCartBtn.textContent = '장바구니에 담기';
                    addToCartBtn.style.backgroundColor = '';
                }, 3000);
            }
        }
    });
    
    // 모든 상품 선택/해제 버튼
    const selectAllBtn = document.getElementById('select-all-btn');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', function() {
            const wishlistItems = document.querySelectorAll('.wishlist-item');
            const isAllSelected = this.querySelector('i').classList.contains('fa-check-square');
            
            wishlistItems.forEach(item => {
                if (isAllSelected) {
                    // 모두 선택 해제
                    item.classList.remove('selected');
                    this.querySelector('i').classList.remove('fa-check-square');
                    this.querySelector('i').classList.add('fa-square');
                    this.innerHTML = '<i class="far fa-square"></i> 전체선택';
                } else {
                    // 모두 선택
                    item.classList.add('selected');
                    this.querySelector('i').classList.remove('fa-square');
                    this.querySelector('i').classList.add('fa-check-square');
                    this.innerHTML = '<i class="far fa-check-square"></i> 전체해제';
                }
            });
        });
    }
    
    // 선택 상품 삭제 버튼
    const removeSelectedBtn = document.getElementById('remove-selected-btn');
    if (removeSelectedBtn) {
        removeSelectedBtn.addEventListener('click', function() {
            const selectedItems = document.querySelectorAll('.wishlist-item.selected');
            
            if (selectedItems.length === 0) {
                showNotification('선택된 상품이 없습니다.');
                return;
            }
            
            // 선택된 상품들 위시리스트에서 제거
            const removedCount = selectedItems.length;
            selectedItems.forEach(item => {
                const productId = item.getAttribute('data-id');
                removeFromWishlist(productId);
            });
            
            // UI 업데이트
            loadWishlistItems();
            
            // 전체선택 버튼 초기화
            const selectAllBtn = document.getElementById('select-all-btn');
            if (selectAllBtn) {
                selectAllBtn.querySelector('i').classList.remove('fa-check-square');
                selectAllBtn.querySelector('i').classList.add('fa-square');
                selectAllBtn.innerHTML = '<i class="far fa-square"></i> 전체선택';
            }
            
            showNotification(`${removedCount}개 상품이 위시리스트에서 제거되었습니다.`);
        });
    }
    
    // 선택 상품 장바구니 담기 버튼
    const addSelectedToCartBtn = document.getElementById('add-selected-to-cart');
    if (addSelectedToCartBtn) {
        addSelectedToCartBtn.addEventListener('click', function() {
            const selectedItems = document.querySelectorAll('.wishlist-item.selected');
            
            if (selectedItems.length === 0) {
                showNotification('선택된 상품이 없습니다.');
                return;
            }
            
            // 위시리스트 데이터 가져오기
            const wishlist = getWishlistFromStorage();
            
            // 선택된 상품들 장바구니에 추가
            let addedCount = 0;
            selectedItems.forEach(item => {
                const productId = item.getAttribute('data-id');
                const product = wishlist.find(p => p.id === productId);
                
                if (product) {
                    addToCart(product);
                    addedCount++;
                    
                    // 효과 표시
                    item.style.borderColor = '#2ecc71';
                    setTimeout(() => {
                        item.style.borderColor = '';
                    }, 1500);
                }
            });
            
            showNotification(`${addedCount}개 상품이 장바구니에 추가되었습니다.`);
        });
    }
    
    // 전체 상품 장바구니 담기 버튼
    const addAllToCartBtn = document.getElementById('add-all-to-cart');
    if (addAllToCartBtn) {
        addAllToCartBtn.addEventListener('click', function() {
            // 위시리스트 데이터 가져오기
            const wishlist = getWishlistFromStorage();
            
            if (wishlist.length === 0) {
                showNotification('위시리스트에 상품이 없습니다.');
                return;
            }
            
            // 모든 상품 장바구니에 추가
            wishlist.forEach(product => {
                addToCart(product);
            });
            
            // 모든 아이템에 효과 표시
            const wishlistItems = document.querySelectorAll('.wishlist-item');
            wishlistItems.forEach(item => {
                item.style.borderColor = '#2ecc71';
                setTimeout(() => {
                    item.style.borderColor = '';
                }, 1500);
            });
            
            showNotification(`${wishlist.length}개 상품이 장바구니에 추가되었습니다.`);
        });
    }
    
    // 추천 상품의 위시리스트 아이콘 이벤트
    const wishlistIcons = document.querySelectorAll('.recommended-item .wishlist-icon');
    wishlistIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 이벤트 방지
            const heartIcon = this.querySelector('i');
            const recommendedItem = this.closest('.recommended-item');
            const itemName = recommendedItem.querySelector('.item-name').textContent;
            const itemBrand = recommendedItem.querySelector('.item-brand').textContent;
            const itemPrice = recommendedItem.querySelector('.item-price').textContent;
            const itemImage = recommendedItem.querySelector('img').src;
            
            // 상품 ID 생성 (브랜드와 상품명 조합)
            const productId = 'rec_' + itemBrand.toLowerCase().replace(/\s+/g, '') + '_' + 
                              itemName.toLowerCase().replace(/\s+/g, '').substring(0, 10);
            
            // 상품 객체 생성
            const product = {
                id: productId,
                title: itemName,
                image: itemImage,
                priceSale: itemPrice,
                priceNormal: itemPrice,
                badges: []
            };
            
            const isInWishlist = heartIcon.classList.contains('fas');
            
            if (isInWishlist) {
                // 위시리스트에서 제거
                removeFromWishlist(productId);
                
                // 아이콘 업데이트
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                heartIcon.style.color = '';
            } else {
                // 위시리스트에 추가
                addToWishlist(product);
                
                // 아이콘 업데이트
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                heartIcon.style.color = '#e74c3c';
                
                // 애니메이션 효과 추가
                heartIcon.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    heartIcon.style.transform = '';
                }, 300);
            }
        });
    });
}

// 아이템 선택 기능 초기화
function initSelectedItems() {
    const wishlistItems = document.querySelectorAll('.wishlist-item');
    
    wishlistItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 삭제 버튼이나 장바구니 버튼을 클릭했을 때는 선택/해제 작동 안 함
            if (e.target.closest('.remove-btn') || e.target.closest('.add-to-cart-btn')) {
                return;
            }
            
            this.classList.toggle('selected');
            
            // 모든 아이템이 선택되었는지 확인
            const allItems = document.querySelectorAll('.wishlist-item');
            const selectedItems = document.querySelectorAll('.wishlist-item.selected');
            const selectAllBtn = document.getElementById('select-all-btn');
            
            if (selectedItems.length === allItems.length) {
                // 모든 아이템이 선택된 경우, 전체선택 버튼 상태 변경
                selectAllBtn.querySelector('i').classList.remove('fa-square');
                selectAllBtn.querySelector('i').classList.add('fa-check-square');
                selectAllBtn.innerHTML = '<i class="far fa-check-square"></i> 전체해제';
            } else {
                // 일부만 선택된 경우
                selectAllBtn.querySelector('i').classList.remove('fa-check-square');
                selectAllBtn.querySelector('i').classList.add('fa-square');
                selectAllBtn.innerHTML = '<i class="far fa-square"></i> 전체선택';
            }
        });
    });
}

// 로컬스토리지에서 위시리스트 데이터 가져오기
function getWishlistFromStorage() {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
}

// 알림 메시지 표시
function showNotification(message) {
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

// 장바구니 수량 업데이트
function updateCartCount(addCount = 1) {
    const cartCountElement = document.querySelector('.cart-count');
    let currentCount = parseInt(cartCountElement.textContent) || 0;
    currentCount += addCount;
    cartCountElement.textContent = currentCount;
    
    // 수량 변경 효과
    cartCountElement.style.transform = 'scale(1.3)';
    cartCountElement.style.backgroundColor = '#e74c3c';
    
    setTimeout(() => {
        cartCountElement.style.transform = '';
        cartCountElement.style.backgroundColor = '';
    }, 500);
}

// 추천 상품 위시리스트 상태 초기화
function initRecommendedItemsState() {
    // 모든 추천 상품의 위시리스트 아이콘 가져오기
    const recommendedItems = document.querySelectorAll('.recommended-item');
    
    // 위시리스트 데이터 가져오기
    const wishlist = getWishlistFromStorage();
    
    recommendedItems.forEach(item => {
        const heartIcon = item.querySelector('.wishlist-icon i');
        const itemName = item.querySelector('.item-name').textContent;
        const itemBrand = item.querySelector('.item-brand').textContent;
        
        // 상품 ID 생성 (브랜드와 상품명 조합)
        const productId = 'rec_' + itemBrand.toLowerCase().replace(/\s+/g, '') + '_' + 
                          itemName.toLowerCase().replace(/\s+/g, '').substring(0, 10);
        
        // 이미 위시리스트에 있는지 확인
        const isInWishlist = wishlist.some(product => product.id === productId);
        
        if (isInWishlist) {
            // 위시리스트에 있으면 채워진 하트로 표시
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            heartIcon.style.color = '#e74c3c';
        } else {
            // 위시리스트에 없으면 빈 하트로 초기화
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            heartIcon.style.color = '';
        }
    });
} 