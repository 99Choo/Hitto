package controller;

import model.InquiryDAO;
import model.InquiryDTO;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

@WebServlet("/HittoWeb/customerService/InquiryEditServlet")
@MultipartConfig(
    fileSizeThreshold = 1024 * 1024,      // 1MB 넘으면 디스크 임시 저장
    maxFileSize        = 5 * 1024 * 1024, // 파일당 최대 5MB
    maxRequestSize     = 15 * 1024 * 1024 // 전체 요청 최대 15MB
)
public class InquiryEditServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        System.out.println("🚀 InquiryEditServlet doPost 진입 multipart");

        // 로그인 세션 확인
        HttpSession session = request.getSession();
        String userId = (String) session.getAttribute("userId");
        if (userId == null || userId.isEmpty()) {
            response.sendRedirect(request.getContextPath() + "/HittoWeb/member/login.jsp");
            return;
        }

        // 일반 폼 필드
        String idParam       = request.getParameter("id");
        String inquiryType   = request.getParameter("inquiryType");
        String orderNumber   = request.getParameter("orderNumber");
        String name          = request.getParameter("name");
        String email         = request.getParameter("email");
        String phone         = request.getParameter("phone");
        String subject       = request.getParameter("subject");
        String message       = request.getParameter("message");
        String status        = request.getParameter("status");
        boolean agreePersonal= request.getParameter("agreePersonal") != null;
        boolean receiveEmail = request.getParameter("receiveEmail") != null;

        // id 파라미터 확인
        if (idParam == null || idParam.trim().isEmpty()) {
            response.sendRedirect(request.getContextPath() + "/HittoWeb/customerService/inquiryList.jsp?error=1");
            return;
        }
        int id = Integer.parseInt(idParam);

        // DTO 설정
        InquiryDTO dto = new InquiryDTO();
        dto.setId(id);
        dto.setUserId(userId);
        dto.setInquiryType(inquiryType);
        dto.setOrderNumber(orderNumber);
        dto.setName(name);
        dto.setEmail(email);
        dto.setPhone(phone);
        dto.setSubject(subject);
        dto.setMessage(message);
        dto.setStatus(status);
        dto.setAgreePersonal(agreePersonal);
        dto.setReceiveEmail(receiveEmail);

        // 파일 업로드 처리
        String uploadDir = getServletContext().getRealPath("/uploads");
        new File(uploadDir).mkdirs();
        for (int i = 1; i <= 3; i++) {
            Part part = request.getPart("file" + i);
            if (part != null && part.getSize() > 0) {
                String filename = Paths.get(part.getSubmittedFileName()).getFileName().toString();
                String savedName = System.currentTimeMillis() + "_" + filename;
                part.write(uploadDir + File.separator + savedName);
                switch (i) {
                    case 1 -> dto.setFile1(savedName);
                    case 2 -> dto.setFile2(savedName);
                    case 3 -> dto.setFile3(savedName);
                }
            } else {
                switch (i) {
                    case 1 -> dto.setFile1("");
                    case 2 -> dto.setFile2("");
                    case 3 -> dto.setFile3("");
                }
            }
        }

        // DB 업데이트
        InquiryDAO dao = new InquiryDAO();
        boolean result = dao.updateInquiry(dto);
        System.out.println("🔧 수정 시도 - id=" + id + ", userId=" + userId + ", 결과=" + result);

        // 리다이렉트
        response.sendRedirect(request.getContextPath() + "/HittoWeb/customerService/inquiryList.jsp");
    }
}
