<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java"%>
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
  <title>상품 상세 - HittoStore</title>
  <link rel="icon" href="../images/logo.png" type="image/png">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="css/product-detail.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
</head>
<body>
  <!-- 모달 컨테이너 -->
  <div id="modal-container"></div>
  
  <!-- 최상단 검정 바 -->
  <div class="top-bar">
    <div class="container">
      <div class="top-menu-left">
        <a href="../orderDelivery/orderDelivery.jsp">주문/배송</a>
        <a href="../customerService/customerService.jsp">고객센터</a>
      </div>
       <!-- 상단 메뉴 바 -->
    <div class="top-bar">
        <div class="container">
            <div class="top-menu-left">
                <a href="./orderDelivery.jsp" class="active">주문/배송</a>
                <a href="../customerService/customerService.jsp">고객센터</a>
            </div>
            <%-- 상단 로그인/로그아웃 링크 --%>
<div class="top-menu-right">
  <% if (userName != null) { %>
    <span>
      <% if (!logoFile.isEmpty()) { %>
        <img src="../images/teams/<%= logoFile %>" alt="<%= team %>" style="width:18px;height:18px;vertical-align:middle;margin-right:2px;">
      <% } %>
      <strong><%= userName %></strong>님 환영합니다
    </span>
    <span> | </span>
    <a href="../logout.jsp">로그아웃</a>
  <% } else { %>
    <a href="#" onclick="openLoginModal(); return false;">로그인</a>
    <a href="../signup/signup.jsp">회원가입</a>
  <% } %>
