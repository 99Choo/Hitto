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
  <title>장바구니 - HittoStore</title>
  <link rel="icon" href="../images/logo.png" type="image/png">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="cart.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap">
  <!-- 캐시 방지 메타 태그 추가 -->
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
</head>
<body>
  <!-- 최상단 검정 바 -->
  <div class="top-bar">
    <div class="container">
      <div class="top-menu-left">
        <a href="../orderDelivery/orderDelivery.jsp">주문/배송</a>
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
            <li><a href="../category/category.jsp?type=training">트레이닝</a></li>
          </ul>
        </li>
        <li><a href="../bestproduct/bestproduct.jsp">베스트상품</a></li>
        <li><a href="../newproduct/newproduct.jsp">신상품</a></li>
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
        <a href="./index.jsp" class="icon-link cart active" title="장바구니"><i class="fas fa-shopping-cart"></i><span class="cart-count">0</span></a>
      </div>
    </div>
  </header>

  <!-- 장바구니 메인 컨텐츠 -->
  <main class="cart-main">
    <div class="container">
      <div class="page-header">
        <h2 class="page-title">장바구니 <i class="fas fa-shopping-cart"></i></h2>
        <p class="page-desc">장바구니에 담긴 상품들을 확인하고 구매하세요</p>
      </div>

      <!-- 장바구니 상품 목록 -->
      <div class="cart-content">
        <!-- 장바구니가 비어있을 때 -->
        <div id="empty-cart" class="empty-cart">
          <div class="empty-icon">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <p class="empty-message">장바구니에 담긴 상품이 없습니다.</p>
          <a href="../index.jsp" class="go-shopping-btn">쇼핑하러 가기</a>
        </div>

        <!-- 장바구니 상품 목록 -->
        <div id="cart-items-wrapper" class="cart-items-wrapper">
          <!-- 장바구니 테이블 헤더 -->
          <div class="cart-table-header">
            <div class="cart-checkbox">
              <input type="checkbox" id="select-all-checkbox" checked>
            </div>
            <div class="cart-product-info">상품정보</div>
            <div class="cart-quantity">수량</div>
            <div class="cart-price">가격</div>
            <div class="cart-delivery">배송비</div>
            <div class="cart-total">합계</div>
            <div class="cart-actions">선택</div>
          </div>

          <!-- 장바구니 항목들 -->
          <div id="cart-items" class="cart-items">
            <!-- 카트 아이템은 JavaScript로 동적 생성됩니다 -->
          </div>
        </div>

        <!-- 장바구니 컨트롤 -->
        <div class="cart-controls">
          <div class="select-control">
            <button id="remove-selected-btn" class="remove-selected-btn">
              선택상품 삭제
            </button>
            <button id="add-selected-to-wishlist" class="add-selected-to-wishlist">
              선택상품 위시리스트에 담기
            </button>
          </div>
        </div>

        <!-- 주문 정보 요약 -->
        <div class="order-summary">
          <div class="summary-item">
            <span class="summary-label">상품 금액</span>
            <span id="total-products-price" class="summary-value">0원</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">배송비</span>
            <span id="delivery-price" class="summary-value">0원</span>
          </div>
          <div class="summary-item total">
            <span class="summary-label">결제 예정 금액</span>
            <span id="total-price" class="summary-value">0원</span>
          </div>
          <div class="order-buttons">
            <button id="continue-shopping-btn" class="continue-shopping-btn">쇼핑 계속하기</button>
            <button id="checkout-btn" class="checkout-btn">주문하기</button>
          </div>
        </div>
      </div>

      <!-- 추천 상품 -->
      <div class="recommended-products">
        <h3 class="section-title">함께 구매하면 좋은 상품</h3>
        <div class="recommended-items">
          <!-- 추천 상품 1 -->
          <div class="recommended-item">
            <div class="item-image">
              <img src="../images/products/ball.jpg" alt="롤링스 야구공">
              <div class="wishlist-btn">
                <i class="far fa-heart"></i>
              </div>
            </div>
            <div class="item-info">
              <p class="item-brand">Rawlings</p>
              <h4 class="item-name">공식 야구공 12개입</h4>
              <p class="item-price">120,000원</p>
            </div>
          </div>

          <!-- 추천 상품 2 -->
          <div class="recommended-item">
            <div class="item-image">
              <img src="../images/products/helmet.jpg" alt="헬멧">
              <div class="wishlist-btn">
                <i class="far fa-heart"></i>
              </div>
            </div>
            <div class="item-info">
              <p class="item-brand">Wilson</p>
              <h4 class="item-name">프리미엄 타자용 헬멧</h4>
              <p class="item-price">89,000원</p>
            </div>
          </div>

          <!-- 추천 상품 3 -->
          <div class="recommended-item">
            <div class="item-image">
              <img src="../images/products/glove.jpg" alt="장갑">
              <div class="wishlist-btn">
                <i class="far fa-heart"></i>
              </div>
            </div>
            <div class="item-info">
              <p class="item-brand">Under Armour</p>
              <h4 class="item-name">배팅 글러브 UA Clean Up</h4>
              <p class="item-price">45,000원</p>
            </div>
          </div>

          <!-- 추천 상품 4 -->
          <div class="recommended-item">
            <div class="item-image">
              <img src="../images/products/sock.jpg" alt="양말">
              <div class="wishlist-btn">
                <i class="far fa-heart"></i>
              </div>
            </div>
            <div class="item-info">
              <p class="item-brand">Nike</p>
              <h4 class="item-name">야구 전용 롱 삭스 2세트</h4>
              <p class="item-price">32,000원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

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
      
      <!-- 정보 박스 토글 버튼 -->
      <div class="info-box-toggle">
        <button id="footer-info-toggle" type="button">
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
        <p>&copy; 2025 HittoStore. All rights reserved.</p>
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


<%-- 스크립트 로드 순서: 공통함수(common.js)에 open/closeModal, main.js에 openLoginModal 구현 --%>

<script src="js/wishlist-functions.js"></script>
<script src="../js/cart-functions.js"></script>
<script src="../js/common.js"></script>
<script src="../js/main.js"></script>
  <script src="cart.js"></script>
  <script>
    // DOM이 로드되면 장바구니 카운트 업데이트
    document.addEventListener('DOMContentLoaded', function() {
      // 장바구니 개수 업데이트 시도
      if (window.updateCartCount) {
        window.updateCartCount();
      }
      
      // 콘솔에 장바구니 내용 출력 (디버깅용)
      try {
        const cart = localStorage.getItem('cartItems');
        console.log('현재 장바구니 내용:', cart ? JSON.parse(cart) : []);
      } catch (e) {
        console.error('장바구니 데이터 확인 중 오류:', e);
      }
    });
  </script>
</body>
</html> 