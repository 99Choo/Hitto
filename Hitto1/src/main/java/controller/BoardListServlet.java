package controller;

import model.BoardDAO;
import model.BoardDTO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/community/list")
public class BoardListServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String searchType = request.getParameter("searchType");
        String keyword = request.getParameter("keyword");
        String category = request.getParameter("category");

        BoardDAO dao = new BoardDAO();
        List<BoardDTO> noticePosts = dao.getNoticePosts(); // 공지사항은 항상 상단
        List<BoardDTO> postList;

        if (searchType != null && keyword != null && !keyword.trim().isEmpty()) {
            postList = dao.searchPosts(searchType, keyword);
        } else if (category != null && !category.equals("all")) {
            postList = dao.getPostsByCategory(category);
        } else {
            postList = dao.getAllPosts();
        }

        request.setAttribute("notices", noticePosts);
        request.setAttribute("postList", postList);
        request.getRequestDispatcher("/HittoWeb/community/index.jsp")
               .forward(request, response);
    }
}

