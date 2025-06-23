<%@ page import="java.sql.*" %>
<%@ page contentType="text/plain; charset=UTF-8" %>
<%
    request.setCharacterEncoding("UTF-8");
    String userId = request.getParameter("userId");
    boolean isDuplicate = false;

    if (userId != null) userId = userId.trim();

    try {
        Class.forName("org.mariadb.jdbc.Driver");
        Connection conn = DriverManager.getConnection(
            "jdbc:mariadb://localhost:3306/backend", "hitto", "1111");

        if (userId != null && !userId.isEmpty()) {
            String sql = "SELECT COUNT(*) FROM hitto WHERE userid = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, userId);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next() && rs.getInt(1) > 0) {
                isDuplicate = true;
            }

            rs.close();
            pstmt.close();
        }

        conn.close();
    } catch (Exception e) {
        isDuplicate = true;
    }

    out.print(isDuplicate ? "duplicate" : "available");
%>
