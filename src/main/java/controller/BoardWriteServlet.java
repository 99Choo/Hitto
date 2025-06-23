package controller;

import model.BoardDAO;
import model.BoardDTO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/community/write")
public class BoardWriteServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        // 1. 폼 데이터 받기
        String category = request.getParameter("category");
        String title = request.getParameter("title");
        String content = request.getParameter("content");
        String author = request.getParameter("author");
        String writerName = request.getParameter("writerName");

        // 2. DTO 생성
        BoardDTO post = new BoardDTO();
        post.setCategory(category);
        post.setTitle(title);
        post.setContent(content);
        post.setAuthor(author);
        post.setWriterName(writerName);

        // 3. DAO로 저장
        BoardDAO dao = new BoardDAO();
        dao.insertPost(post);

        // 4. 목록 페이지로 이동
        response.sendRedirect(request.getContextPath() + "/community/list");
    }
}
