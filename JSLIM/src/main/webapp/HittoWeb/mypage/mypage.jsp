<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ page import="model.UserDAO" %>
<%@ page import="model.UserDTO" %>
<%
  String userId = (String) session.getAttribute("userId");
  if (userId == null) {
%>
  <script>
    alert("로그인이 필요합니다.");
    location.href = "../index.jsp";
  </script>
<%
    return;
  }

  UserDAO userDAO = new UserDAO();
  UserDTO user = userDAO.getUserInfo(userId);

  String team = user.getTeam();
  String logoFile = "";
  if (team != null) {
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
  <title>마이페이지</title>
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="mypage.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  
  <style>
    .profile-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .profile-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    body {
       padding-top:37px;
    }
  </style>
</head>
<body>
  <div class="top-bar">
    <div class="container">
    <div class="top-menu-left">
        <a href="orderDelivery/orderDelivery.jsp">주문/배송</a>
        <a href="customerService/customerService.jsp">고객센터</a>
      </div>
      <div class="top-menu-right">
        <span>
          <% if (!logoFile.isEmpty()) { %>
            <img src="../images/teams/<%= logoFile %>" style="width:18px;height:18px;vertical-align:middle;margin-right:2px;">
          <% } %>
          <strong><%= user.getUserName() %></strong>님 환영합니다 | 
          <a href="../logout.jsp">로그아웃</a>
        </span>
      </div>
    </div>
  </div>
  <header class="main-header">
    <div class="container">
      <div class="logo">
        <a href="../index.jsp">
          <h1><i class="fas fa-baseball-ball"></i> HittoStore</h1>
        </a>
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

  <section class="mypage-content">
    <div class="container">
      <div class="mypage-container">
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-image">
              <img src="../images/teams/<%= logoFile %>" alt="<%= team %> 로고" />
            </div>
            <div class="profile-info">
              <h2 class="profile-name"><%= user.getUserName() %></h2>
              <p class="profile-grade">일반회원</p>
              <button class="edit-profile-btn" onclick="location.href='edit-profile.jsp'">
                <i class="fas fa-cog"></i> 정보수정
              </button>
            </div>
          </div>
          <div class="profile-benefits">
            <div class="benefit-item">
              <i class="fas fa-coins"></i>
              <div class="benefit-content">
                <p class="benefit-label">적립금</p>
                <p class="benefit-value">5,000원</p>
              </div>
            </div>
            <div class="benefit-item">
              <i class="fas fa-ticket-alt"></i>
              <div class="benefit-content">
                <p class="benefit-label">쿠폰</p>
                <p class="benefit-value">3장</p>
              </div>
            </div>
            <div class="benefit-item">
              <i class="fas fa-id-card"></i>
              <div class="benefit-content">
                <p class="benefit-label">아이디</p>
                <p class="benefit-value"><%= user.getUserId() %></p>
              </div>
            </div>
          </div>
        </div>

        <div class="order-summary">
          <h3 class="section-title">최근 주문 내역</h3>
          <div class="order-list">
            <div class="order-item">
              <div class="order-header">
                <div class="order-date">2025.06.01</div>
                <div class="order-number">주문번호: 202506010001</div>
                <div class="order-status status-shipping">배송중</div>
              </div>
              <div class="order-details">
                <div class="product-image">
                  <img src="../images/glove1.jpg" alt="야구 글러브">
                </div>
                <div class="product-info">
                  <div class="product-name">미즈노 프로 내야 글러브</div>
                  <div class="product-option">옵션: 블랙/11.5인치</div>
                  <div class="product-price">145,000원 / 1개</div>
                </div>
              </div>
              <div class="order-actions">
                <div class="order-total">총 결제금액: <span>145,000원</span></div>
                <div class="action-buttons">
                  <button class="action-btn">주문취소</button>
                  <button class="action-btn">배송조회</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="recent-products">
          <h3 class="section-title">최근 본 상품</h3>
          <div class="product-slider">
            <div class="product-grid">
              <div class="product-item">
                <div class="product-thumb">
                  <img src="../images/bat1.jpg" alt="배트">
                </div>
                <div class="product-info">
                  <h3 class="product-title">SSK 알루미늄 배트</h3>
                  <div class="product-price">
                    <span class="price-sale">89,000원</span>
                    <span class="price-normal">120,000원</span>
                  </div>
                </div>
              </div>
              <div class="product-item">
                <div class="product-thumb">
                  <img src="../images/shoes1.jpg" alt="스파이크">
                </div>
                <div class="product-info">
                  <h3 class="product-title">아식스 프로 스파이크</h3>
                  <div class="product-price">
                    <span class="price-sale">175,000원</span>
                    <span class="price-normal">210,000원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
          <!-- footer 직접 삽입 -->
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
</body>
</html>
