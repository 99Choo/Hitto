<%
/* ======================================================
 * 파일 명: welcome.jsp
 * 작성자: 임선우, 권법진, 추상헌
 * 설명: 로그인 성공 후 사용자 이름과 좋아하는 구단 출력
 *        비로그인 접근 시 로그인 페이지로 이동
 ====================================================== */
%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%
    String name = (String) session.getAttribute("userName");
    String team = (String) session.getAttribute("team");

    if (name == null) {
        response.sendRedirect("login.html");
        return;
    }
%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>환영합니다</title>
</head>
<body>
  <h2><%= name %>님 환영합니다!</h2>
  <p>좋아하는 구단: <strong><%= team %></strong></p>
  <a href="logout.jsp">로그아웃</a>
</body>
</html>
