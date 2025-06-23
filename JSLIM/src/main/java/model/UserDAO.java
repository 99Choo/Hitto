package model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {
    private final String URL = "jdbc:mariadb://localhost:3306/backend";
    private final String USER = "hitto";
    private final String PASSWORD = "1111";

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    // ✅ 회원 정보 조회
    public UserDTO getUserInfo(String userId) {
        UserDTO dto = null;
        String sql = "SELECT * FROM hitto WHERE userid = ?";

        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, userId);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                dto = new UserDTO();
                dto.setId(rs.getInt("id"));
                dto.setUserId(rs.getString("userid"));
                dto.setUserName(rs.getString("username"));
                dto.setPassword(rs.getString("password"));
                dto.setBirth(rs.getDate("birth"));  // java.sql.Date로 저장
                dto.setPhone(rs.getString("phone"));
                dto.setEmail(rs.getString("email"));
                dto.setTeam(rs.getString("team"));
                dto.setCreatedAt(rs.getDate("created_at"));  // java.sql.Date로 저장
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return dto;
    }

    // ✅ 회원 정보 수정
    public boolean updateUser(String userId, String username, String password,
                              Date birth, String phone, String email, String team) {
        StringBuilder sql = new StringBuilder("UPDATE hitto SET ");
        List<String> fields = new ArrayList<>();
        List<Object> values = new ArrayList<>();

        if (password != null && !password.trim().isEmpty()) {
            fields.add("password = ?");
            values.add(password);
        }

        fields.add("phone = ?");
        values.add(phone);

        fields.add("email = ?");
        values.add(email);

        fields.add("birth = ?");
        values.add(birth);

        fields.add("team = ?");
        values.add(team);

        sql.append(String.join(", ", fields)).append(" WHERE userid = ?");
        values.add(userId);  // WHERE 절

        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql.toString())) {

            for (int i = 0; i < values.size(); i++) {
                pstmt.setObject(i + 1, values.get(i));
            }

            return pstmt.executeUpdate() == 1;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
