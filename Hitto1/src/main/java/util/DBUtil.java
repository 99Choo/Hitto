package util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBUtil {
    public static Connection getConnection() {
        Connection conn = null;

        try {
            // ✅ MariaDB 드라이버 로딩
            Class.forName("org.mariadb.jdbc.Driver");

            // ✅ DB 접속 정보 (너가 실제 사용하는 DB 기준)
            String url = "jdbc:mariadb://localhost:3306/backend"; // ← DB 이름: hitto
            String user = "root";        // ← 너의 DB 사용자 이름
            String password = "1111"; // ← 실제 MariaDB 비번으로 교체!

            // ✅ 연결 시도
            conn = DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return conn;
    }
}
