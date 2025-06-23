package controller;

import model.CommentDAO;
import model.CommentDTO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/community/comment/add")
public class CommentAddServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        //  로그인 정보 가져오기 (세션에서)
        HttpSession session = request.getSession();
        String writer = (String) session.getAttribute("userId");
        String writerName = (String) session.getAttribute("userName");

        // 로그인 안된 경우 → 로그인 페이지로 이동
        if (writer == null || writerName == null) {
            response.sendRedirect(request.getContextPath() + "/login.jsp");
            return;
        }

        //  파라미터 수집
        int postId = Integer.parseInt(request.getParameter("boardId"));
        String content = request.getParameter("content");

        //  DTO 생성
        CommentDTO comment = new CommentDTO();
        comment.setBoardId(postId);       // post_id
        comment.setWriter(writer);        // author
        comment.setWriterName(writerName);
        comment.setContent(content);

        // parentId 파라미터 처리 (대댓글용)
        String parentIdParam = request.getParameter("parentId");
        if (parentIdParam != null && !parentIdParam.isEmpty()) {
            comment.setParentId(Integer.parseInt(parentIdParam));
        } else {
            comment.setParentId(null);
        }

        //  DB에 저장
        CommentDAO dao = new CommentDAO();
        dao.insertComment(comment);

        //  다시 게시글 보기로 리다이렉트
        response.sendRedirect(request.getContextPath() + "/community/view?id=" + postId);
    }
}
