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
  <title>신상품 - HittoStore</title>
  <link rel="icon" href="../images/logo.png" type="image/png">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="newproduct.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap">
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
          </ul>
        </li>
        <li><a href="../bestproduct/bestproduct.jsp">베스트상품</a></li>
        <li><a href="newproduct.jsp">신상품</a></li>
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

  <!-- 신상품 콘텐츠 영역 -->
  <section class="newproduct-content">
    <div class="container">
      <!-- 신상품 제목 -->
      <div class="newproduct-header">
        <h2>신상품</h2>
        <div class="newproduct-description">가장 최근에 출시된 신제품들을 만나보세요</div>
      </div>

      <!-- 필터 및 정렬 옵션 -->
      <div class="filter-options">
        <div class="filter-group">
          <label for="sort-options">정렬:</label>
          <select id="sort-options">
            <option value="newest">최신순</option>
            <option value="popular">인기순</option>
            <option value="price-low">가격 낮은순</option>
            <option value="price-high">가격 높은순</option>
          </select>
        </div>
        <div class="view-options">
          <button class="view-btn grid-view active"><i class="fas fa-th-large"></i></button>
          <button class="view-btn list-view"><i class="fas fa-list"></i></button>
        </div>
      </div>

      <!-- 상품 목록 -->
      <div class="product-list" id="new-product-list">
        <!-- 여기에 상품이 동적으로 로드됩니다 -->
      </div>

      <!-- 페이지네이션 -->
      <div class="pagination">
        <a href="#" class="page-link prev"><i class="fas fa-chevron-left"></i></a>
        <a href="#" class="page-link active">1</a>
        <a href="#" class="page-link next"><i class="fas fa-chevron-right"></i></a>
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

  <%-- 스크립트 로드 순서: 공통함수(common.js)에 open/closeModal, main.js에 openLoginModal 구현 --%>

<script src="js/wishlist-functions.js"></script>
<script src="../js/cart-functions.js"></script>
<script src="../js/common.js"></script>
<script src="../js/main.js"></script>
  <script>
    // main.js에서 정의된 newProducts가 없는 경우 대비
    console.log("newProducts 배열 확인:", window.newProducts ? "있음" : "없음");
  </script>
  <script src="newproduct.js"></script>
  <script>
    // 위시리스트 버튼 초기화를 위한 스크립트
    document.addEventListener('DOMContentLoaded', function() {
      // 페이지 로드 후 위시리스트 버튼 초기화
      if (typeof window.initWishlistButtons === 'function') {
        console.log('신상품 페이지: 위시리스트 버튼 초기화 시작');
        setTimeout(() => {
          window.initWishlistButtons();
        }, 500);
        
        // 콘텐츠가 완전히 로드된 후 다시 한번 초기화
        setTimeout(() => {
          window.initWishlistButtons();
        }, 1500);
      } else {
        console.error('위시리스트 초기화 함수를 찾을 수 없습니다.');
      }
      
      // 장바구니 버튼 초기화
      if (typeof window.initCartButtons === 'function') {
        console.log('신상품 페이지: 장바구니 버튼 초기화 시작');
        setTimeout(() => {
          window.initCartButtons();
        }, 500);
        
        // 콘텐츠가 완전히 로드된 후 다시 한번 초기화
        setTimeout(() => {
          window.initCartButtons();
        }, 1500);
      } else {
        console.error('장바구니 초기화 함수를 찾을 수 없습니다.');
      }
    });
  </script>
</body>
</html> 