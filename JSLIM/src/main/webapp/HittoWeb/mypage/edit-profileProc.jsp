<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ page import="model.UserDAO" %>
<%@ page import="java.sql.Date" %>
<%
  request.setCharacterEncoding("UTF-8");

  String userId = request.getParameter("userId");
  String username = request.getParameter("username");
  String password = request.getParameter("password");
  String birthStr = request.getParameter("birth");
  String phone = request.getParameter("phone");
  String email = request.getParameter("email");
  String team = request.getParameter("team");

  // 디버깅 출력
  System.out.println("[DEBUG] userId: " + userId);
  System.out.println("[DEBUG] username: " + username);
  System.out.println("[DEBUG] password: " + password);
  System.out.println("[DEBUG] birthStr: " + birthStr);
  System.out.println("[DEBUG] phone: " + phone);
  System.out.println("[DEBUG] email: " + email);
  System.out.println("[DEBUG] team: " + team);

  Date birth = null;
  try {
    birth = Date.valueOf(birthStr);
  } catch (Exception e) {
    out.println("<script>alert('생년월일 형식이 잘못되었습니다.'); history.back();</script>");
    return;
  }

  UserDAO dao = new UserDAO();
  boolean result = dao.updateUser(userId, username, password, birth, phone, email, team);

  if (result) {
%>
    <script>
      alert("회원정보가 수정되었습니다.");
      location.href = "mypage.jsp";
    </script>
<% } else { %>
    <script>
      alert("회원정보 수정에 실패했습니다. 다시 시도해주세요.");
      history.back();
    </script>
<% } %>
