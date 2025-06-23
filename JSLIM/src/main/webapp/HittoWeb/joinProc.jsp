<%
/* ======================================================
 * 파일 명: joinProc.jsp
 * 작성자: 임선우, 권법진, 추상헌
 * 설명: signup.html에서 전송된 데이터를 DB(hitto 테이블)에 저장
 ====================================================== */
%>
<%@ page import="java.sql.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%
  request.setCharacterEncoding("UTF-8"); // ★ 한글 POST 값 깨짐 방지
%>
<%
    String name = request.getParameter("name");
    String userId = request.getParameter("userId");
    String password = request.getParameter("password");
    String birthdate = request.getParameter("birth");
    String phone = request.getParameter("phone");
    String team = request.getParameter("team");
    String email = request.getParameter("email");

    String dbURL = "jdbc:mariadb://localhost:3306/backend?useUnicode=true&characterEncoding=UTF-8";
    String dbUser = "hitto";
    String dbPassword = "1111";

    try {
        Class.forName("org.mariadb.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mariadb://localhost:3306/backend?useUnicode=true&characterEncoding=UTF-8", "hitto", "1111");

        String checkSql = "SELECT COUNT(*) FROM hitto WHERE userid = ?";
        PreparedStatement checkStmt = conn.prepareStatement(checkSql);
        checkStmt.setString(1, userId);
        ResultSet rs = checkStmt.executeQuery();

        if (rs.next() && rs.getInt(1) > 0) {
            conn.close();
            out.println("<script>alert('❌ 이미 존재하는 아이디입니다.'); history.back();</script>");
            return;
        }
        rs.close();
        checkStmt.close();


        // INSERT 쿼리 준비 및 실행
        String sql = "INSERT INTO hitto (username, userid, password, birth, phone, team, email) VALUES (?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, name);
        pstmt.setString(2, userId);
        pstmt.setString(3, password);
        pstmt.setString(4, birthdate);
        pstmt.setString(5, phone);
        pstmt.setString(6, team != null ? team : "");
        pstmt.setString(7, email != null ? email : "");

        pstmt.executeUpdate();
        conn.close();

        // 가입 완료 후 리다이렉트
        out.print("success");

    } catch (Exception e) {
        String errMsg = e.getMessage().replace("'", "\\'").replace("\"", "\\\"");
        out.println("<script>alert('회원가입 실패: " + errMsg + "'); history.back();</script>");
    }
    
%>
