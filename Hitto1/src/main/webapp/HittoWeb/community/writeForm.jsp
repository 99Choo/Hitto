<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ page session="true" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>게시글 작성</title>
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
    <h2>✏️ 게시글 작성</h2>

    <form action="<%= request.getContextPath() %>/community/write" method="post">
        <!-- 카테고리 선택 -->
        <div class="form-group">
            <label for="category">카테고리</label>
            <select id="category" name="category" required>
                <option value="자유">자유</option>
                <option value="구매후기">후기</option>
                <option value="야구팁">팁</option>
                <option value="FAQ">FAQ</option>
            </select>
        </div>

        <!-- 제목 입력 -->
        <div class="form-group">
            <label for="title">제목</label>
            <input type="text" id="title" name="title" required>
        </div>

        <!-- 내용 입력 -->
        <div class="form-group">
            <label for="content">내용</label>
            <textarea id="content" name="content" rows="8" required></textarea>
        </div>

        <!-- 작성자 정보 (세션에서 가져오거나 수동 입력용 임시) -->
        <div class="form-group">
            <label for="author">작성자 ID</label>
            <input type="text" id="author" name="author" value="<%= session.getAttribute("userId") != null ? session.getAttribute("userId") : "" %>" required>
        </div>

        <div class="form-group">
            <label for="writerName">작성자 이름</label>
            <input type="text" id="writerName" name="writerName" value="<%= session.getAttribute("userName") != null ? session.getAttribute("userName") : "" %>" required>
        </div>

        <!-- 제출 버튼 -->
        <button type="submit" class="btn">등록하기</button>
    </form>
</body>
</html>
