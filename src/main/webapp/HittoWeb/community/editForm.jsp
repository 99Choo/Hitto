<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ page import="model.BoardDAO, model.BoardDTO" %>
<%@ page session="true" %>
<%
    String idParam = request.getParameter("id");
    if (idParam == null || idParam.isEmpty()) {
        response.sendRedirect("/community/list");
        return;
    }

    int id = Integer.parseInt(idParam);
    BoardDAO dao = new BoardDAO();
    BoardDTO post = dao.getPostById(id);

    if (post == null) {
        response.sendRedirect("/community/list");
        return;
    }
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>게시글 수정</title>
    <style>
        body { font-family: '맑은 고딕'; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: bold; margin-bottom: 5px; }
        input[type="text"], textarea, select {
            width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;
        }
        .btn { padding: 10px 20px; background-color: #1c7ed6; color: white; border: none; border-radius: 5px; cursor: pointer; }
        .btn:hover { background-color: #1864ab; }
    </style>
</head>
<body>
    <h2>🛠 게시글 수정</h2>

    <form action="<%= request.getContextPath() %>/community/update" method="post">
        <!-- 글 번호 hidden -->
        <input type="hidden" name="id" value="<%= post.getId() %>">

        <!-- 카테고리 -->
        <div class="form-group">
            <label for="category">카테고리</label>
            <select id="category" name="category" required>
                <option value="자유" <%= post.getCategory().equals("자유") ? "selected" : "" %>>자유</option>
                <option value="공지" <%= post.getCategory().equals("공지") ? "selected" : "" %>>공지</option>
            </select>
        </div>

        <!-- 제목 -->
        <div class="form-group">
            <label for="title">제목</label>
            <input type="text" id="title" name="title" value="<%= post.getTitle() %>" required>
        </div>

        <!-- 내용 -->
        <div class="form-group">
            <label for="content">내용</label>
            <textarea id="content" name="content" rows="8" required><%= post.getContent() %></textarea>
        </div>

        <!-- 제출 버튼 -->
        <button type="submit" class="btn">수정 완료</button>
    </form>
</body>
</html>
