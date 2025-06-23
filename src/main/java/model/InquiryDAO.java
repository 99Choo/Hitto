package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import util.DBUtil;
import java.util.ArrayList;
import java.util.List;

public class InquiryDAO {

    public boolean insertInquiry(InquiryDTO dto) {
        String sql = "INSERT INTO inquiries (" +
                "user_id, inquiry_type, order_number, name, email, phone, subject, message, " +
                "file1, file2, file3, agree_personal, receive_email, answer, is_answered, answered_at, status, created_at, updated_at" +
                ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DBUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, dto.getUserId());
            pstmt.setString(2, dto.getInquiryType());
            pstmt.setString(3, dto.getOrderNumber());
            pstmt.setString(4, dto.getName());
            pstmt.setString(5, dto.getEmail());
            pstmt.setString(6, dto.getPhone());
            pstmt.setString(7, dto.getSubject());
            pstmt.setString(8, dto.getMessage());
            pstmt.setString(9, dto.getFile1());
            pstmt.setString(10, dto.getFile2());
            pstmt.setString(11, dto.getFile3());
            pstmt.setBoolean(12, dto.isAgreePersonal());
            pstmt.setBoolean(13, dto.isReceiveEmail());
            pstmt.setString(14, dto.getAnswer());
            pstmt.setBoolean(15, dto.isAnswered());
            Timestamp answeredAt = dto.getAnsweredAt();
            if (answeredAt != null) {
                pstmt.setTimestamp(16, answeredAt);
            } else {
                pstmt.setNull(16, java.sql.Types.TIMESTAMP);
            }
            pstmt.setString(17, dto.getStatus());
            pstmt.setTimestamp(18, new Timestamp(System.currentTimeMillis()));
            pstmt.setTimestamp(19, new Timestamp(System.currentTimeMillis()));

            return pstmt.executeUpdate() == 1;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<InquiryDTO> getInquiriesByUserId(String userId) {
        List<InquiryDTO> list = new ArrayList<>();
        String sql = "SELECT * FROM inquiries WHERE user_id = ? ORDER BY created_at DESC";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, userId);
            java.sql.ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                InquiryDTO dto = new InquiryDTO();
                dto.setId(rs.getInt("id"));
                dto.setUserId(rs.getString("user_id"));
                dto.setInquiryType(rs.getString("inquiry_type"));
                dto.setOrderNumber(rs.getString("order_number"));
                dto.setName(rs.getString("name"));
                dto.setEmail(rs.getString("email"));
                dto.setPhone(rs.getString("phone"));
                dto.setSubject(rs.getString("subject"));
                dto.setMessage(rs.getString("message"));
                dto.setFile1(rs.getString("file1"));
                dto.setFile2(rs.getString("file2"));
                dto.setFile3(rs.getString("file3"));
                dto.setAgreePersonal(rs.getBoolean("agree_personal"));
                dto.setReceiveEmail(rs.getBoolean("receive_email"));
                dto.setAnswer(rs.getString("answer"));
                dto.setAnswered(rs.getBoolean("is_answered"));
                dto.setAnsweredAt(rs.getTimestamp("answered_at"));
                dto.setStatus(rs.getString("status"));
                dto.setCreatedAt(rs.getTimestamp("created_at"));
                dto.setUpdatedAt(rs.getTimestamp("updated_at"));
                list.add(dto);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    public boolean deleteInquiry(int id, String userId) {
        String sql = "DELETE FROM inquiries WHERE id=? AND user_id=?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.setString(2, userId);
            return pstmt.executeUpdate() == 1;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public InquiryDTO getInquiryByIdAndUser(int id, String userId) {
        String sql = "SELECT * FROM inquiries WHERE id=? AND user_id=?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.setString(2, userId);
            java.sql.ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                InquiryDTO dto = new InquiryDTO();
                dto.setId(rs.getInt("id"));
                dto.setUserId(rs.getString("user_id"));
                dto.setInquiryType(rs.getString("inquiry_type"));
                dto.setOrderNumber(rs.getString("order_number"));
                dto.setName(rs.getString("name"));
                dto.setEmail(rs.getString("email"));
                dto.setPhone(rs.getString("phone"));
                dto.setSubject(rs.getString("subject"));
                dto.setMessage(rs.getString("message"));
                dto.setFile1(rs.getString("file1"));
                dto.setFile2(rs.getString("file2"));
                dto.setFile3(rs.getString("file3"));
                dto.setAgreePersonal(rs.getBoolean("agree_personal"));
                dto.setReceiveEmail(rs.getBoolean("receive_email"));
                dto.setAnswer(rs.getString("answer"));
                dto.setAnswered(rs.getBoolean("is_answered"));
                dto.setAnsweredAt(rs.getTimestamp("answered_at"));
                dto.setStatus(rs.getString("status"));
                dto.setCreatedAt(rs.getTimestamp("created_at"));
                dto.setUpdatedAt(rs.getTimestamp("updated_at"));
                return dto;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean updateInquiry(InquiryDTO dto) {
        String sql = "UPDATE inquiries SET inquiry_type=?, order_number=?, name=?, email=?, phone=?, subject=?, message=?, file1=?, file2=?, file3=?, agree_personal=?, receive_email=?, status=?, updated_at=NOW() WHERE id=? AND user_id=?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, dto.getInquiryType());
            pstmt.setString(2, dto.getOrderNumber());
            pstmt.setString(3, dto.getName());
            pstmt.setString(4, dto.getEmail());
            pstmt.setString(5, dto.getPhone());
            pstmt.setString(6, dto.getSubject());
            pstmt.setString(7, dto.getMessage());

            pstmt.setString(8, dto.getFile1() != null ? dto.getFile1() : "");
            pstmt.setString(9, dto.getFile2() != null ? dto.getFile2() : "");
            pstmt.setString(10, dto.getFile3() != null ? dto.getFile3() : "");

            pstmt.setBoolean(11, dto.isAgreePersonal());
            pstmt.setBoolean(12, dto.isReceiveEmail());
            pstmt.setString(13, dto.getStatus());
            pstmt.setInt(14, dto.getId());
            pstmt.setString(15, dto.getUserId());

            int rows = pstmt.executeUpdate();
            System.out.println("\uD83D\uDD27 수정된 행 수: " + rows);
            return rows > 0;

        } catch (Exception e) {
            System.out.println("\u274C 수정 중 예외 발생: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}