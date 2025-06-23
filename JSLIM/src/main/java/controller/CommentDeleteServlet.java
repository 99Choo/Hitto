package controller;

import model.CommentDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/community/comment/delete")
public class CommentDeleteServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        //  로그인 확인
        HttpSession session = request.getSession();
        String sessionUserId = (String) session.getAttribute("userId");

        if (sessionUserId == null) {
            response.sendRedirect(request.getContextPath() + "/login.jsp");
            return;
        }

        //  파라미터 받기
        String commentIdParam = request.getParameter("id");
        String postIdParam = request.getParameter("boardId");

        if (commentIdParam == null || postIdParam == null) {
            response.sendRedirect(request.getContextPath() + "/community/list");
            return;
        }

        int commentId = Integer.parseInt(commentIdParam);
        int postId = Integer.parseInt(postIdParam);

        //  DAO 통해 삭제 (작성자 확인은 JSP에서 했음)
        CommentDAO dao = new CommentDAO();
        dao.deleteComment(commentId);

        //  다시 게시글 상세페이지로 이동
        response.sendRedirect(request.getContextPath() + "/community/view?id=" + postId);
    }
}
