package controller;

import model.BoardDAO;
import model.BoardDTO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/community/view")
public class BoardViewServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. 글 번호 받기
        String idParam = request.getParameter("id");
        if (idParam == null || idParam.isEmpty()) {
            response.sendRedirect(request.getContextPath() + "/community/list");
            return;
        }

        int id = Integer.parseInt(idParam);

        // 2. 조회수 증가
        BoardDAO dao = new BoardDAO();
        dao.increaseViews(id);

        // 3. 게시글 데이터 조회
        BoardDTO post = dao.getPostById(id);

        if (post == null) {
            response.sendRedirect(request.getContextPath() + "/community/list");
            return;
        }

        // 4. 게시글 정보를 View로 전달
        request.setAttribute("post", post);
        request.getRequestDispatcher("/HittoWeb/community/view.jsp").forward(request, response);
    }
}