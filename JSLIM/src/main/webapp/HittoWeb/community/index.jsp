<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java"%>
<%@ page session="true" %>
<%@ page import="java.util.List" %>
<%@ page import="model.BoardDTO" %>
<%
    @SuppressWarnings("unchecked")
    List<BoardDTO> postList = (List<BoardDTO>) request.getAttribute("postList");
%>
<%
    String selectedCategory = request.getParameter("category");
    if (selectedCategory == null || selectedCategory.isEmpty()) {
        selectedCategory = "all"; // 기본값: 전체글
    }
%>
<%
  String userName = (String) session.getAttribute("userName");
  String userId = (String) session.getAttribute("userId");
  String team = (String) session.getAttribute("team");
  String teamName = "";
  String logoFile = "";  // ✅ 팀 로고 파일명 저장용
  boolean isLoggedIn = (userId != null && !userId.trim().isEmpty());

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
  <title>커뮤니티 - HittoStore</title>
  <link rel="icon" href="../images/logo.png" type="image/png">
  <link rel="stylesheet" href="<%= request.getContextPath() %>/HittoWeb/community/css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap">
   <link rel="stylesheet" href="<%= request.getContextPath() %>/HittoWeb/components/login-modal.css">
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
		        			<img src="<%= request.getContextPath() %>/HittoWeb/images/teams/<%= logoFile %>" 
						     alt="<%= team %>" 
						     style="width:18px;height:18px;vertical-align:middle;margin-right:2px;">
		      <% } %>
		      <strong><%= userName %></strong>님 환영합니다
		    </span>
		    <span> | </span>
		    <a href="<%= request.getContextPath() %>/HittoWeb/logout.jsp">로그아웃</a>
		  <% } else { %>
		    <a href="#" onclick="openLoginModal(); return false;">로그인</a>
		    <a href="/JSLIM/HittoWeb/signup/signup.jsp" >회원가입</a>
		  <% } %>
		</div>
    </div>
  </div>

  <!-- 헤더 (로고 및 검색) -->
  <header class="main-header">
    <div class="container">
      <div class="logo">
		<a href="<%= request.getContextPath() %>/HittoWeb/index.jsp">
		  <h1><i class="fas fa-baseball-ball"></i> HittoStore</h1>
		</a>
      </div>
      <div class="search-box">
        <input type="text" placeholder="검색어를 입력하세요">
        <button type="submit"><i class="fas fa-search"></i></button>
      </div>
      <div class="header-icons">
        <a href="../wishlist/index.jsp" class="icon-link" title="위시리스트"><i class="fas fa-heart"></i></a>
        <a href="./index.jsp" class="icon-link active" title="커뮤니티"><i class="fas fa-users"></i></a>
        <a href="../mypage/mypage.jsp" class="icon-link" title="내 계정"><i class="fas fa-user"></i></a>
        <a href="../cart/index.jsp" class="icon-link cart" title="장바구니"><i class="fas fa-shopping-cart"></i><span class="cart-count">0</span></a>
      </div>
    </div>
  </header>

  <!-- 메인 메뉴 -->
  <nav class="main-nav">
    <div class="container">
      <ul class="nav-menu">
        <li><a href="../index.jsp">쇼핑몰 홈</a></li>
        <li><a href="#" data-section="kbo">KBO</a></li>
        <li><a href="#" data-section="pro">NPB/MLB</a></li>
        <li><a href="#" data-section="national">국가대표</a></li>
        <li><a href="#" data-section="amateur">사회인야구</a></li>
        <li><a href="#" data-section="highschool">고교야구</a></li>
		<li>
		  <a href="<%= request.getContextPath() %>/community/list" class="active">
		    자유게시판
		  </a>
		</li>
        <li><a href="?category=review">구매후기</a></li>
        <li><a href="?category=notice">공지사항</a></li>
      </ul>
    </div>
  </nav>

  <!-- 메인 컨텐츠 -->
  <div class="main-content">
    <div class="container">
      <!-- 로그인 체크 섹션 -->
      <div class="login-required" id="login-required" style="<%= isLoggedIn ? "display:none;" : "" %>">
        <div class="login-message">
          <i class="fas fa-lock"></i>
          <h2>로그인이 필요합니다</h2>
          <p>커뮤니티를 이용하기 위해서는 로그인이 필요합니다.</p>
          <div class="login-buttons">
            <button class="primary-btn" id="login-btn" onclick="openLoginModal()">로그인</button>
            <a href="/JSLIM/HittoWeb/signup/signup.jsp" class="secondary-btn">회원가입</a>
          </div>
        </div>
      </div>
      
      <!-- 실제 게시판 컨텐츠 (로그인 시에만 표시) -->
      <div id="board-content" style="<%= isLoggedIn ? "" : "display:none;" %>">
        <!-- 게시판 타이틀 및 설명 -->
        <div class="board-header">
          <h2>HittoStore 커뮤니티</h2>
          <p>야구를 사랑하는 사람들의 이야기 공간입니다. 자유롭게 소통하세요!</p>
        </div>
        
        <!-- 게시판 카테고리 버튼 -->
		<div class="board-category">
		  <a href="<%= request.getContextPath() %>/community/list?category=all"
		     class="category-btn <%= "all".equals(selectedCategory) ? "active" : "" %>">전체글</a>
		
		  <a href="<%= request.getContextPath() %>/community/list?category=공지"
		     class="category-btn <%= "공지".equals(selectedCategory) ? "active" : "" %>">공지사항</a>
		
		  <a href="<%= request.getContextPath() %>/community/list?category=자유"
		     class="category-btn <%= "자유".equals(selectedCategory) ? "active" : "" %>">자유게시판</a>
		
		  <a href="<%= request.getContextPath() %>/community/list?category=구매후기"
		     class="category-btn <%= "구매후기".equals(selectedCategory) ? "active" : "" %>">구매후기</a>
		
		  <a href="<%= request.getContextPath() %>/community/list?category=야구팁"
		     class="category-btn <%= "야구팁".equals(selectedCategory) ? "active" : "" %>">야구팁</a>
		
		  <a href="<%= request.getContextPath() %>/community/list?category=FAQ"
		     class="category-btn <%= "FAQ".equals(selectedCategory) ? "active" : "" %>">FAQ</a>
		</div>
        
        <!-- 게시판 리스트 -->
        <div class="board-list">
          <div class="board-tools">
            <form action="<%= request.getContextPath() %>/community/list" method="get" class="search-form">
			  <select name="searchType">
			    <option value="title">제목</option>
			    <option value="content">내용</option>
			    <option value="writer">작성자</option>
			  </select>
			  <input type="text" name="keyword" placeholder="검색어를 입력하세요">
			  <button type="submit"><i class="fas fa-search"></i></button>
			</form>
            <a href="/JSLIM/HittoWeb/community/writeForm.jsp" class="write-btn">글쓰기</a>
          </div>
          
          <table class="board-table">
            <thead>
              <tr>
                <th class="num">번호</th>
                <th class="category">분류</th>
                <th class="title">제목</th>
                <th class="author">작성자</th>
                <th class="date">작성일</th>
                <th class="views">조회</th>
              </tr>
            </thead>
			<tbody>
			  <%-- 🔔 공지사항 먼저 출력 --%>
			  <%
			    if (postList != null && !postList.isEmpty()) {
			      for (BoardDTO post : postList) {
			        if ("공지".equals(post.getCategory())) {
			  %>
			    <tr class="notice">
			      <td class="num"><span class="notice-tag">공지</span></td>
			      <td class="category">공지</td>
			      <td class="title">
			        <a href="<%= request.getContextPath() %>/community/view?id=<%= post.getId() %>">
			          <%= post.getTitle() %>
			        </a>
			      </td>
			      <td class="author"><%= post.getWriterName() %></td>
			      <td class="date"><%= post.getRegDate().toString().substring(0, 10) %></td>
			      <td class="views"><%= post.getViews() %></td>
			    </tr>
			  <%
			        }
			      }
			
			      // 💬 일반 게시글 출력
			      for (BoardDTO post : postList) {
			        if (!"공지".equals(post.getCategory())) {
			  %>
			    <tr>
			      <td class="num"><%= post.getId() %></td>
			      <td class="category"><%= post.getCategory() %></td>
			      <td class="title">
			        <a href="<%= request.getContextPath() %>/community/view?id=<%= post.getId() %>">
			          <%= post.getTitle() %>
			        </a>
			      </td>
			      <td class="author"><%= post.getWriterName() %></td>
			      <td class="date"><%= post.getRegDate().toString().substring(0, 10) %></td>
			      <td class="views"><%= post.getViews() %></td>
			    </tr>
			  <%
			        }
			      }
			    } else {
			  %>
			    <tr>
			      <td colspan="6" style="text-align:center; padding:30px 0;">
			        등록된 게시물이 없습니다.
			      </td>
			    </tr>
			  <%
			    }
			  %>
			</tbody>




          </table>
          
          <!-- 페이지네이션 -->
          <div class="pagination">
            <a href="#" class="page-btn prev"><i class="fas fa-chevron-left"></i></a>
            <a href="#" class="page-num active">1</a>
            <a href="#" class="page-num">2</a>
            <a href="#" class="page-num">3</a>
            <a href="#" class="page-num">4</a>
            <a href="#" class="page-num">5</a>
            <a href="#" class="page-btn next"><i class="fas fa-chevron-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 푸터 -->
  <footer class="main-footer">
    <div class="container">
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
  <div id="login-modal-container" style="display: none;"></div>

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
 <script src="js/board.js"></script>
 <script src="<%= request.getContextPath() %>/HittoWeb/components/login-modal.js"></script>
 
</body>
</html> 