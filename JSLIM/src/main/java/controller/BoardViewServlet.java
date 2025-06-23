package controller;

import model.BoardDAO;
import model.BoardDTO;
import model.CommentDAO;
import model.CommentDTO;
import model.UserDAO;
import model.UserDTO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/community/view")
public class BoardViewServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        //  1. 게시글 ID 받기
        String idParam = request.getParameter("id");
        if (idParam == null || idParam.trim().isEmpty()) {
            response.sendRedirect(request.getContextPath() + "/community/list");
            return;
        }

        int postId = Integer.parseInt(idParam);

        //  2. 게시글 조회수 증가
        BoardDAO boardDAO = new BoardDAO();
        boardDAO.increaseViews(postId);

        //  3. 게시글 내용 가져오기
        BoardDTO post = boardDAO.getPostById(postId);
        if (post == null) {
            response.sendRedirect(request.getContextPath() + "/community/list");
            return;
        }

        //  4. 댓글 목록 조회
        CommentDAO commentDAO = new CommentDAO();
        List<CommentDTO> commentList = commentDAO.getCommentsByBoardId(postId);

        //  5. 게시글 + 댓글 정보를 request에 담기
        request.setAttribute("post", post);
        request.setAttribute("commentList", commentList);

        //  6. view.jsp로 포워딩
        request.getRequestDispatcher("/HittoWeb/community/view.jsp").forward(request, response);
    }
}