</div>
        </div>
    </div>
    </div>
  </div>

  <!-- 메인 메뉴 -->
  <nav class="main-nav">
    <div class="container">
      <ul class="nav-menu">
        <li><a href="#"><i class="fas fa-th-large"></i> 카테고리</a>
          <ul class="sub-menu">
            <li><a href="../category/category.jsp?type=glove">글러브/미트</a></li>
            <li><a href="../category/category.jsp?type=bat">배트</a></li>
            <li><a href="../category/category.jsp?type=ball">야구공</a></li>
            <li><a href="../category/category.jsp?type=clothing">의류/잠바</a></li>
            <li><a href="../category/category.jsp?type=shoes">신발/스파이크</a></li>
            <li><a href="../category/category.jsp?type=equipment">장비용품</a></li>
          </ul>
        </li>
        <li><a href="../bestproduct/bestproduct.jsp">베스트상품</a></li>
        <li><a href="../newproduct/newproduct.jsp">신상품</a></li>
        <li><a href="#">이벤트</a></li>
        <li><a href="#">브랜드샵</a></li>
        <li><a href="#">할인상품</a></li>
        <li><a href="#">시즌오프</a></li>
      </ul>
    </div>
  </nav>

  <!-- 헤더 (로고 및 검색) -->
  <header class="main-header">
    <div class="container">
      <div class="logo">
        <a href="../index.jsp">
          <h1><i class="fas fa-baseball-ball"></i> HittoStore</h1>
        </a>
      </div>
      <div class="search-box">
        <input type="text" placeholder="검색어를 입력하세요">
        <button type="submit"><i class="fas fa-search"></i></button>
      </div>
      <div class="header-icons">
        <a href="../wishlist/index.jsp" class="icon-link" title="위시리스트"><i class="fas fa-heart"></i></a>
        <a href="../community/index.jsp" class="icon-link" title="커뮤니티"><i class="fas fa-users"></i></a>
        <a href="../mypage/mypage.jsp" class="icon-link" title="내 계정"><i class="fas fa-user"></i></a>
        <a href="../cart/index.jsp" class="icon-link cart" title="장바구니"><i class="fas fa-shopping-cart"></i><span class="cart-count">0</span></a>
      </div>
    </div>
  </header>

  <!-- 상품 상세 콘텐츠 영역 -->
  <section class="product-detail-content">
    <div class="container">
      <!-- 상품 경로 내비게이션 -->
      <div class="product-breadcrumb">
        <a href="../index.jsp">홈</a>
        <i class="fas fa-chevron-right"></i>
        <a href="../category/category.jsp" id="category-link">카테고리</a>
        <i class="fas fa-chevron-right"></i>
        <span id="product-name">상품명</span>
      </div>

      <!-- 상품 상세 영역 -->
      <div class="product-detail-main">
        <!-- 좌측: 상품 이미지 영역 -->
        <div class="product-image-area">
          <div class="product-main-image">
            <img id="main-product-image" src="../images/products/no-image.jpg" alt="상품 이미지">
            <div class="zoom-icon"><i class="fas fa-search-plus"></i></div>
          </div>
          <div class="product-thumbnail-list">
            <!-- 썸네일 이미지는 JavaScript로 동적 생성 -->
          </div>
        </div>

        <!-- 우측: 상품 정보 영역 -->
        <div class="product-info-area">
          <div class="product-badges" id="product-badges">
            <!-- 배지는 JavaScript로 동적 생성 -->
          </div>
          <h1 class="product-title" id="product-title">상품 이름</h1>
          
          <div class="product-rating">
            <div class="stars" id="product-stars">
              <!-- 별점은 JavaScript로 동적 생성 -->
            </div>
            <span class="review-count" id="review-count">(0개 리뷰)</span>
          </div>
          
          <div class="product-price-info">
            <div class="price-wrapper">
              <span class="price-sale" id="price-sale">0원</span>
              <span class="price-normal" id="price-normal">0원</span>
            </div>
            <div class="discount-info">
              <span class="discount-rate" id="discount-rate">0%</span>
            </div>
          </div>
          
          <div class="product-delivery-info">
            <div class="info-row">
              <span class="info-label">배송정보</span>
              <span class="info-value">무료배송</span>
            </div>
            <div class="info-row">
              <span class="info-label">배송예정</span>
              <span class="info-value">지금 주문하면 <strong>내일(평일 기준) 도착 예정</strong></span>
            </div>
          </div>
          
          <div class="product-options">
            <div class="option-row" id="option-container">
              <!-- 옵션은 JavaScript로 동적 생성 -->
            </div>
          </div>
          
          <div class="quantity-selector">
            <span class="info-label">수량</span>
            <div class="quantity-controls">
              <button type="button" id="quantity-minus"><i class="fas fa-minus"></i></button>
              <input type="number" id="quantity" value="1" min="1" max="10">
              <button type="button" id="quantity-plus"><i class="fas fa-plus"></i></button>
            </div>
          </div>
          
          <div class="total-price-wrapper">
            <span class="total-price-label">총 상품 금액</span>
            <span class="total-price" id="total-price">0원</span>
          </div>
          
          <div class="product-action-buttons">
            <button type="button" class="buy-now-btn" id="buy-now-btn">바로 구매하기</button>
            <button type="button" class="add-cart-btn" id="add-cart-btn">장바구니 담기</button>
            <button type="button" class="wishlist-btn" id="wishlist-btn"><i class="far fa-heart"></i></button>
          </div>
        </div>
      </div>

      <!-- 상품 상세 탭 메뉴 -->
      <div class="product-detail-tabs">
        <div class="tab-menu">
          <button class="tab-btn active" data-tab="product-description">상품 상세 정보</button>
          <button class="tab-btn" data-tab="product-info">상품 정보</button>
          <button class="tab-btn" data-tab="product-reviews">상품 리뷰</button>
          <button class="tab-btn" data-tab="product-qa">상품 문의</button>
          <button class="tab-btn" data-tab="product-shipping">배송/교환/반품 안내</button>
        </div>
        
        <div class="tab-content">
          <!-- 상품 상세 정보 탭 -->
          <div class="tab-panel active" id="product-description">
            <div class="product-description-content">
              <!-- 상품 상세 내용은 JavaScript로 동적 생성 -->
              <p>상품 상세 정보가 준비 중입니다.</p>
            </div>
          </div>
          
          <!-- 상품 정보 탭 -->
          <div class="tab-panel" id="product-info">
            <table class="product-info-table">
              <tbody>
                <!-- 상품 정보는 JavaScript로 동적 생성 -->
                <tr>
                  <th>제품명</th>
                  <td id="info-product-name">-</td>
                </tr>
                <tr>
                  <th>제조사/수입사</th>
                  <td id="info-manufacturer">-</td>
                </tr>
                <tr>
                  <th>원산지</th>
                  <td id="info-origin">-</td>
                </tr>
                <tr>
                  <th>브랜드</th>
                  <td id="info-brand">-</td>
                </tr>
                <tr>
                  <th>A/S 안내</th>
                  <td>상품 구매 후 1년간 무상 A/S 가능</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 상품 리뷰 탭 -->
          <div class="tab-panel" id="product-reviews">
            <div class="review-summary">
              <div class="review-rating">
                <div class="average-score" id="average-score">0.0</div>
                <div class="star-rating" id="review-stars">
                  <!-- 별점은 JavaScript로 동적 생성 -->
                </div>
                <div class="review-count">총 <span id="total-review-count">0</span>개 리뷰</div>
              </div>
              <div class="write-review-btn-wrapper">
                <button type="button" class="write-review-btn">리뷰 작성하기</button>
              </div>
            </div>
            
            <div class="review-list" id="review-list">
              <!-- 리뷰는 JavaScript로 동적 생성 -->
              <p class="no-reviews">등록된 리뷰가 없습니다.</p>
            </div>
          </div>
          
          <!-- 상품 문의 탭 -->
          <div class="tab-panel" id="product-qa">
            <div class="qa-header">
              <p>상품에 대한 궁금한 점을 문의해 주세요!</p>
              <button type="button" class="write-qa-btn">상품 문의하기</button>
            </div>
            <div class="qa-list" id="qa-list">
              <!-- 문의는 JavaScript로 동적 생성 -->
              <p class="no-qa">등록된 문의가 없습니다.</p>
            </div>
          </div>
          
          <!-- 배송/교환/반품 안내 탭 -->
          <div class="tab-panel" id="product-shipping">
            <div class="shipping-info">
              <h3>배송 안내</h3>
              <ul>
                <li>배송 방법: 택배</li>
                <li>배송 지역: 전국</li>
                <li>배송 비용: 무료</li>
                <li>배송 기간: 2~3일(주말/공휴일 제외)</li>
              </ul>
              
              <h3>교환 및 반품 안내</h3>
              <ul>
                <li>교환/반품 신청 기간: 상품 수령 후 7일 이내</li>
                <li>교환/반품 배송비: 고객 변심에 의한 교환/반품은 왕복 배송비 고객 부담</li>
                <li>제품 불량, 오배송의 경우 당사가 배송비 부담</li>
              </ul>
              
              <h3>교환 및 반품이 불가능한 경우</h3>
              <ul>
                <li>고객의 책임 있는 사유로 상품이 훼손된 경우</li>
                <li>고객의 사용으로 상품가치가 현저히 감소한 경우</li>
                <li>시간이 지나 다시 판매하기 어려울 정도로 상품가치가 감소한 경우</li>
                <li>복제가 가능한 상품의 포장을 훼손한 경우</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 관련 상품 추천 -->
      <div class="related-products">
        <h2 class="section-title">함께 구매하면 좋은 상품</h2>
        <div class="related-product-list" id="related-product-list">
          <!-- 관련 상품은 JavaScript로 동적 생성 -->
        </div>
      </div>
    </div>
  </section>

  <!-- 상품 이미지 확대 모달 -->
  <div class="image-modal" id="image-modal">
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img id="modal-image" src="" alt="확대된 상품 이미지">
    </div>
  </div>

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
          <button class="info-button">1:1문의 <i class="fas fa-chevron-right"></i></button>
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
  
  <%-- 모달을 삽입할 컨테이너 --%>
<div id="modal-container"></div>

<%-- 세션 정보를 JS 전역 변수로 노출 (공통 스크립트에서 사용) --%>
<script>
  window.sessionUserName = "<%= userName != null ? userName : "" %>";
  window.sessionUserId   = "<%= userId   != null ? userId   : "" %>";
  window.sessionTeam     = "<%= team     != null ? team     : "" %>";
</script>

  <!-- 필수 스크립트 -->
  <script src="../js/common.js"></script>
  <script src="js/wishlist-functions.js"></script>
<script src="../js/cart-functions.js"></script>
<script src="../js/common.js"></script>
<script src="../js/main.js"></script>
  <script src="js/product-detail.js"></script>
</body>
</html> 