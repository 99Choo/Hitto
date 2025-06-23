<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page session="true" %>
<%
  String userName = (String) session.getAttribute("userName");
  String userId = (String) session.getAttribute("userId");
  String team = (String) session.getAttribute("team");
  String teamName = "";
  String logoFile = "";  // ✅ 팀 로고 파일명 저장용

  if (team != null) {
      teamName = team;
      switch(team) {
          case "롯데":   logoFile = "lotte.png";   break;
          case "SSG":    logoFile = "ssg.png";     break;
          case "삼성":   logoFile = "samsung.png"; break;
          case "LG":     logoFile = "lg.png";      break;
          case "두산":   logoFile = "doosan.png";  break;
          case "키움":   logoFile = "kiwoom.png";  break;
          case "KIA":    logoFile = "kia.png";     break;
          case "NC":     logoFile = "nc.png";      break;
          case "KT":     logoFile = "kt.png";      break;
          case "한화":   logoFile = "hanwha.png";  break;
      }
  }
%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HittoStore - 야구용품 전문 쇼핑몰</title>
  <link rel="icon" href="images/logo.png" type="image/png">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <script defer src="js/wishlist-functions.js"></script>
  <script defer src="js/cart-functions.js"></script>
</head>
<body>
  <div class="top-bar">
    <div class="container">
      <div class="top-menu-left">
        <a href="orderDelivery/orderDelivery.jsp">주문/배송</a>
        <a href="customerService/customerService.jsp">고객센터</a>
      </div>
		 	<div class="top-menu-right">
				  <% if (userName != null) { %>
				    <span>
				      <% if (logoFile != null && !logoFile.isEmpty()) { %>
						<img src="<%= request.getContextPath() %>/HittoWeb/images/teams/<%= logoFile %>" 
						     alt="<%= team %>" 
						     style="width:18px;height:18px;vertical-align:middle;margin-right:2px;">
				      <% } %>
				      <strong><%= userName %></strong>님 환영합니다
				    </span>
				    <span> | </span>
				    <a href="logout.jsp">로그아웃</a>
				  <% } else { %>
				    <a href="#" onclick="openLoginModal(); return false;">로그인</a>
				    <a href="signup/signup.jsp">회원가입</a>
				  <% } %>
				</div>

	    </div>
	  </div>
  <!-- 메인 메뉴 -->
  <nav class="main-nav">
    <div class="container">
      <ul class="nav-menu">
        <li><a href="#"><i class="fas fa-th-large"></i> 카테고리</a>
          <ul class="sub-menu">
            <li><a href="category/category.jsp?type=glove">글러브/미트</a></li>
            <li><a href="category/category.jsp?type=bat">배트</a></li>
            <li><a href="category/category.jsp?type=ball">야구공</a></li>
            <li><a href="category/category.jsp?type=clothing">의류/잠바</a></li>
            <li><a href="category/category.jsp?type=shoes">신발/스파이크</a></li>
            <li><a href="category/category.jsp?type=equipment">장비용품</a></li>
            <li><a href="category/category.jsp?type=training">트레이닝</a></li>
          </ul>
        </li>
        <li><a href="bestproduct/bestproduct.jsp">베스트상품</a></li>
        <li><a href="newproduct/newproduct.jsp">신상품</a></li>
        <li><a href="#" onclick="alert('아직 준비중인 서비스입니다.'); return false;">이벤트</a></li>
        <li><a href="#" onclick="alert('아직 준비중인 서비스입니다.'); return false;">브랜드샵</a></li>
        <li><a href="#" onclick="alert('아직 준비중인 서비스입니다.'); return false;">할인상품</a></li>
        <li><a href="#" onclick="alert('아직 준비중인 서비스입니다.'); return false;">시즌오프</a></li>
      </ul>
    </div>
  </nav>

  <!-- 헤더 (로고 및 검색) -->
  <header class="main-header">
    <div class="container">
      <div class="logo">
        <a href="index.jsp">
          <h1><i class="fas fa-baseball-ball"></i> HittoStore</h1>
        </a>
      </div>
      <div class="search-box">
        <input type="text" placeholder="검색어를 입력하세요">
        <button type="submit"><i class="fas fa-search"></i></button>
      </div>
      <div class="header-icons">
        <a href="wishlist/index.jsp" class="icon-link" title="위시리스트"><i class="fas fa-heart"></i></a>
        <a href="<%= request.getContextPath() %>/community/list" class="icon-link" title="커뮤니티">
			 <i class="fas fa-users"></i>
		</a>
        <a href="mypage/mypage.jsp" class="icon-link" title="내 계정"><i class="fas fa-user"></i></a>
        <a href="cart/index.jsp" class="icon-link cart" title="장바구니"><i class="fas fa-shopping-cart"></i><span class="cart-count">0</span></a>
      </div>
    </div>
  </header>

  <!-- 메인 배너 (슬라이드) -->
  <section class="main-banner no-padding">
    <div class="banner-slider">
      <!-- 배너 1: Wilson A1500 -->
      <div class="banner-slide" style="background: linear-gradient(to right, #2c3e50, #4ca1af);">
        <div class="banner-content">
          <div class="banner-text">
            <h2 class="brand-name">Wilson</h2>
            <h3 class="product-name">A1500 시리즈</h3>
            <p class="product-desc">프로선수들이 인정한 최고의 글러브<br>혁신적인 가죽 처리로 부드러운 착용감</p>
            <a href="#" class="banner-btn">구매하기 <i class="fas fa-arrow-right"></i></a>
          </div>
          <div class="banner-image">
            <img src="images/wilson.png" alt="Wilson A1500 글러브">
          </div>
        </div>
      </div>  

      <!-- 배너 2: Rawlings PRO-SERIES -->
      <div class="banner-slide" style="background: linear-gradient(to right, #8e0e00, #1f1c18);">
        <div class="banner-content">
          <div class="banner-text">
            <h2 class="brand-name">Rawlings</h2>
            <h3 class="product-name">PRO-SERIES</h3>
            <p class="product-desc">MLB 공식 공급 업체의 프리미엄 글러브<br>최상의 내구성과 정확한 포구감</p>
            <a href="#" class="banner-btn">자세히 보기 <i class="fas fa-arrow-right"></i></a>
          </div>
          <div class="banner-image">
            <img src="images/Rawlings.png" alt="Rawlings PRO-SERIES 글러브">
          </div>
        </div>
      </div>

      <!-- 배너 3: Mizuno SPEED FLEX -->
      <div class="banner-slide" style="background: linear-gradient(to right, #000046, #1cb5e0);">
        <div class="banner-content">
          <div class="banner-text">
            <h2 class="brand-name">Mizuno</h2>
            <h3 class="product-name">SPEED FLEX</h3>
            <p class="product-desc">유연성과 내구성의 완벽한 조화<br>미즈노만의 특허 기술로 최상의 성능 보장</p>
            <a href="#" class="banner-btn">SHOP NOW <i class="fas fa-arrow-right"></i></a>
          </div>
          <div class="banner-image">
            <img src="images/mizuno.png" alt="Mizuno SPEED FLEX 장비">
          </div>
        </div>
      </div>

      <!-- 배너 4: Louisville Slugger META -->
      <div class="banner-slide" style="background: linear-gradient(to right, #434343, #000000);">
        <div class="banner-content">
          <div class="banner-text">
            <h2 class="brand-name">Louisville Slugger</h2>
            <h3 class="product-name">META 시리즈</h3>
            <p class="product-desc">무제한 비거리의 새로운 기준<br>혁신적인 3피스 디자인으로 더 멀리 더 빠르게</p>
            <a href="#" class="banner-btn">구매하기 <i class="fas fa-arrow-right"></i></a>
          </div>
          <div class="banner-image">
            <img src="images/bat.png" alt="Louisville Slugger META 배트">
          </div>
        </div>
      </div>

      <!-- 배너 네비게이션 -->
      <div class="banner-nav">
        <button class="slider-prev" aria-label="이전 슬라이드"><i class="fas fa-chevron-left"></i></button>
        <div class="slider-dots">
          <span class="dot active" data-slide="0"></span>
          <span class="dot" data-slide="1"></span>
          <span class="dot" data-slide="2"></span>
          <span class="dot" data-slide="3"></span>
        </div>
        <button class="slider-next" aria-label="다음 슬라이드"><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
  </section>

  <!-- 바로가기 아이콘 -->
  <section class="quick-links">
    <div class="container">
      <div class="quick-links-wrapper" style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 15px;">
        <div class="quick-link-item">
          <a href="category/category.html?type=glove">
            <div class="icon-container">
              <i class="fas fa-baseball"></i>
            </div>
            <span>글러브/미트</span>
          </a>
        </div>
        <div class="quick-link-item">
          <a href="category/category.html?type=bat">
            <div class="icon-container">
              <img src="images/baseball-bat.svg" alt="야구 배트 아이콘">
            </div>
            <span>배트</span>
          </a>
        </div>
        <div class="quick-link-item">
          <a href="category/category.html?type=ball">
            <div class="icon-container">
              <i class="fas fa-baseball-ball"></i>
            </div>
            <span>야구공</span>
          </a>
        </div>
        <div class="quick-link-item">
          <a href="category/category.html?type=clothing">
            <div class="icon-container">
              <i class="fas fa-tshirt"></i>
            </div>
            <span>의류/잠바</span>
          </a>
        </div>
        <div class="quick-link-item">
          <a href="category/category.html?type=shoes">
            <div class="icon-container">
              <i class="fas fa-running"></i>
            </div>
            <span>신발/스파이크</span>
          </a>
        </div>
        <div class="quick-link-item">
          <a href="category/category.html?type=equipment">
            <div class="icon-container">
              <i class="fas fa-shield-alt"></i>
            </div>
            <span>장비용품</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 카테고리별 베스트 섹션 -->
  <section class="category-best-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">카테고리별 베스트</h2>
        <p class="section-desc">각 카테고리별 인기 상품을 만나보세요</p>
      </div>
      
      <!-- 카테고리 탭 -->
      <div class="category-tabs">
        <div class="tabs-container">
          <ul id="category-menu">
            <li class="tab-btn active" data-category="glove">글러브/미트</li>
            <li class="tab-btn" data-category="bat">배트</li>
            <li class="tab-btn" data-category="ball">야구공</li>
            <li class="tab-btn" data-category="clothing">의류/잠바</li>
            <li class="tab-btn" data-category="shoes">신발/스파이크</li>
            <li class="tab-btn" data-category="equipment">장비용품</li>
          </ul>
        </div>
        <div class="tabs-nav">
          <button class="tab-prev"><i class="fas fa-chevron-left"></i></button>
          <button class="tab-next"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
      
      <!-- 카테고리별 상품 -->
      <div class="category-products">
        <div id="product-list" class="five-products-only">
          <!-- 상품들이 여기에 자바스크립트로 동적으로 로드됩니다 -->
        </div>
      </div>
    </div>
  </section>

  <!-- 신상품 섹션 -->
  <section class="new-products-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">신상품</h2>
        <p class="section-desc">HittoStore의 새로운 상품을 가장 먼저 만나보세요</p>
        <a href="newproduct/newproduct.html" class="view-more">더보기 <i class="fas fa-chevron-right"></i></a>
      </div>
      
      <div class="products-grid" id="new-product-list">
        <!-- 상품들은 JavaScript로 동적 생성됩니다 -->
      </div>
    </div>
  </section>
  
  <!-- 베스트상품 섹션 -->
  <section class="best-products-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">베스트상품</h2>
        <p class="section-desc">고객님들이 가장 많이 선택한 인기 상품들을 소개합니다</p>
        <a href="bestproduct/bestproduct.html" class="view-more">더보기 <i class="fas fa-chevron-right"></i></a>
      </div>
      
      <div class="products-grid" id="best-products-container">
        <!-- 베스트상품이 자바스크립트에 의해 동적으로 로드됩니다 -->
      </div>
    </div>
  </section>
  
  <!-- 이벤트 프로모션 섹션 -->
  <section class="event-promotions-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">이벤트 & 프로모션</h2>
        <p class="section-desc">지금 진행 중인 특별한 혜택을 놓치지 마세요</p>
      </div>
      <div class="promotions-wrapper">
        <!-- 왼쪽 이벤트 -->
        <div class="promotion-card left-promotion">
          <div class="promotion-content">
            <span class="event-tag">스타디움 런칭 이벤트</span>
            <h3 class="promotion-title">지금은 야구의 계절!</h3>
            <h4 class="promotion-subtitle">최대 50% 할인 혜택</h4>
            <p class="promotion-desc">HittoStore에서 인기 야구용품 최대 50% 할인 혜택을 놓치지 마세요.</p>
          </div>
          <div class="promotion-image">
            <img src="images/promotions/gkfdls.png" alt="야구 용품 할인 이벤트">
          </div>
        </div>
        
        <!-- 오른쪽 이벤트 -->
        <div class="promotion-card right-promotion">
          <div class="promotion-content">
            <span class="event-tag">야공사 오프라인매장 안내</span>
            <h3 class="promotion-title">회원에게만 제공되는 특별 혜택</h3>
            <h4 class="promotion-subtitle">전 상품 20% 할인</h4>
            <p class="promotion-desc">모든 야구용품 20% 할인 혜택을 지금 만나보세요.</p>
          </div>
          <div class="promotion-image">
            <img src="images/promotions/회원특가.png" alt="회원 특별 할인">
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- 브랜드 로고 섹션 -->
  <section class="brand-logos-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">브랜드샵</h2>
        <p class="section-desc">다양한 브랜드의 제품을 만나보세요</p>
      </div>
      <div class="brand-logos-row">
        <div class="brand-item">
          <div class="brand-logo-container">
            <img src="images/brand-logos/morimoto.png" alt="모리모토">
          </div>
          <p class="brand-name">모리모토</p>
        </div>
        
        <div class="brand-item">
          <div class="brand-logo-container">
            <img src="images/brand-logos/prospecs.png" alt="프로스펙스">
          </div>
          <p class="brand-name">프로스펙스</p>
        </div>
        
        <div class="brand-item">
          <div class="brand-logo-container">
            <img src="images/brand-logos/wilson1.png" alt="윌슨">
          </div>
          <p class="brand-name">윌슨</p>
        </div>
        
        <div class="brand-item">
          <div class="brand-logo-container">
            <img src="images/brand-logos/nike.png" alt="나이키">
          </div>
          <p class="brand-name">나이키</p>
        </div>
        
        <div class="brand-item">
          <div class="brand-logo-container">
            <img src="images/brand-logos/evoshield.png" alt="이보쉴드">
          </div>
          <p class="brand-name">이보쉴드</p>
        </div>
        
        <div class="brand-item">
          <div class="brand-logo-container">
            <img src="images/brand-logos/100percent.png" alt="롤링스">
          </div>
          <p class="brand-name">롤링스</p>
        </div>
        
        <div class="brand-item">
          <div class="brand-logo-container">
            <img src="images/brand-logos/oneeighty.png" alt="윈에이티">
          </div>
          <p class="brand-name">윈에이티</p>
        </div>
      </div>
      <div class="brand-view-all-btn">
        <button type="button">브랜드 전체보기</button>
      </div>
    </div>
  </section>
  
  <!-- MLB 공식보호대 지품 섹션 -->
  <section class="mlb-products-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">MLB 공식보호대 지품</h2>
        <p class="section-desc">프로 선수들이 사용하는 공식 인증 보호장비를 만나보세요</p>
      </div>
      
      <!-- 유튜브 비디오 레이아웃 -->
      <div class="mlb-videos-wrapper">
        <!-- 왼쪽 비디오 -->
        <div class="mlb-video-container">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ZxISJ10tv2c" title="Putting G-Form's SmartFlex Technology to the Test" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        
        <!-- 오른쪽 비디오 -->
        <div class="mlb-video-container">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ZxISJ10tv2c" title="Glen Giovanucci Joins The Show" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
      
      <!-- 버튼 영역 -->
      <div class="mlb-buttons">
        <a href="#" class="mlb-btn product-btn">지품 구매하기</a>
        <a href="https://g-form.com/collections/baseball" class="mlb-btn homepage-btn">지품 홈페이지 바로가기</a>
      </div>
    </div>
  </section>
  
  <!-- 이용후기 섹션 -->
  <section class="reviews-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">이용후기</h2>
        <p class="section-desc">실제 구매한 고객님들의 생생한 후기를 확인하세요</p>
        <a href="#" class="view-more">더보기 <i class="fas fa-chevron-right"></i></a>
      </div>
      
      <div class="reviews-wrapper">
        <!-- 리뷰 1 -->
        <div class="review-card">
          <div class="review-image">
            <img src="images/products/sock.jpg" alt="야구 양말">
          </div>
          <div class="review-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h3 class="review-title">약간 목있는 부분이 좀진한 홈슨이랑 똑같습니다</h3>
          <p class="review-text">약간 목있는 부분이 좀진한 홈슨이랑 똑같습니다</p>
          <div class="reviewer">
            <span class="reviewer-icon"><i class="fas fa-user-circle"></i></span>
            <span class="reviewer-name">아구종아</span>
          </div>
        </div>
        
        <!-- 리뷰 2 -->
        <div class="review-card">
          <div class="review-image">
            <img src="images/products/rmffjqm.png" alt="글리터 패치">
          </div>
          <div class="review-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h3 class="review-title">글리터 잘 돼요 <i class="fas fa-info-circle"></i></h3>
          <p class="review-text">가격짜도 좋고 가격도 싸써서 잘 샀네요 만족합니다</p>
          <div class="reviewer">
            <span class="reviewer-icon"><i class="fas fa-user-circle"></i></span>
            <span class="reviewer-name">심진아웃</span>
          </div>
        </div>
        
        <!-- 리뷰 3 -->
        <div class="review-card">
          <div class="review-image">
            <img src="images/products/shoes.jpg" alt="야구화">
          </div>
          <div class="review-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h3 class="review-title">디자인도 이쁘고 인조잔디에서 게임을 자주하는데 직합한 신발이라 구매했습니다</h3>
          <p class="review-text">디자인도 이쁘고 인조잔디에서 게임을 자주하는데 직합한 신발이라 구매했음</p>
          <div class="reviewer">
            <span class="reviewer-icon"><i class="fas fa-user-circle"></i></span>
            <span class="reviewer-name">두수람</span>
          </div>
        </div>
        
        <!-- 리뷰 4 -->
        <div class="review-card">
          <div class="review-image">
            <img src="images/products/glove.jpg" alt="배팅장갑">
          </div>
          <div class="review-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h3 class="review-title">생각에 쓰기 좋은 배팅장갑 같아요</h3>
          <p class="review-text">생각에 쓰기 좋은 배팅장갑 같아요</p>
          <div class="reviewer">
            <span class="reviewer-icon"><i class="fas fa-user-circle"></i></span>
            <span class="reviewer-name">티격팅</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 푸터 -->
  <footer class="main-footer">
    <div class="container">
      <div class="footer-info-boxes">
        <div class="info-box">
          <div class="info-title">
            <i class="fas fa-headset"></i>
            <h4>고객센터</h4>
          </div>
          <p class="info-main">010-6410-0391</p>
          <p class="info-sub">Fax. xxx-xxx-xxxx</p>
          <a href="customerService/inquiryForm.jsp" class="info-button">1:1문의 <i class="fas fa-chevron-right"></i></a>
          <p class="info-time">월-금 오후 PM 01:00 - PM 05:00 / 주말 및 공휴일 휴무</p>
        </div>
        
        <div class="info-box">
          <div class="info-title">
            <i class="fas fa-wallet"></i>
            <h4>계좌안내</h4>
          </div>
          <p class="info-main">카카오뱅크 3333184917999</p>
          <p class="info-sub">예금주: 권법진</p>
          <p class="info-notice">많이많이 입금해주세요</p>
        </div>
      </div>
      
      <!-- 정보 박스 토글 버튼 -->
      <div class="info-box-toggle">
        <button id="footer-info-toggle" type="button" onclick="
          document.querySelector('.footer-info-boxes').classList.toggle('closed');
          this.classList.toggle('closed');
          localStorage.removeItem('footerInfoBoxesClosed');
        ">
          <i class="fas fa-chevron-up"></i>
        </button>
      </div>
      
      <div class="footer-top">
        <div class="footer-logo">
          <h2><i class="fas fa-baseball-ball"></i> HittoStore</h2>
        </div>
        <div class="footer-links">
          <ul>
            <li><a href="#">회사소개</a></li>
            <li><a href="#">이용약관</a></li>
            <li><a href="#"><strong>개인정보처리방침</strong></a></li>
            <li><a href="#">제휴문의</a></li>
            <li><a href="#">고객센터</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-main">
        <div class="company-info">
          <p>상호명: (주)히토스토어 | 대표: 권법진 | 사업자등록번호: 123-45-67890</p>
          <p>주소: 부산광역시 부산진구 양지로 54 | 통신판매업신고: 제2025-부산양산-1234호</p>
          <p>고객센터: 010-6410-0391 (평일 10:00~18:00, 점심시간 12:00~13:00, 주말/공휴일 휴무)</p>
          <p class="email">이메일: gwonbubjin@gmail.com</p>
        </div>
        <div class="customer-center">
          <h3>고객센터</h3>
          <p class="phone">02-123-4567</p>
          <p class="time">평일 10:00~18:00</p>
          <p class="time">점심시간 12:00~13:00</p>
          <p class="time">주말/공휴일 휴무</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 HittoStore All Rights Reserved.</p>
      </div>
    </div>
  </footer>
  <!-- 모달 컨테이너 -->
  <div id="modal-container"></div>

	<script>
	  window.sessionUserName = "<%= userName != null ? userName : "" %>";
	  window.sessionUserId = "<%= userId != null ? userId : "" %>";
	  window.sessionTeam = "<%= team != null ? team : "" %>";
	</script>
<!-- 필요한 스크립트 순서대로 로드 -->
<script src="js/wishlist-functions.js"></script>
<script src="js/cart-functions.js"></script>
<script src="js/common.js"></script>
<script src="js/main.js"></script>
</body>
</html> 