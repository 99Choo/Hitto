/**
 * HittoStore 상품 상세 페이지 JavaScript
 */

// 전역 변수
let currentProduct = null;
let currentQuantity = 1;
let productImages = [];
let currentImageIndex = 0;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  // URL에서 상품 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    showErrorMessage('상품 정보를 찾을 수 없습니다.');
    return;
  }
  
  // 상품 데이터 로드
  loadProductData(productId);
  
  // 탭 메뉴 이벤트 리스너 등록
  initTabMenu();
  
  // 수량 버튼 이벤트 등록
  initQuantityControls();
  
  // 이미지 확대 모달 이벤트 등록
  initImageModal();
  
  // 장바구니, 구매하기 버튼 이벤트 등록
  initActionButtons();
});

// 상품 데이터 로드 함수
function loadProductData(productId) {
  // 실제 환경에서는 서버에서 데이터를 가져오지만, 여기서는 예시 데이터 사용
  const allProducts = getAllProducts();
  
  // 모든 카테고리에서 상품 ID로 검색
  for (const category in allProducts) {
    const product = allProducts[category].find(item => item.id === productId);
    if (product) {
      currentProduct = product;
      break;
    }
  }
  
  if (!currentProduct) {
    showErrorMessage('상품 정보를 찾을 수 없습니다.');
    return;
  }
  
  // 상품 정보 렌더링
  renderProductDetails();
  
  // 카테고리 링크 업데이트
  updateCategoryLink();
  
  // 관련 상품 렌더링
  renderRelatedProducts();
  
  console.log('상품 데이터 로드 완료:', currentProduct);
}

// 모든 상품 데이터 가져오기
function getAllProducts() {
  // 메인 카테고리 상품 데이터 가져오기
  const productData = window.products || {};
  
  // 베스트 상품 및 신상품 데이터 추가
  const allProducts = { ...productData };
  
  // 베스트 상품 데이터 추가
  if (window.getAllBestProducts && typeof window.getAllBestProducts === 'function') {
    try {
      const bestProducts = window.getAllBestProducts();
      if (bestProducts && bestProducts.length) {
        allProducts.best = bestProducts;
      }
    } catch (error) {
      console.error('베스트 상품 데이터 로드 실패:', error);
    }
  } else {
    // 직접 베스트 상품 데이터를 객체에 추가
    if (Array.isArray(window.bestProducts)) {
      allProducts.best = window.bestProducts;
    }
  }
  
  // 신상품 데이터 추가
  if (Array.isArray(window.newProducts)) {
    allProducts.new = window.newProducts;
  }
  
  console.log('모든 상품 데이터 로드 완료:', {
    카테고리: Object.keys(productData),
    베스트상품: allProducts.best ? allProducts.best.length : 0,
    신상품: allProducts.new ? allProducts.new.length : 0
  });
  
  return allProducts;
}

// 상품 상세 정보 렌더링
function renderProductDetails() {
  // 기본 정보 업데이트
  document.getElementById('product-name').textContent = currentProduct.title;
  document.getElementById('product-title').textContent = currentProduct.title;
  document.getElementById('main-product-image').src = getFixedImagePath(currentProduct.image);
  document.getElementById('main-product-image').alt = currentProduct.title;
  
  // 가격 정보 업데이트
  document.getElementById('price-sale').textContent = currentProduct.priceSale.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  if (currentProduct.priceNormal) {
    document.getElementById('price-normal').textContent = currentProduct.priceNormal.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // 할인율 계산 및 표시
    const salePrice = parseInt(currentProduct.priceSale.replace(/[^\d]/g, ''));
    const normalPrice = parseInt(currentProduct.priceNormal.replace(/[^\d]/g, ''));
    const discountRate = Math.round((normalPrice - salePrice) / normalPrice * 100);
    
    document.getElementById('discount-rate').textContent = `${discountRate}%`;
  } else {
    document.getElementById('price-normal').style.display = 'none';
    document.getElementById('discount-rate').style.display = 'none';
  }
  
  // 총 가격 업데이트
  updateTotalPrice();
  
  // 배지 렌더링
  renderBadges();
  
  // 상품 상세 정보 탭 내용 업데이트
  renderProductDescription();
  
  // 상품 정보 탭 업데이트
  document.getElementById('info-product-name').textContent = currentProduct.title;
  document.getElementById('info-manufacturer').textContent = currentProduct.manufacturer || '자체제작';
  document.getElementById('info-origin').textContent = currentProduct.origin || '대한민국';
  document.getElementById('info-brand').textContent = currentProduct.brand || 'HittoStore';
  
  // 별점 렌더링
  renderRating(currentProduct.rating || 4.5, currentProduct.reviewCount || 0);
  
  // 이미지 갤러리 설정
  setupProductImages();
  
  // 옵션 렌더링
  renderProductOptions();
}

