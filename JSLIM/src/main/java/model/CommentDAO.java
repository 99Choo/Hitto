package model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CommentDAO {
    private final String URL = "jdbc:mariadb://localhost:3306/backend?useUnicode=true&characterEncoding=UTF-8";
    private final String USER = "hitto";
    private final String PASSWORD = "1111";

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    // 댓글 저장
    public void insertComment(CommentDTO comment) {
        String sql = "INSERT INTO comment (post_id, author, writer_name, content, regdate, parent_id) VALUES (?, ?, ?, ?, NOW(), ?)";

        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, comment.getBoardId()); // post_id로 매핑
            pstmt.setString(2, comment.getWriter()); // author로 매핑
            pstmt.setString(3, comment.getWriterName());
            pstmt.setString(4, comment.getContent());
            if (comment.getParentId() == null) {
                pstmt.setNull(5, java.sql.Types.INTEGER);
            } else {
                pstmt.setInt(5, comment.getParentId());
            }

            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 댓글 목록 조회
    public List<CommentDTO> getCommentsByBoardId(int boardId) {
        List<CommentDTO> list = new ArrayList<>();
        String sql = "SELECT * FROM comment WHERE post_id = ? ORDER BY regdate ASC";

        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, boardId);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    CommentDTO c = new CommentDTO();
                    c.setId(rs.getInt("id"));
                    c.setBoardId(rs.getInt("post_id")); // post_id → boardId로 매핑
                    c.setWriter(rs.getString("author")); // author → writer로 매핑
                    c.setWriterName(rs.getString("writer_name"));
                    c.setContent(rs.getString("content"));
                    c.setCreatedAt(rs.getTimestamp("regdate")); // regdate → createdAt으로 매핑
                    int parentId = rs.getInt("parent_id");
                    if (rs.wasNull()) c.setParentId(null);
                    else c.setParentId(parentId);
                    list.add(c);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return list;
    }

    // 댓글 삭제
    public void deleteComment(int id) {
        String sql = "DELETE FROM comment WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
