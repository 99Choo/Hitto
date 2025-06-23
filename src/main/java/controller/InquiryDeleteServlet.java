package controller;

import model.InquiryDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/HittoWeb/customerService/InquiryDeleteServlet")
public class InquiryDeleteServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userId = (String) request.getSession().getAttribute("userId");
        int id = Integer.parseInt(request.getParameter("id"));
        InquiryDAO dao = new InquiryDAO();
        boolean result = dao.deleteInquiry(id, userId);
        response.sendRedirect("inquiryList.jsp");
    }
} 