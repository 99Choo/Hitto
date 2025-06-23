package model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import util.DBConnect;

public class BoardDAO {

    // ✅ 전체 게시글 목록 조회
    public List<BoardDTO> getAllPosts() {
        List<BoardDTO> posts = new ArrayList<>();
        String sql = "SELECT * FROM board ORDER BY regdate DESC";

        try (Connection conn = DBConnect.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                posts.add(mapResultSetToPost(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return posts;
    }

    // ✅ 카테고리별 게시글 가져오기
       public List<BoardDTO> getPostsByCategory(String category) {
           List<BoardDTO> posts = new ArrayList<>();
           String sql = "SELECT * FROM board WHERE category = ? ORDER BY regdate DESC";
   
           try (Connection conn = DBConnect.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
   
               pstmt.setString(1, category);
               ResultSet rs = pstmt.executeQuery();
   
               while (rs.next()) {
                   posts.add(mapResultSetToPost(rs));
               }
           } catch (SQLException e) {
               e.printStackTrace();
           }
   
           return posts;
       }


    // ✅ 공지사항만 가져오기
    public List<BoardDTO> getNoticePosts() {
        List<BoardDTO> posts = new ArrayList<>();
        String sql = "SELECT * FROM board WHERE category = '공지' ORDER BY regdate DESC";

        try (Connection conn = DBConnect.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                posts.add(mapResultSetToPost(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return posts;
    }

    // ✅ 공지사항 제외한 일반 글만 가져오기
    public List<BoardDTO> getNormalPosts() {
        List<BoardDTO> posts = new ArrayList<>();
        String sql = "SELECT * FROM board WHERE category != '공지' ORDER BY regdate DESC";

        try (Connection conn = DBConnect.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                posts.add(mapResultSetToPost(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return posts;
    }

    // ✅ 검색 기능 (제목/내용/작성자 이름)
    public List<BoardDTO> searchPosts(String searchType, String keyword) {
        List<BoardDTO> posts = new ArrayList<>();
        String column;

        // SQL Injection 방지: 허용된 타입만 매핑
        switch (searchType) {
            case "title":
            case "content":
                column = searchType;
                break;
            case "writer":
                column = "writer_name";
                break;
            default:
                column = "title";
        }

        String sql = "SELECT * FROM board WHERE " + column + " LIKE ? ORDER BY regdate DESC";

        try (Connection conn = DBConnect.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, "%" + keyword + "%");

            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                posts.add(mapResultSetToPost(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return posts;
    }

    // ✅ 게시글 등록
    public void insertPost(BoardDTO post) {
        String sql = "INSERT INTO board (category, title, content, author, writer_name, regdate, views) " +
                     "VALUES (?, ?, ?, ?, ?, NOW(), 0)";

        try (Connection conn = DBConnect.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, post.getCategory());
            pstmt.setString(2, post.getTitle());
            pstmt.setString(3, post.getContent());
            pstmt.setString(4, post.getAuthor());
            pstmt.setString(5, post.getWriterName());

            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // ✅ 게시글 단건 조회
    public BoardDTO getPostById(int id) {
        String sql = "SELECT * FROM board WHERE id = ?";
        BoardDTO post = null;

        try (Connection conn = DBConnect.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                post = mapResultSetToPost(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return post;
    }

    // ✅ 조회수 증가
    public void increaseViews(int id) {
        String sql = "UPDATE board SET views = views + 1 WHERE id = ?";

        try (Connection conn = DBConnect.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // ✅ 게시글 수정
    public void updatePost(BoardDTO post) {
        String sql = "UPDATE board SET category = ?, title = ?, content = ? WHERE id = ?";

        try (Connection conn = DBConnect.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, post.getCategory());
            pstmt.setString(2, post.getTitle());
            pstmt.setString(3, post.getContent());
            pstmt.setInt(4, post.getId());

            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // ✅ 게시글 삭제
    public void deletePost(int id) {
        String sql = "DELETE FROM board WHERE id = ?";

        try (Connection conn = DBConnect.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // ✅ 공통 DTO 매핑 함수
    private BoardDTO mapResultSetToPost(ResultSet rs) throws SQLException {
        BoardDTO post = new BoardDTO();
        post.setId(rs.getInt("id"));
        post.setCategory(rs.getString("category"));
        post.setTitle(rs.getString("title"));
        post.setContent(rs.getString("content"));
        post.setAuthor(rs.getString("author"));
        post.setWriterName(rs.getString("writer_name"));
        post.setRegDate(rs.getTimestamp("regdate"));
        post.setViews(rs.getInt("views"));
        return post;
    }
}