// 상품 배지 렌더링
function renderBadges() {
  const badgesContainer = document.getElementById('product-badges');
  badgesContainer.innerHTML = '';
  
  if (!currentProduct.badges || !currentProduct.badges.length) {
    return;
  }
  
  currentProduct.badges.forEach(badge => {
    const badgeElement = document.createElement('span');
    badgeElement.className = `product-badge ${badge.type}`;
    badgeElement.textContent = badge.text;
    badgesContainer.appendChild(badgeElement);
  });
}

// 별점 렌더링
function renderRating(rating, reviewCount) {
  const starsContainer = document.getElementById('product-stars');
  const reviewCountElement = document.getElementById('review-count');
  
  // 평균 별점 표시
  document.getElementById('average-score').textContent = rating.toFixed(1);
  document.getElementById('total-review-count').textContent = reviewCount;
  
  // 별점 아이콘 생성
  starsContainer.innerHTML = '';
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  
  for (let i = 1; i <= 5; i++) {
    const starIcon = document.createElement('i');
    
    if (i <= fullStars) {
      starIcon.className = 'fas fa-star';
    } else if (i === fullStars + 1 && halfStar) {
      starIcon.className = 'fas fa-star-half-alt';
    } else {
      starIcon.className = 'far fa-star';
    }
    
    starsContainer.appendChild(starIcon);
  }
  
  // 리뷰 수 표시
  reviewCountElement.textContent = `(${reviewCount}개 리뷰)`;
  
  // 리뷰 탭의 별점 표시
  const reviewStarsContainer = document.getElementById('review-stars');
  reviewStarsContainer.innerHTML = starsContainer.innerHTML;
}

// 상품 이미지 갤러리 설정
function setupProductImages() {
  // 예시: 실제로는 서버에서 여러 이미지를 가져와야 함
  productImages = [
    { src: currentProduct.image, alt: currentProduct.title }
  ];
  
  // 추가 이미지 (여러 각도에서 찍은 이미지)
  if (currentProduct.additionalImages && currentProduct.additionalImages.length) {
    productImages = productImages.concat(currentProduct.additionalImages);
  } else {
    // 추가 이미지가 없으면 샘플 이미지 추가 (실제 구현에서는 제거)
    const basePath = currentProduct.image.substring(0, currentProduct.image.lastIndexOf('/') + 1);
    const extension = currentProduct.image.substring(currentProduct.image.lastIndexOf('.'));
    
    // 예시 이미지 추가 (실제로는 서버에서 가져옴)
    for (let i = 1; i <= 3; i++) {
      productImages.push({
        src: `${basePath}sample${i}${extension}`,
        alt: `${currentProduct.title} - 추가 이미지 ${i}`
      });
    }
  }
  
  // 썸네일 생성
  const thumbnailList = document.querySelector('.product-thumbnail-list');
  thumbnailList.innerHTML = '';
  
  productImages.forEach((image, index) => {
    const thumbnail = document.createElement('div');
    thumbnail.className = `product-thumbnail ${index === 0 ? 'active' : ''}`;
    thumbnail.dataset.index = index;
    
    const img = document.createElement('img');
    img.src = getFixedImagePath(image.src);
    img.alt = image.alt;
    
    thumbnail.appendChild(img);
    thumbnailList.appendChild(thumbnail);
    
    // 썸네일 클릭 이벤트
    thumbnail.addEventListener('click', function() {
      currentImageIndex = parseInt(this.dataset.index);
      updateMainImage();
      updateThumbnailSelection();
    });
  });
}

// 메인 이미지 업데이트
function updateMainImage() {
  const mainImage = document.getElementById('main-product-image');
  mainImage.src = getFixedImagePath(productImages[currentImageIndex].src);
  mainImage.alt = productImages[currentImageIndex].alt;
}

