package controller;

import model.InquiryDTO;
import model.InquiryDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

@WebServlet("/HittoWeb/customerService/InquirySubmitServlet")
@MultipartConfig(
    fileSizeThreshold = 1024 * 1024,  // 1MB
    maxFileSize        = 5 * 1024 * 1024,    // 개별 파일 최대 5MB
    maxRequestSize     = 15 * 1024 * 1024   // 전체 요청 최대 15MB
)
public class InquirySubmitServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");

        // 로그인 확인
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("userId");
        if (userId == null || userId.isEmpty()) {
            response.sendRedirect(request.getContextPath() + "/HittoWeb/member/login.jsp");
            return;
        }

        InquiryDTO dto = new InquiryDTO();
        dto.setUserId(userId);
        dto.setInquiryType(request.getParameter("inquiryType"));
        dto.setOrderNumber(request.getParameter("orderNumber"));
        dto.setName(request.getParameter("name"));
        dto.setEmail(request.getParameter("email"));
        dto.setPhone(request.getParameter("phone"));
        dto.setSubject(request.getParameter("subject"));
        dto.setMessage(request.getParameter("message"));
        dto.setAgreePersonal(request.getParameter("agreePersonal") != null);
        dto.setReceiveEmail(request.getParameter("receiveEmail") != null);

        // 파일 업로드 경로 준비
        String uploadPath = getServletContext().getRealPath("/uploads");
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) uploadDir.mkdirs();

        // 파일 저장 및 DTO 설정
        dto.setFile1(saveFilePart(request.getPart("file1"), uploadPath));
        dto.setFile2(saveFilePart(request.getPart("file2"), uploadPath));
        dto.setFile3(saveFilePart(request.getPart("file3"), uploadPath));

        // 초기 상태 설정
        dto.setAnswer(null);
        dto.setAnswered(false);
        dto.setAnsweredAt(null);
        dto.setStatus("active");

        // DB INSERT
        InquiryDAO dao = new InquiryDAO();
        boolean result = dao.insertInquiry(dto);

        String ctx = request.getContextPath();
        if (result) {
            response.sendRedirect(ctx + "/HittoWeb/customerService/inquiryList.jsp");
        } else {
            response.sendRedirect(ctx + "/HittoWeb/customerService/inquiryForm.jsp?error=1");
        }
    }

    /**
     * 파일 Part 저장, 저장된 파일명을 반환. 저장 안되면 null 반환.
     */
    private String saveFilePart(Part part, String uploadDir) throws IOException {
        if (part == null || part.getSize() == 0) return null;
        String submitted = Paths.get(part.getSubmittedFileName()).getFileName().toString();
        String savedName = System.currentTimeMillis() + "_" + submitted;
        part.write(uploadDir + File.separator + savedName);
        return savedName;
    }
}
