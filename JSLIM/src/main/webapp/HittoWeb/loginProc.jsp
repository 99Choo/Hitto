<%@ page import="java.sql.*, java.io.*" %>
<%@ page contentType="text/plain; charset=UTF-8" %>
<%
    String userId = request.getParameter("userId");
    String password = request.getParameter("password");

    if (userId == null || userId.trim().isEmpty() || password == null || password.trim().isEmpty()) {
        out.print("empty");
        return;
    }

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    try {
        Class.forName("org.mariadb.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mariadb://localhost:3306/backend", "hitto", "1111");

        String sql = "SELECT * FROM hitto WHERE userid = ?";
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, userId);
        rs = pstmt.executeQuery();

        if (rs.next()) {
            String dbPassword = rs.getString("password");

            if (dbPassword != null && dbPassword.trim().equals(password.trim())) {
                session.setAttribute("userName", rs.getString("username"));
                session.setAttribute("userId", userId);
                session.setAttribute("team", rs.getString("team"));
                
             // ✅ 세션 쿠키의 경로를 전체 애플리케이션으로 설정
                Cookie cookie = new Cookie("JSESSIONID", session.getId());
                cookie.setPath(request.getContextPath() + "/");
                response.addCookie(cookie);
                
                out.print("success");
            } else {
                out.print("wrong-password");
            }
        } else {
            out.print("not-found");
        }
    } catch (Exception e) {
        e.printStackTrace();
        out.print("error: " + e.getMessage());  // ✅ 에러 메시지를 클라이언트로 전달
    } finally {
        if (rs != null) try { rs.close(); } catch (Exception e) {}
        if (pstmt != null) try { pstmt.close(); } catch (Exception e) {}
        if (conn != null) try { conn.close(); } catch (Exception e) {}
    }
%>
