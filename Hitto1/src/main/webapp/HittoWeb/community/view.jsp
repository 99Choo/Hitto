<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ page import="model.BoardDTO" %>
<%@ page session="true" %>
<%
    BoardDTO post = (BoardDTO) request.getAttribute("post");
    if (post == null) {
        response.sendRedirect(request.getContextPath() + "/community/list");
        return;
    }

    String sessionUserId = (String) session.getAttribute("userId");  // 로그인한 사용자 ID
    boolean isWriter = sessionUserId != null && sessionUserId.equals(post.getAuthor());
    boolean isNotice = "공지".equals(post.getCategory());  // 공지인지 판별
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title><%= post.getTitle() %> - 게시글 보기</title>
    <style>
        body { font-family: '맑은 고딕'; padding: 20px; }
        .post-box { border: 1px solid #ccc; border-radius: 10px; padding: 20px; background-color: #f9f9f9; }
        .post-header { margin-bottom: 20px; }
        .post-title { font-size: 24px; font-weight: bold; }
        .post-meta { font-size: 14px; color: #555; margin-top: 5px; }
        .post-content { white-space: pre-line; margin-top: 30px; font-size: 16px; line-height: 1.6; }
        .btn-box { margin-top: 30px; }
        .btn {
            padding: 8px 16px;
            margin-right: 10px;
            background-color: #1c7ed6;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
        }
        .btn:hover { background-color: #1864ab; }
        .btn.delete { background-color: #d6336c; }
    </style>
</head>
<body>

<div class="post-box">
    <div class="post-header">
        <div class="post-title"><%= post.getTitle() %></div>
        <div class="post-meta">
            👤 <%= post.getWriterName() %> (ID: <%= post.getAuthor() %>) |
            📅 <%= post.getRegDate().toString().substring(0, 19) %> |
            👁️ 조회수: <%= post.getViews() %> |
            📂 카테고리: <%= post.getCategory() %>
        </div>
    </div>

    <!-- ✅ 본문 내용 출력 -->
    <div class="post-content">
        <%= post.getContent() != null ? post.getContent().replaceAll("\n", "<br>") : "(내용 없음)" %>
    </div>

    <!-- ✅ 버튼 영역 -->
    <div class="btn-box">
        <a href="<%= request.getContextPath() %>/community/list" class="btn">목록</a>

        <% if (isWriter && !isNotice) { %>
            <a href="<%= request.getContextPath() %>/HittoWeb/community/editForm.jsp?id=<%= post.getId() %>" class="btn">수정</a>
            <a href="<%= request.getContextPath() %>/community/delete?id=<%= post.getId() %>" class="btn delete"
               onclick="return confirm('정말 삭제하시겠습니까?');">삭제</a>
        <% } %>
    </div>
</div>

</body>
</html>