// 썸네일 선택 상태 업데이트
function updateThumbnailSelection() {
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  thumbnails.forEach((thumb, index) => {
    if (index === currentImageIndex) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// 상품 상세 설명 렌더링
function renderProductDescription() {
  const descriptionContainer = document.querySelector('#product-description .product-description-content');
  
  if (currentProduct.description) {
    descriptionContainer.innerHTML = currentProduct.description;
  } else {
    // 샘플 상세 설명 (실제로는 서버에서 가져옴)
    descriptionContainer.innerHTML = `
      <h2>${currentProduct.title}</h2>
      <p>이 상품은 HittoStore에서 엄선한 최고 품질의 제품입니다.</p>
      <img src="${getFixedImagePath(currentProduct.image)}" alt="${currentProduct.title}" style="max-width: 100%; margin: 20px 0;">
      <p>제품 특징:</p>
      <ul>
        <li>고품질 소재 사용</li>
        <li>내구성이 뛰어남</li>
        <li>다양한 환경에서 사용 가능</li>
        <li>세련된 디자인</li>
      </ul>
      <p>자세한 상품 정보는 상품 정보 탭을 참고해주세요.</p>
    `;
  }
}

// 상품 옵션 렌더링
function renderProductOptions() {
  const optionContainer = document.getElementById('option-container');
  
  if (!currentProduct.options || !currentProduct.options.length) {
    // 옵션이 없는 경우 기본 옵션 추가
    optionContainer.innerHTML = `
      <div class="info-row">
        <span class="info-label">옵션</span>
        <span class="info-value">기본</span>
      </div>
    `;
    return;
  }
  
  // 옵션이 있는 경우 셀렉트 박스 생성
  optionContainer.innerHTML = '';
  
  currentProduct.options.forEach(option => {
    const optionRow = document.createElement('div');
    optionRow.className = 'option-row';
    
    const optionSelect = document.createElement('select');
    optionSelect.className = 'option-select';
    
    // 기본 옵션
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = `${option.name} 선택`;
    defaultOption.disabled = true;
    defaultOption.selected = true;
    optionSelect.appendChild(defaultOption);
    
    // 옵션 항목 추가
    option.values.forEach(value => {
      const optionItem = document.createElement('option');
      optionItem.value = value.id;
      optionItem.textContent = value.name + (value.price ? ` (+${value.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')})` : '');
      optionSelect.appendChild(optionItem);
    });
    
    optionRow.appendChild(optionSelect);
    optionContainer.appendChild(optionRow);
    
    // 옵션 변경 이벤트
    optionSelect.addEventListener('change', updateTotalPrice);
  });
}

// 관련 상품 렌더링
function renderRelatedProducts() {
  const relatedProductsList = document.getElementById('related-product-list');
  
  // 관련 상품 가져오기 (실제로는 서버에서 가져옴)
  const allProducts = getAllProducts();
  let relatedProducts = [];
  
  // 같은 카테고리의 상품 중 현재 상품을 제외한 4개 선택
  for (const category in allProducts) {
    const categoryProducts = allProducts[category].filter(item => item.id !== currentProduct.id);
    relatedProducts = relatedProducts.concat(categoryProducts);
    
    if (relatedProducts.length >= 8) {
      break;
    }
  }
  
  // 최대 4개만 표시
  relatedProducts = relatedProducts.slice(0, 4);
  
  // 관련 상품 없음 처리
  if (relatedProducts.length === 0) {
    relatedProductsList.innerHTML = '<p class="no-related-products">관련 상품이 없습니다.</p>';
    return;
  }
  
  // 관련 상품 렌더링
  relatedProductsList.innerHTML = '';
  
  relatedProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product-item';
    productElement.dataset.id = product.id;
    
    productElement.innerHTML = `
      <div class="product-thumb">
        <img src="${getFixedImagePath(product.image)}" alt="${product.title}">
        <div class="product-badges">
          ${renderRelatedProductBadges(product.badges)}
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">
          <span class="price-sale">${product.priceSale}</span>
          ${product.priceNormal ? `<span class="price-normal">${product.priceNormal}</span>` : ''}
        </div>
      </div>
    `;
    
    relatedProductsList.appendChild(productElement);
    
    // 관련 상품 클릭 이벤트
    productElement.addEventListener('click', function() {
      window.location.href = `detail.jsp?id=${product.id}`;
    });
  });
}

// 관련 상품 배지 렌더링 헬퍼 함수
function renderRelatedProductBadges(badges) {
  if (!badges || !badges.length) {
    return '';
  }
  
  return badges.map(badge => `<span class="badge ${badge.type}">${badge.text}</span>`).join('');
}

// 카테고리 링크 업데이트
function updateCategoryLink() {
  // 현재 상품의 카테고리 찾기
  let productCategory = '';
  const allProducts = getAllProducts();
  
  for (const category in allProducts) {
    if (allProducts[category].some(item => item.id === currentProduct.id)) {
      productCategory = category;
      break;
    }
  }
  
  // 카테고리 링크 업데이트
  const categoryLink = document.getElementById('category-link');
  categoryLink.href = `../category/category.jsp?type=${productCategory}`;
  
  // 카테고리 이름 변환
  let categoryName = '카테고리';
  switch (productCategory) {
    case 'glove':
      categoryName = '글러브/미트';
      break;
    case 'bat':
      categoryName = '배트';
      break;
    case 'ball':
      categoryName = '야구공';
      break;
    case 'clothing':
      categoryName = '의류/잠바';
      break;
    case 'shoes':
      categoryName = '신발/스파이크';
      break;
    case 'equipment':
      categoryName = '장비용품';
      break;
  }
  
  categoryLink.textContent = categoryName;
}

// 탭 메뉴 초기화
function initTabMenu() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 현재 활성화된 탭 제거
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // 클릭한 탭 활성화
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// 수량 조절 초기화
function initQuantityControls() {
  const minusBtn = document.getElementById('quantity-minus');
  const plusBtn = document.getElementById('quantity-plus');
  const quantityInput = document.getElementById('quantity');
  
  minusBtn.addEventListener('click', function() {
    if (currentQuantity > 1) {
      currentQuantity--;
      quantityInput.value = currentQuantity;
      updateTotalPrice();
    }
  });
  
  plusBtn.addEventListener('click', function() {
    if (currentQuantity < 10) {
      currentQuantity++;
      quantityInput.value = currentQuantity;
      updateTotalPrice();
    }
  });
  
  quantityInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }
    
    currentQuantity = value;
    this.value = value;
    updateTotalPrice();
  });
}

