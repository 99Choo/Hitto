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
  <title>회원 정보 수정</title>
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="mypage.css">
  <style>
    body {
      background-color: #f8f9fa;
      font-family: 'Noto Sans KR', sans-serif;
    }
    .edit-profile-form {
      background-color: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      max-width: 600px;
      margin: 2rem auto;
    }
    .edit-profile-form .form-group {
      margin-bottom: 1.2rem;
    }
    .edit-profile-form label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
    }
    .edit-profile-form input,
    .edit-profile-form select {
      width: 100%;
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }
    .primary-btn {
      background-color: #fa5252;
      color: white;
      padding: 0.6rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }
    .primary-btn:hover {
      background-color: #e03131;
    }
    .secondary-btn {
      margin-left: 1rem;
      text-decoration: none;
      padding: 0.6rem 1.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      color: #555;
    }
    .profile-header {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-bottom: 2rem;
    }
    .profile-image img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: contain;
      background: #f0f0f0;
    }
    .profile-info h2 {
      font-size: 1.5rem;
      margin: 0;
    }
    .profile-info p {
      color: #fa5252;
      margin: 0.3rem 0 0;
    }
  </style>
  <script>
    function validateForm() {
      const password = document.forms["editForm"]["password"].value.trim();
      if (password === "" || password === "<%= user.getPassword() %>") {
        alert("비밀번호를 반드시 변경해야 합니다. (기존 비밀번호와 다르게 입력해주세요)");
        return false;
      }
      return true;
    }
  </script>
</head>
<body>
  <section class="mypage-content">
    <div class="container">
      <div class="edit-profile-form">
        <div class="profile-header">
          <div class="profile-image">
            <img src="../images/teams/<%= logoFile %>" alt="응원 구단 로고">
          </div>
          <div class="profile-info">
            <h2><%= user.getUserName() %></h2>
            <p>일반회원</p>
          </div>
        </div>

        <form name="editForm" action="edit-profileProc.jsp" method="post" onsubmit="return validateForm();">
          <input type="hidden" name="userId" value="<%= user.getUserId() %>">
          <div class="form-group">
            <label>이름</label>
            <input type="text" name="username" value="<%= user.getUserName() %>" readonly>
          </div>
          <div class="form-group">
            <label>비밀번호</label>
            <input type="password" name="password" placeholder="변경할 비밀번호 입력">
          </div>
          <div class="form-group">
            <label>생년월일</label>
            <input type="date" name="birth" value="<%= user.getBirth() != null ? user.getBirth().toString() : "" %>" required>
          </div>
          <div class="form-group">
            <label>연락처</label>
            <input type="text" name="phone" value="<%= user.getPhone() %>" required>
          </div>
          <div class="form-group">
            <label>이메일</label>
            <input type="email" name="email" value="<%= user.getEmail() %>">
          </div>
          <div class="form-group">
            <label>응원 구단</label>
            <select name="team" required>
              <option value="">선택하세요</option>
              <option value="롯데" <%= team.equals("롯데") ? "selected" : "" %>>롯데</option>
              <option value="SSG" <%= team.equals("SSG") ? "selected" : "" %>>SSG</option>
              <option value="삼성" <%= team.equals("삼성") ? "selected" : "" %>>삼성</option>
              <option value="LG" <%= team.equals("LG") ? "selected" : "" %>>LG</option>
              <option value="두산" <%= team.equals("두산") ? "selected" : "" %>>두산</option>
              <option value="키움" <%= team.equals("키움") ? "selected" : "" %>>키움</option>
              <option value="KIA" <%= team.equals("KIA") ? "selected" : "" %>>KIA</option>
              <option value="NC" <%= team.equals("NC") ? "selected" : "" %>>NC</option>
              <option value="KT" <%= team.equals("KT") ? "selected" : "" %>>KT</option>
              <option value="한화" <%= team.equals("한화") ? "selected" : "" %>>한화</option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="primary-btn">저장하기</button>
            <a href="mypage.jsp" class="secondary-btn">취소</a>
          </div>
        </form>
      </div>
    </div>
  </section>
</body>
</html>
