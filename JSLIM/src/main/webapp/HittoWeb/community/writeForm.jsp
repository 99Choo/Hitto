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
        .form-row { display: flex; }
        .form-half { flex: 1; margin-right: 12px; margin-left: 12px; }
    </style>
</head>
<body>
    <div style="position:absolute; left:24px; top:18px; z-index:10;">
        <a href="javascript:history.back()" class="back-btn"
           style="display:flex; align-items:center; color:#222; font-size:1.6rem; font-weight:700; text-decoration:none; padding:0; background:none; border:none; box-shadow:none; transition:color 0.15s;">
            &#8592;
        </a>
    </div>
    <header class="main-header" style="background: #fff; border-bottom: 1px solid #eee;">
        <div class="container" style="display:flex; align-items:center; justify-content:center; gap:8px; padding:10px 0 6px 0;">
            <a href="<%= request.getContextPath() %>/HittoWeb/index.jsp" style="display:flex; align-items:center; gap:8px; text-decoration:none; position:relative; top:-15px;">
                <img src="<%= request.getContextPath() %>/HittoWeb/images/logo.png" alt="HittoStore 로고" style="height:28px;">
                <span style="font-size:2.1rem; font-weight:700; color:#222; letter-spacing:-1px;">HittoStore</span>
            </a>
        </div>
    </header>

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
            <!-- Quill 에디터 영역 추가 -->
            <div id="editor" style="height:400px;"></div>
            <!-- 기존 textarea는 숨기기만! -->
            <textarea id="content" name="content" rows="8" style="display:none;"></textarea>
        </div>

        <!-- 작성자 정보 (세션에서 가져오거나 수동 입력용 임시) -->
        <div class="form-row">
            <div class="form-group form-half" style="flex:1; margin-right:12px;">
                <label for="author">작성자 ID</label>
                <input type="text" id="author" name="author" value="<%= session.getAttribute("userId") != null ? session.getAttribute("userId") : "" %>" required readonly style="background:#f1f3f5; color:#888;">
            </div>
            <div class="form-group form-half" style="flex:1; margin-left:12px;">
                <label for="writerName">작성자 이름</label>
                <input type="text" id="writerName" name="writerName" value="<%= session.getAttribute("userName") != null ? session.getAttribute("userName") : "" %>" required readonly style="background:#f1f3f5; color:#888;">
            </div>
        </div>

        <!-- 제출 버튼 -->
        <div style="display:flex; justify-content:flex-end;">
            <button type="submit" class="btn" style="background:#fa5252; color:#fff; width:auto; min-width:120px;">등록하기</button>
        </div>
    </form>
    <!-- Quill CSS CDN 추가 -->
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <!-- Quill JS CDN 추가 -->
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <!-- 커스텀 JS 추가 -->
    <script src="js/write-editor.js"></script>
</body>
</html>
