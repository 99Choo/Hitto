<%@ page contentType="text/html;charset=UTF-8" %>
<%
  session.invalidate(); // 세션 삭제
  response.sendRedirect("index.jsp"); // 메인 페이지로 이동
%>