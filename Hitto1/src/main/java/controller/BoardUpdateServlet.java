package controller;

import model.BoardDAO;
import model.BoardDTO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/community/update")
public class BoardUpdateServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        int id = Integer.parseInt(request.getParameter("id"));
        String title = request.getParameter("title");
        String content = request.getParameter("content");

        BoardDAO dao = new BoardDAO();
        BoardDTO post = dao.getPostById(id);

        if (post != null) {
            post.setTitle(title);
            post.setContent(content);
            dao.updatePost(post);
        }

        response.sendRedirect(request.getContextPath() + "/community/view?id=" + id);
    }
}