// 총 가격 업데이트
function updateTotalPrice() {
  if (!currentProduct) return;
  
  // 기본 가격 가져오기
  let basePrice = parseInt(currentProduct.priceSale.replace(/[^\d]/g, ''));
  
  // 옵션 가격 추가
  const optionSelects = document.querySelectorAll('.option-select');
  optionSelects.forEach(select => {
    if (select.value) {
      const option = select.options[select.selectedIndex];
      const optionPriceText = option.textContent.match(/\+([0-9,]+)원/);
      
      if (optionPriceText && optionPriceText[1]) {
        const optionPrice = parseInt(optionPriceText[1].replace(/,/g, ''));
        basePrice += optionPrice;
      }
    }
  });
  
  // 수량 적용
  const totalPrice = basePrice * currentQuantity;
  
  // 총 가격 표시
  document.getElementById('total-price').textContent = totalPrice.toLocaleString() + '원';
}

// 이미지 확대 모달 초기화
function initImageModal() {
  const mainImage = document.getElementById('main-product-image');
  const zoomIcon = document.querySelector('.zoom-icon');
  const imageModal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const closeModal = document.querySelector('.close-modal');
  
  // 이미지나 줌 아이콘 클릭 시 모달 열기
  [mainImage, zoomIcon].forEach(element => {
    element.addEventListener('click', function() {
      modalImage.src = mainImage.src;
      imageModal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    });
  });
  
  // 닫기 버튼 클릭 시 모달 닫기
  closeModal.addEventListener('click', function() {
    imageModal.style.display = 'none';
    document.body.style.overflow = ''; // 스크롤 복원
  });
  
  // 모달 배경 클릭 시 닫기
  imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
      imageModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}

