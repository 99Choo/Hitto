<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java"%>
<%@ page session="true" %>
<%@ page import="model.InquiryDAO, model.InquiryDTO, java.util.List" %>
<%
  String userName = (String) session.getAttribute("userName");
  String userId = (String) session.getAttribute("userId");
  String team = (String) session.getAttribute("team");
  String teamName = "";
  String logoFile = "";

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

  // 실제 DB에서 내 문의글 목록 불러오기
  List<InquiryDTO> inquiryList = null;
  if (userId != null) {
      InquiryDAO dao = new InquiryDAO();
      inquiryList = dao.getInquiriesByUserId(userId);
  }
%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>내 문의내역 - HittoStore</title>
    <link rel="icon" href="../images/logo.png" type="image/png">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="customerService.css">
</head>
<body>
    <!-- 상단 메뉴 바 -->
    <div class="top-bar">
        <div class="container">
            <div class="top-menu-left">
                <a href="../orderDelivery/orderDelivery.jsp">주문/배송</a>
                <a href="./customerService.jsp">고객센터</a>
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
    
    <!-- 메인 헤더 (로고) -->
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
        <!-- 뒤로가기 버튼 -->
        <a href="../index.jsp" class="back-button">
            <i class="fas fa-chevron-left"></i> 홈으로 돌아가기
        </a>
        
        <!-- 페이지 헤더 -->
        <div class="cs-header">
            <h2>내 문의내역</h2>
            <p>고객님께서 작성하신 문의글과 답변을 확인하실 수 있습니다.</p>
        </div>
        
        <!-- 문의 내역 리스트 -->
        <div class="inquiry-list-container">
            <div class="list-header">
                <span class="total-count">총 <strong><%= (inquiryList != null) ? inquiryList.size() : 0 %></strong>건</span>
                <a href="inquiryForm.jsp" class="btn-write-inquiry">문의 작성하기</a>
            </div>
            <table class="inquiry-table">
                <thead>
                    <tr>
                        <th width="10%">상태</th>
                        <th width="15%">유형</th>
                        <th width="45%">제목</th>
                        <th width="15%">작성일</th>
                        <th width="10%">상세</th>
                        <th width="5%"></th>
                    </tr>
                </thead>
                <tbody>
                <% if (inquiryList != null && !inquiryList.isEmpty()) {
                     for (InquiryDTO dto : inquiryList) { %>
                    <tr>
                        <td>
                            <span class="inquiry-status <%= dto.isAnswered() ? "status-answered" : "status-pending" %>">
                                <%= dto.isAnswered() ? "답변완료" : "답변대기" %>
                            </span>
                        </td>
                        <td><%= dto.getInquiryType() %></td>
                        <td class="inquiry-subject"><%= dto.getSubject() %></td>
                        <td><%= dto.getCreatedAt() %></td>
                        <td><button class="view-detail-btn">보기</button></td>
                        <td>
                            <div class="kebab-menu">
                                <button class="kebab-btn"><i class="fas fa-ellipsis-v"></i></button>
                                <div class="kebab-options">
                                    <form action="InquiryDeleteServlet" method="post" onsubmit="return confirm('문의를 취소하고 글을 삭제하시겠습니까?');">
                                        <input type="hidden" name="id" value="<%= dto.getId() %>">
                                        <button type="submit" style="background:none;border:none;color:#e03131;cursor:pointer;">삭제</button>
                                    </form>
                                    <a href="inquiryEdit.jsp?id=<%= dto.getId() %>">수정</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="inquiry-detail-row" style="display: none;">
                        <td colspan="6">
                            <div class="inquiry-detail-content">
                                <div class="inquiry-question">
                                    <p><strong>Q.</strong> <%= dto.getMessage() %></p>
                                </div>
                                <% if (dto.getAnswer() != null) { %>
                                <div class="inquiry-answer">
                                    <p><strong>A.</strong> <%= dto.getAnswer() %></p>
                                </div>
                                <% } %>
                            </div>
                        </td>
                    </tr>
                <%   }
                   } else { %>
                    <tr>
                        <td colspan="6" style="text-align:center;">문의 내역이 없습니다.</td>
                    </tr>
                <% } %>
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- 로그인 모달 -->
    <div id="modal-container"></div>

    <%-- 세션 정보를 JS 전역 변수로 노출 --%>
    <script>
      window.sessionUserName = "<%= userName != null ? userName : "" %>";
      window.sessionUserId   = "<%= userId   != null ? userId   : "" %>";
      window.sessionTeam     = "<%= team     != null ? team     : "" %>";
    </script>

    <script src="../js/common.js"></script>
    <script src="../js/main.js"></script>
    <script src="inquiryList.js"></script>
</body>
</html> 