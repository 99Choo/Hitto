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
        body {
            font-family: 'Noto Sans KR', '맑은 고딕', sans-serif;
            background: linear-gradient(120deg, #f7f9fa 60%, #e7f1ff 100%);
            color: #222;
            margin: 0;
            padding: 0;
        }
        .main-nav {
            width: 100%;
            background: #fff;
            box-shadow: 0 2px 12px rgba(30,126,214,0.06);
            margin-bottom: 36px;
        }
        .main-nav-inner {
            max-width: 900px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 64px;
            padding: 0 32px;
        }
        .nav-logo {
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            font-weight: 900;
            color: #000 !important;
            text-decoration: none;
            letter-spacing: -1px;
            cursor: default;
            margin: 0 auto;
        }
        .edit-header {
            max-width: 600px;
            margin: 56px auto 0 auto;
            text-align: left;
            padding-left: 8px;
        }
        .edit-title {
            font-size: 2.1rem;
            font-weight: 800;
            color: #000 !important;
            margin-bottom: 8px;
            letter-spacing: -1px;
            cursor: default;
            text-decoration: none;
        }
        .edit-desc {
            font-size: 1.08rem;
            color: #888;
            margin-bottom: 32px;
        }
        .edit-container {
            max-width: 600px;
            margin: 0 auto 48px auto;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 8px 36px rgba(30,126,214,0.13);
            padding: 48px 44px 38px 44px;
        }
        .form-group {
            margin-bottom: 30px;
        }
        label {
            display: block;
            font-weight: 700;
            margin-bottom: 10px;
            font-size: 1.13rem;
            color: #333;
        }
        input[type="text"], textarea, select {
            width: 100%;
            padding: 16px 18px;
            border: 2px solid #e3e5e8;
            border-radius: 12px;
            font-size: 1.15rem;
            background: #f8f9fa;
            transition: border 0.18s, box-shadow 0.18s;
            box-sizing: border-box;
        }
        input[type="text"]:focus, textarea:focus, select:focus {
            border-color: #1c7ed6;
            outline: none;
            background: #fff;
            box-shadow: 0 0 0 2px #e7f1ff;
        }
        input[type="text"]::placeholder, textarea::placeholder {
            color: #bbb;
            font-size: 1.08rem;
        }
        textarea {
            min-height: 200px;
            resize: vertical;
        }
        .btn-row {
            display: flex;
            gap: 14px;
            margin-top: 18px;
        }
        .btn-red {
            flex: 1;
            padding: 18px 0;
            background: linear-gradient(90deg, #e03131 0%, #fa5252 100%);
            color: #fff;
            border: none;
            border-radius: 14px;
            font-size: 1.22rem;
            font-weight: 900;
            cursor: pointer;
            box-shadow: 0 4px 18px rgba(224,49,49,0.13);
            transition: background 0.18s, box-shadow 0.18s, transform 0.12s;
            letter-spacing: -1px;
        }
        .btn-red:hover {
            background: linear-gradient(90deg, #fa5252 0%, #e03131 100%);
            box-shadow: 0 8px 28px rgba(224,49,49,0.18);
            transform: translateY(-2px) scale(1.03);
        }
        .btn-cancel {
            flex: 1;
            padding: 18px 0;
            background: #222;
            color: #fff;
            border: none;
            border-radius: 14px;
            font-size: 1.22rem;
            font-weight: 900;
            cursor: pointer;
            box-shadow: 0 4px 18px rgba(130,130,130,0.10);
            transition: background 0.18s, box-shadow 0.18s, transform 0.12s;
            letter-spacing: -1px;
        }
        .btn-cancel:hover {
            background: #111;
            color: #fff;
            box-shadow: 0 8px 28px rgba(30,30,30,0.13);
            transform: translateY(-2px) scale(1.03);
        }
        @media (max-width: 700px) {
            .edit-header, .edit-container { padding: 18px 4vw; }
            .edit-title { font-size: 1.4rem; }
            .edit-container { padding: 28px 4vw 18px 4vw; }
        }
    </style>
</head>
<body>
    <nav class="main-nav">
        <div class="main-nav-inner">
            <div class="nav-logo">🛠 게시글 수정</div>
        </div>
    </nav>
    
    <div class="edit-container">
        <form action="<%= request.getContextPath() %>/community/update" method="post">
            <!-- 글 번호 hidden -->
            <input type="hidden" name="id" value="<%= post.getId() %>">
            <!-- 카테고리 -->
            <div class="form-group">
                <label for="category">카테고리</label>
                <select id="category" name="category" required>
                    <option value="자유" <%= post.getCategory().equals("자유") ? "selected" : "" %>>자유</option>
                    <option value="구매후기" <%= post.getCategory().equals("구매후기") ? "selected" : "" %>>후기</option>
                    <option value="야구팁" <%= post.getCategory().equals("야구팁") ? "selected" : "" %>>팁</option>
                    <option value="FAQ" <%= post.getCategory().equals("FAQ") ? "selected" : "" %>>FAQ</option>
                </select>
            </div>
            <!-- 제목 -->
            <div class="form-group">
                <label for="title">제목</label>
                <input type="text" id="title" name="title" value="<%= post.getTitle() %>" required placeholder="제목을 입력하세요">
            </div>
            <!-- 내용 -->
            <div class="form-group">
                <label for="content">내용</label>
                <textarea id="content" name="content" rows="8" required placeholder="내용을 입력하세요..."><%= post.getContent() %></textarea>
            </div>
            <!-- 제출 버튼 -->
            <div class="btn-row">
                <button type="submit" class="btn-red">수정 완료</button>
                <button type="button" class="btn-cancel" onclick="history.back()">수정 취소</button>
            </div>
        </form>
    </div>
</body>
</html>