// 장바구니, 구매하기 버튼 이벤트 초기화
function initActionButtons() {
  // 장바구니 담기 버튼
  const addCartBtn = document.getElementById('add-cart-btn');
  addCartBtn.addEventListener('click', function() {
    addToCart();
  });
  
  // 바로 구매하기 버튼
  const buyNowBtn = document.getElementById('buy-now-btn');
  buyNowBtn.addEventListener('click', function() {
    addToCart(true);
    window.location.href = '../cart/index.jsp';
  });
  
  // 위시리스트 버튼
  const wishlistBtn = document.getElementById('wishlist-btn');
  wishlistBtn.addEventListener('click', function() {
    toggleWishlist();
  });
  
  // 위시리스트 상태 확인 및 업데이트
  updateWishlistButton();
}

// 장바구니에 추가
function addToCart(buyNow = false) {
  if (!currentProduct) return;
  
  // 옵션 유효성 검사
  const optionSelects = document.querySelectorAll('.option-select');
  let allOptionsSelected = true;
  
  optionSelects.forEach(select => {
    if (!select.value) {
      allOptionsSelected = false;
    }
  });
  
  if (optionSelects.length > 0 && !allOptionsSelected) {
    showNotification('옵션을 모두 선택해주세요.');
    return;
  }
  
  // 옵션 정보 수집
  const selectedOptions = [];
  optionSelects.forEach(select => {
    if (select.value) {
      const option = select.options[select.selectedIndex];
      selectedOptions.push({
        id: select.value,
        name: option.textContent
      });
    }
  });
  
  // 장바구니에 추가할 상품 객체 생성
  const cartItem = {
    id: currentProduct.id,
    title: currentProduct.title,
    image: currentProduct.image,
    priceSale: currentProduct.priceSale,
    priceNormal: currentProduct.priceNormal,
    quantity: currentQuantity,
    options: selectedOptions,
    badges: currentProduct.badges || []
  };
  
  // 장바구니 함수 호출 (cart-functions.js에 정의된 함수)
  if (typeof window.addToCart === 'function') {
    window.addToCart(cartItem);
    
    if (!buyNow) {
      showNotification(`"${currentProduct.title}" 상품이 장바구니에 추가되었습니다.`);
    }
  } else {
    console.error('장바구니 함수를 찾을 수 없습니다!');
    showNotification('장바구니 기능에 문제가 발생했습니다. 새로고침 후 다시 시도해주세요.');
  }
}

// 위시리스트 토글
function toggleWishlist() {
  if (!currentProduct) return;
  
  // 위시리스트 함수 호출 (wishlist-functions.js에 정의된 함수)
  if (typeof window.toggleProductInWishlist === 'function') {
    window.toggleProductInWishlist(currentProduct);
    updateWishlistButton();
  } else {
    console.error('위시리스트 함수를 찾을 수 없습니다!');
    showNotification('위시리스트 기능에 문제가 발생했습니다. 새로고침 후 다시 시도해주세요.');
  }
}

// 위시리스트 버튼 상태 업데이트
function updateWishlistButton() {
  const wishlistBtn = document.getElementById('wishlist-btn');
  
  if (!currentProduct) return;
  
  // 위시리스트 상태 확인 (wishlist-functions.js에 정의된 함수)
  if (typeof window.isInWishlist === 'function') {
    const isWishlisted = window.isInWishlist(currentProduct.id);
    
    // 아이콘 업데이트
    wishlistBtn.innerHTML = isWishlisted 
      ? '<i class="fas fa-heart"></i>' 
      : '<i class="far fa-heart"></i>';
  }
}

// 알림 메시지 표시
function showNotification(message) {
  // main.js에 정의된 함수 사용
  if (typeof window.showNotification === 'function') {
    window.showNotification(message);
  } else {
    alert(message);
  }
}

// 에러 메시지 표시
function showErrorMessage(message) {
  const content = document.querySelector('.product-detail-content .container');
  content.innerHTML = `
    <div class="error-message">
      <i class="fas fa-exclamation-circle"></i>
      <h2>오류가 발생했습니다</h2>
      <p>${message}</p>
      <a href="../index.jsp" class="back-to-home">홈으로 돌아가기</a>
    </div>
  `;
}

// 경로 수정 함수 (main.js에 정의된 함수와 동일)
function getFixedImagePath(path) {
  // 현재 페이지가 하위 디렉토리에 있으므로 경로 조정
  if (path.startsWith('/images/')) {
    return '.' + path;
  } else if (path.startsWith('images/')) {
    return '../' + path;
  }
  
  return path;
} 