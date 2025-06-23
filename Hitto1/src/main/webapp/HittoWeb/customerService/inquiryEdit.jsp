<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java"%>
<%@ page session="true" %>
<%@ page import="model.InquiryDAO, model.InquiryDTO" %>
<%
    String userId = (String) session.getAttribute("userId");
    String idParam = request.getParameter("id");

    if (userId == null || idParam == null) {
        out.println("<script>alert('잘못된 접근입니다.'); history.back();</script>");
        return;
    }

    int id = Integer.parseInt(idParam);
    InquiryDAO dao = new InquiryDAO();
    InquiryDTO dto = dao.getInquiryByIdAndUser(id, userId);

    if (dto == null) {
        out.println("<script>alert('수정 권한이 없거나 글이 존재하지 않습니다.'); history.back();</script>");
        return;
    }
%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>문의글 수정 - HittoStore</title>
    <link rel="stylesheet" href="<%= request.getContextPath() %>/HittoWeb/customerService/customerService.css">
</head>
<body>
<div class="edit-inquiry-container">
    <h2>문의글 수정</h2>
    <form action="<%= request.getContextPath() %>/HittoWeb/customerService/InquiryEditServlet" method="post" enctype="multipart/form-data">
        <input type="hidden" name="id" value="<%= dto.getId() %>">

        <div class="form-group">
            <label>문의 유형</label>
            <input type="text" name="inquiryType" value="<%= dto.getInquiryType() %>" required>
        </div>

        <div class="form-group">
            <label>주문번호</label>
            <input type="text" name="orderNumber" value="<%= dto.getOrderNumber() != null ? dto.getOrderNumber() : "" %>">
        </div>

        <div class="form-group">
            <label>이름</label>
            <input type="text" name="name" value="<%= dto.getName() %>" required>
        </div>

        <div class="form-group">
            <label>이메일</label>
            <input type="email" name="email" value="<%= dto.getEmail() %>" required>
        </div>

        <div class="form-group">
            <label>연락처</label>
            <input type="tel" name="phone" value="<%= dto.getPhone() != null ? dto.getPhone() : "" %>">
        </div>

        <div class="form-group">
            <label>제목</label>
            <input type="text" name="subject" value="<%= dto.getSubject() %>" required>
        </div>

        <div class="form-group">
            <label>내용</label>
            <textarea name="message" required><%= dto.getMessage() %></textarea>
        </div>

        <div class="form-group">
            <label>상태</label>
            <input type="text" name="status" value="<%= dto.getStatus() %>">
        </div>

        <!-- 파일 첨부 필드 추가 -->
        <div class="form-group">
            <label>파일 첨부 (선택)</label>
            <div class="file-upload">
                <input type="file" name="file1" class="form-control-file">
                <input type="file" name="file2" class="form-control-file">
                <input type="file" name="file3" class="form-control-file">
            </div>
        </div>

        <button type="submit" class="submit-btn">수정 완료</button>
    </form>
</div>
</body>
</html>