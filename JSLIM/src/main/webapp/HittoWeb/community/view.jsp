<%
/* ======================================================
 * 파일 명   : view.jsp
 * 작성자    : 임선우, 권법진, 추상헌
 * 작성일자  : 2025-06-23
 * 설명      : 자유게시판 게시글 상세보기 페이지
 *             - 게시글 제목/작성자/내용 출력
 *             - 댓글 및 대댓글 출력
 *             - 본인 작성글일 경우 수정/삭제 가능
 *             - 댓글 입력 및 삭제 기능 포함
 *             - 작성자 구단 로고 이미지 표시 가능
 ====================================================== */
 %>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ page import="model.BoardDTO" %>
<%@ page session="true" %>
<%@ page import="java.util.List" %>
<%@ page import="model.CommentDTO" %>
<%@ page import="model.UserDAO" %>
<%@ page import="model.UserDTO" %>
<%
    // 게시글 정보 조회 및 유효성 체크
    BoardDTO post = (BoardDTO) request.getAttribute("post");
    if (post == null) {
        response.sendRedirect(request.getContextPath() + "/community/list");
        return;
    }

    // 세션 정보 및 글 작성자 여부 확인
    String sessionUserId = (String) session.getAttribute("userId");
    boolean isWriter = sessionUserId != null && sessionUserId.equals(post.getAuthor());
    boolean isNotice = "공지".equals(post.getCategory());

    // 댓글 목록 및 작성자 정보 미리 조회하여 캐싱
    List<CommentDTO> comments = (List<CommentDTO>) request.getAttribute("commentList");
    java.util.Map<String, UserDTO> userMap = new java.util.HashMap<>();
    if (comments != null) {
        UserDAO userDAO = new UserDAO();
        for (CommentDTO c : comments) {
            String uid = c.getWriter();
            if (!userMap.containsKey(uid)) {
                userMap.put(uid, userDAO.getUserInfo(uid));
            }
        }
    }
    UserDAO postUserDAO = new UserDAO();
    UserDTO postUser = postUserDAO.getUserInfo(post.getAuthor());

    String logoFile = "default";
    if (postUser != null && postUser.getTeam() != null) {
        switch(postUser.getTeam()) {
            case "롯데": logoFile = "lotte"; break;
            case "SSG": logoFile = "ssg"; break;
            case "삼성": logoFile = "samsung"; break;
            case "LG": logoFile = "lg"; break;
            case "두산": logoFile = "doosan"; break;
            case "키움": logoFile = "kiwoom"; break;
            case "KIA": logoFile = "kia"; break;
            case "NC": logoFile = "nc"; break;
            case "KT": logoFile = "kt"; break;
            case "한화": logoFile = "hanwha"; break;
        }
    }
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title><%= post.getTitle() %> - 게시글 보기</title>
    <style>
        body {
            font-family: 'Noto Sans KR', '맑은 고딕', sans-serif;
            background: #f6f7f9;
            color: #222;
            margin: 0;
            padding: 0;
        }
        .view-container {
            max-width: 820px;
            margin: 40px auto 0 auto;
            background: #fff;
            border: 1.5px solid #e3e5e8;
            border-radius: 10px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.04);
            padding: 0 0 32px 0;
        }
        .view-header {
            border-bottom: 1.5px solid #e3e5e8;
            padding: 32px 36px 0 36px;
        }
        .view-header-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            margin-bottom: 18px;
        }
        .view-title {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 10px;
            word-break: break-all;
        }
        .view-meta-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .view-writer {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .writer-img {
            width: 38px; height: 38px;
            border-radius: 50%;
            background: #f1f3f5;
            object-fit: cover;
            border: 1px solid #e3e5e8;
        }
        .writer-name {
            font-weight: 600;
            font-size: 1.05rem;
        }
        .view-date {
            color: #888;
            font-size: 0.98rem;
            margin-left: 10px;
        }
        .view-stats {
            display: flex;
            gap: 18px;
            color: #888;
            font-size: 0.98rem;
        }
        .view-stats span { display: flex; align-items: center; gap: 3px; }
        .view-content {
            padding: 32px 36px 0 36px;
            font-size: 1.13rem;
            line-height: 1.85;
            min-height: 180px;
            margin-bottom: 32px;
        }
        .view-btns {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin: 0 0 0 0;
        }
        .btn-outline {
            background: #fff;
            color: #222;
            border: 1.5px solid #d1d5db;
            border-radius: 7px;
            padding: 8px 28px;
            font-size: 1.05rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.15s, color 0.15s;
        }
        .btn-outline:hover {
            background: #f1f3f5;
            color: #1c7ed6;
            border-color: #1c7ed6;
        }
        .btn-outline.delete {
            color: #fa5252;
            border-color: #fa5252;
        }
        .btn-outline.delete:hover {
            background: #fff0f0;
            color: #fff;
            background: #fa5252;
        }
        .comment-section {
            background: #f8f9fa;
            border-radius: 10px;
            border: 1.5px solid #e3e5e8;
            margin: 36px auto 0 auto;
            max-width: 820px;
            padding: 0 0 0 0;
        }
        .comment-title {
            font-size: 1.08rem;
            font-weight: 600;
            color: #444;
            padding: 18px 28px 0 28px;
        }
        .comment-list, .replies {
            display: block !important;
            list-style: none;
            margin: 0 !important;
            padding: 0 !important;
        }
        .comment-item, .comment-item.reply {
            display: block !important;
            position: relative;
            padding: 10px 16px;
        }
        .replies {
            list-style: none;
            margin-left: 20px !important;
            padding-left: 24px !important;
            border-left: 2px solid #e3e5e8 !important;
            margin-top: 10px;
        }
        .comment-item.reply::before {
            content: '↳';
            color: #bdbdbd;
            
            font-size: 1.1em;
            position: absolute;
            left: -18px;
            top: 12px;
        }
        .comment-body {
            flex: 1;
        }
        .comment-meta {
            color: #888; font-size: 13px; margin-left: 8px;
        }
        .comment-content {
            margin: 7px 0 0 0;
            font-size: 1.05rem;
        }
        .comment-delete-btn {
            background: #fff;
            color: #fa5252;
            border: 1px solid #fa5252;
            border-radius: 6px;
            font-size: 0.92em;
            padding: 2px 10px;
            height: 24px;
            line-height: 20px;
            margin-left: 0;
            margin-top: 0;
            vertical-align: middle;
            cursor: pointer;
            transition: background 0.15s, color 0.15s;
        }
        .comment-delete-btn:hover {
            background: #fa5252;
            color: #fff;
        }
        .comment-form-box {
            background: #f1f3f5;
            border-radius: 0 0 10px 10px;
            border-top: 1.5px solid #e3e5e8;
            padding: 18px 28px 18px 28px;
            margin-top: 0;
            margin-bottom: 48px;
        }
        .comment-form {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        .comment-input {
            flex: 1;
            min-height: 40px;
            max-height: 60px;
            border: 1.5px solid #e3e5e8;
            border-radius: 8px;
            padding: 10px 14px;
            font-size: 1rem;
            background: #fff;
            resize: none;
        }
        .btn-comment {
            background: #3973e5;
            color: #fff;
            font-weight: 600;
            border: none;
            border-radius: 10px;
            padding: 0 32px;
            height: 44px;
            font-size: 1.08rem;
            cursor: pointer;
            transition: background 0.15s;
            margin-left: 8px;
        }
        .btn-comment:hover { background: #1864ab; }
        .community-header {
            max-width: 820px;
            margin: 48px auto 0 auto;
            text-align: left;
            padding-left: 8px;
        }
        .community-title {
            font-size: 2.3rem;
            font-weight: 800;
            color: #222;
            text-decoration: none;
            letter-spacing: -1px;
            transition: color 0.15s;
        }
        .community-title:hover {
            color: #1c7ed6;
            text-decoration: underline;
        }
        .community-desc {
            font-size: 1.18rem;
            color: #888;
            margin-top: 8px;
            font-weight: 400;
        }
        .profile-row {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .profile-img-wrap {
            width: 36px; height: 36px;
            border-radius: 50%;
            background: #fff;
            border: 2px solid #222;
            box-sizing: border-box;
            overflow: hidden;
            display: flex; align-items: center; justify-content: center;
        }
        .profile-img {
            width: 36px; height: 36px;
            object-fit: contain;
            border-radius: 50%;
            background: #fff;
        }
        .profile-name {
            font-size: 1.2rem;
            font-weight: 700;
            color: #222;
            letter-spacing: -0.5px;
        }
        .view-date {
            font-size: 0.98rem;
            color: #888;
            margin-left: 6px;
        }
        .comment-profile-img-wrap {
            width: 32px; height: 32px;
            border-radius: 50%;
            background: #fff;
            border: 2px solid #222;
            box-sizing: border-box;
            overflow: hidden;
            display: flex; align-items: center; justify-content: center;
        }
        .comment-profile-img {
            width: 32px; height: 32px;
            object-fit: contain;
            border-radius: 50%;
            background: #fff;
        }
        .comment-profile-row {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .comment-item.reply {
            display: block !important;
            margin-left: 0;
            border: none;
            background: none;
            padding: 0;
            font-size: 0.97rem;
            position: relative;
        }
        .comment-item.reply .comment-body {
            display: block !important;
        }
        .comment-item.reply .comment-profile-row {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .comment-item.reply .comment-delete-btn {
            position: static !important;
            margin-left: 8px;
            margin-top: 4px;
        }
        .comment-item.reply::before {
            content: '↳';
            color: #bdbdbd;
            font-size: 1.1em;
            position: absolute;
            left: -18px;
            top: 8px;
        }
        .replies {
            margin: 0;
            border: none;
            padding: 0;
        }
        .comment-item.reply .comment-profile-row {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .comment-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            min-height: 36px;
        }
        .comment-meta-left {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .comment-meta-right, .comment-item .comment-meta-right, .comment-item.reply .comment-meta-right {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 8px !important;
            margin-left: auto !important;
        }
        .comment-meta-right form,
        .comment-item .comment-meta-right form,
        .comment-item.reply .comment-meta-right form {
            display: flex !important;
            align-items: center !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            background: none !important;
            box-shadow: none !important;
            width: auto !important;
        }
        .comment-meta-right button,
        .comment-meta-right .comment-action-btn,
        .comment-meta-right .comment-delete-btn,
        .comment-item .comment-meta-right button,
        .comment-item.reply .comment-meta-right button {
            display: inline-block !important;
            vertical-align: middle !important;
            margin: 0 !important;
        }
        .comment-action-btn {
            background: #fff;
            color: #3973e5;
            border: 1.2px solid #3973e5;
            border-radius: 7px;
            padding: 3px 16px;
            font-size: 0.97rem;
            cursor: pointer;
            transition: background 0.15s, color 0.15s;
            margin-left: 0;
        }
        .comment-action-btn:hover {
            background: #3973e5;
            color: #fff;
        }
        .comment-meta-right .comment-action-btn + .comment-delete-btn {
            margin-left: 8px;
        }
        .comment-meta-right .comment-action-btn + .comment-action-btn {
            margin-left: 8px;
        }
        .comment-reply-small {
            font-size: 0.92em;
            padding: 2px 10px;
            height: 24px;
            line-height: 20px;
            border: 1px solid #3973e5;
            color: #3973e5;
            background: #fff;
            border-radius: 6px;
            margin-left: 0;
            cursor: pointer;
            transition: background 0.15s, color 0.15s;
        }
        .comment-reply-small:hover {
            background: #3973e5;
            color: #fff;
        }
    </style>
</head>
<body>
  <!-- 커뮤니티 헤더 영역 -->
  <div class="community-header">
    <a href="<%= request.getContextPath() %>/community/list" class="community-title">HittoStore 커뮤니티</a>
    <div class="community-desc">야구를 사랑하는 사람들의 이야기 공간입니다. 자유롭게 소통하세요!</div>
  </div>

  <!-- 게시글 상세 정보 표시 -->
  <div class="view-container">
    <div class="view-header">
      <div class="view-title"><%= post.getTitle() %></div>
      <div class="view-header-row">
        <div class="view-writer">
          <div class="profile-row">
            <span class="profile-img-wrap">
              <img src="<%= request.getContextPath() %>/HittoWeb/images/teams/<%= logoFile %>.png" class="profile-img" alt="프로필">
            </span>
            <span class="profile-name"><%= post.getWriterName() %></span>
            <span class="view-date"><%= post.getRegDate().toString().substring(0, 19) %></span>
          </div>
        </div>
        <div class="view-stats">
          <span>조회 <%= post.getViews() %></span>
          <span>댓글 <%= request.getAttribute("commentList") != null ? ((java.util.List)request.getAttribute("commentList")).size() : 0 %></span>
        </div>
      </div>
    </div>

    <!-- 본문 내용 -->
    <div class="view-content">
      <%= post.getContent() != null ? post.getContent().replaceAll("\n", "<br>") : "(내용 없음)" %>
    </div>

    <!-- 버튼: 목록/수정/삭제 -->
    <div class="view-btns">
      <a href="<%= request.getContextPath() %>/community/list" class="btn-outline">목록으로</a>
      <% if (isWriter && !isNotice) { %>
        <a href="<%= request.getContextPath() %>/HittoWeb/community/editForm.jsp?id=<%= post.getId() %>" class="btn-outline">수정</a>
        <a href="<%= request.getContextPath() %>/community/delete?id=<%= post.getId() %>" class="btn-outline delete" onclick="return confirm('정말 삭제하시겠습니까?');">삭제</a>
      <% } %>
    </div>
  </div>

  <!-- 댓글 섹션 -->
  <div class="comment-section">
    <div class="comment-title">댓글</div>

    <%
      List<CommentDTO> parents = new java.util.ArrayList<>();
      java.util.Map<Integer, java.util.List<CommentDTO>> childMap = new java.util.HashMap<>();
      if (comments != null) {
        for (CommentDTO c : comments) {
          if (c.getParentId() == null) {
            parents.add(c);
          } else {
            childMap.computeIfAbsent(c.getParentId(), k -> new java.util.ArrayList<>()).add(c);
          }
        }
      }
    %>

    <!-- 댓글 목록 출력 -->
    <ul class="comment-list">
      <% if (parents != null && !parents.isEmpty()) {
           renderComments(parents, childMap, sessionUserId, post, out, request, userMap);
         } %>
    </ul>

    <!-- 댓글 작성 폼 -->
    <div class="comment-form-box">
      <% if (sessionUserId != null) { %>
        <form method="post" action="<%= request.getContextPath() %>/community/comment/add" class="comment-form">
          <input type="hidden" name="boardId" value="<%= post.getId() %>">
          <textarea name="content" class="comment-input" placeholder="댓글을 입력하세요..."></textarea>
          <button type="submit" class="btn-comment">등록</button>
        </form>
      <% } else { %>
        <p style="color: #888; margin:0;">댓글을 작성하려면 <a href="<%= request.getContextPath() %>/login.jsp">로그인</a> 해주세요.</p>
      <% } %>
    </div>
  </div>

  <script>
    function toggleReplyForm(id) {
      var el = document.getElementById('replyForm-' + id);
      if (!el) return;
      el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
    }
  </script>

 <%-- 댓글 출력 함수 정의 --%>
  <%! 
    void renderComments(java.util.List<model.CommentDTO> comments, java.util.Map<Integer, java.util.List<model.CommentDTO>> childMap, String sessionUserId, model.BoardDTO post, javax.servlet.jsp.JspWriter out, javax.servlet.http.HttpServletRequest request, java.util.Map<String, model.UserDTO> userMap) throws java.io.IOException {
      for (model.CommentDTO c : comments) {
        boolean isReply = c.getParentId() != null;
        model.UserDTO commentUser = userMap.get(c.getWriter());
        String teamLogo = "default";
        if (commentUser != null && commentUser.getTeam() != null) {
          switch (commentUser.getTeam()) {
            case "롯데": teamLogo = "lotte"; break;
            case "SSG": teamLogo = "ssg"; break;
            case "삼성": teamLogo = "samsung"; break;
            case "LG": teamLogo = "lg"; break;
            case "두산": teamLogo = "doosan"; break;
            case "키움": teamLogo = "kiwoom"; break;
            case "KIA": teamLogo = "kia"; break;
            case "NC": teamLogo = "nc"; break;
            case "KT": teamLogo = "kt"; break;
            case "한화": teamLogo = "hanwha"; break;
          }
        }
        out.println("<li class=\"comment-item" + (isReply ? " reply" : "") + "\">");
        out.println("  <div class=\"comment-body\">");
        out.println("    <div class=\"comment-header\">");
        out.println("      <div class=\"comment-meta-left\">");
        out.println("        <span class=\"comment-profile-img-wrap\"><img src='/JSLIM/HittoWeb/images/teams/" + teamLogo + ".png' class='comment-profile-img' alt='프로필'></span>");
        out.println("        <span class=\"comment-profile-name\">" + c.getWriterName() + " (ID: " + c.getWriter() + ")</span>");
        out.println("        <span class=\"comment-meta\">" + (c.getCreatedAt() != null ? c.getCreatedAt().toString().substring(0, 19) : "") + "</span>");
        out.println("        <button type='button' class='comment-reply-small' onclick=\"toggleReplyForm('" + c.getId() + "')\">답글</button>");
        if (sessionUserId != null && sessionUserId.equals(c.getWriter())) {
          out.println("        <form method='get' action='" + request.getContextPath() + "/community/comment/delete' style='display:inline;'>");
          out.println("          <input type='hidden' name='id' value='" + c.getId() + "'>");
          out.println("          <input type='hidden' name='boardId' value='" + post.getId() + "'>");
          out.println("          <button type='submit' class='comment-delete-btn'>삭제</button>");
          out.println("        </form>");
        }
        out.println("      </div>");
        out.println("    </div>");
        out.println("    <div class='comment-content'>" + c.getContent() + "</div>");
        out.println("  </div>");
        out.println("  <div id='replyForm-" + c.getId() + "' class='reply-form-box' style='display:none;'>");
        out.println("    <form method='post' action='" + request.getContextPath() + "/community/comment/add' class='comment-form'>");
        out.println("      <input type='hidden' name='boardId' value='" + post.getId() + "' />");
        out.println("      <input type='hidden' name='parentId' value='" + c.getId() + "' />");
        out.println("      <textarea name='content' class='comment-input' placeholder='답글을 입력하세요...'></textarea>");
        out.println("      <button type='submit' class='btn-comment'>등록</button>");
        out.println("    </form>");
        out.println("  </div>");
        java.util.List<model.CommentDTO> children = childMap.get(c.getId());
        if (children != null && !children.isEmpty()) {
          out.println("<ul class='replies'>");
          renderComments(children, childMap, sessionUserId, post, out, request, userMap);
          out.println("</ul>");
        }
        out.println("</li>");
      }
    }
  %>
</body>


</html>
