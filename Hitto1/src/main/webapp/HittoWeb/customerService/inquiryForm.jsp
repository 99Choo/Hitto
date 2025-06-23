<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java"%>
<%@ page session="true" %>
<%
  String userName = (String) session.getAttribute("userName");
  String userId = (String) session.getAttribute("userId");
  String team = (String) session.getAttribute("team");

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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1:1 문의하기 - HittoStore</title>
    <link rel="icon" href="../images/logo.png" type="image/png">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="customerService.css">
</head>
<body>
<div class="top-bar">
    <div class="container">
        <div class="top-menu-left">
            <a href="../orderDelivery/orderDelivery.jsp">주문/배송</a>
            <a href="./customerService.jsp">고객센터</a>
        </div>
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

<header class="main-header">
    <div class="container">
        <div class="logo">
            <a href="../index.jsp">
                <h1><i class="fas fa-baseball-ball"></i> HittoStore</h1>
            </a>
        </div>
    </div>
</header>

<div class="container">
    <a href="../index.jsp" class="back-button">
        <i class="fas fa-chevron-left"></i> 홈으로 돌아가기
    </a>

    <div class="cs-header">
        <h2>1:1 문의하기</h2>
        <p>궁금한 점이나 불편한 점을 남겨주시면 신속하게 답변해드리겠습니다.</p>
    </div>

    <div class="inquiry-form" style="max-width: 800px; margin: 0 auto;">
        <h3 class="form-title"><i class="fas fa-paper-plane"></i> 1:1 문의하기</h3>
        <form id="inquiryForm" action="<%= request.getContextPath() %>/InquirySubmitServlet" method="post" enctype="multipart/form-data">
            <div class="form-group inquiry-type">
                <label for="inquiryType">문의 유형</label>
                <select id="inquiryType" name="inquiryType" required>
                    <option value="">문의 유형을 선택해주세요</option>
                    <option value="product">상품 문의</option>
                    <option value="delivery">배송 문의</option>
                    <option value="return">반품/교환</option>
                    <option value="payment">결제 문의</option>
                    <option value="member">회원 정보</option>
                    <option value="etc">기타 문의</option>
                </select>
            </div>
            <div class="form-group">
                <label for="order-number">주문번호 (선택사항)</label>
                <input type="text" id="order-number" name="orderNumber" placeholder="주문 관련 문의인 경우 입력해주세요">
            </div>
            <div class="form-group">
                <label for="name">이름</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">이메일</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="phone">연락처 (선택사항)</label>
                <input type="tel" id="phone" name="phone" placeholder="숫자만 입력해주세요">
            </div>
            <div class="form-group">
                <label for="subject">문의 제목</label>
                <input type="text" id="subject" name="subject" required>
            </div>
            <div class="form-group">
                <label for="message">문의 내용</label>
                <textarea id="message" name="message" required placeholder="문의하실 내용을 상세히 적어주시면 더 빠른 답변이 가능합니다."></textarea>
            </div>
            <div class="form-group">
                <label>파일 첨부 (선택사항)</label>
                <div class="file-upload">
                    <input type="file" name="file1" class="form-control-file">
                    <input type="file" name="file2" class="form-control-file">
                    <input type="file" name="file3" class="form-control-file">
                </div>
            </div>
            <div class="form-options">
                <div class="checkbox-group">
                    <input type="checkbox" id="privacy-agree" name="agreePersonal" required>
                    <label for="privacy-agree">개인정보 수집에 동의합니다 (필수)</label>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="email-reply" name="receiveEmail">
                    <label for="email-reply">이메일로 답변 받기</label>
                </div>
            </div>
            <button type="submit" class="submit-btn"><i class="fas fa-paper-plane"></i> 문의하기</button>
        </form>
    </div>
</div>

<div id="modal-container"></div>

<script>
  window.sessionUserName = "<%= userName != null ? userName : "" %>";
  window.sessionUserId   = "<%= userId   != null ? userId   : "" %>";
  window.sessionTeam     = "<%= team     != null ? team     : "" %>";
</script>

<script src="../js/cart-functions.js"></script>
<script src="../js/common.js"></script>
<script src="../js/main.js"></script>
<script src="inquiryForm.js"></script>
</body>
</html>
