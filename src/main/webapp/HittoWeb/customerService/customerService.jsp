<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java"%>
<%@ page session="true" %>
<%
  String userName = (String) session.getAttribute("userName");
  String userId = (String) session.getAttribute("userId");
  String team = (String) session.getAttribute("team");
  String teamName = "";
  String logoFile = "";  // ✅ 팀 로고 파일명 저장용

  if (team != null) {
      teamName = team;
      switch(team) {
          case "롯데":   logoFile = "lotte.png";   break;
          case "SSG":    logoFile = "ssg.png";     break;
          case "삼성":   logoFile = "samsung.png"; break;
          case "LG":     logoFile = "lg.png";      break;
          case "두산":   logoFile = "doosan.png";  break;
          case "키움":   logoFile = "kiwoom.png";  break;
          case "KIA":    logoFile = "kia.png";     break;
          case "NC":     logoFile = "nc.png";      break;
          case "KT":     logoFile = "kt.png";      break;
          case "한화":   logoFile = "hanwha.png";  break;
      }
  }
%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>고객센터 - HittoStore</title>
    <link rel="icon" href="../images/logo.png" type="image/png">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="customerService.css">
</head>
<body>
    <!-- 상단 메뉴 바 -->
    <div class="top-bar">
        <div class="container">
            <div class="top-menu-left">
                <a href="../orderDelivery/orderDelivery.jsp">주문/배송</a>
                <a href="./customerService.jsp" class="active">고객센터</a>
            </div>
            <%-- 상단 로그인/로그아웃 링크 --%>
<div class="top-menu-right">
  <% if (userName != null) { %>
    <span>
      <% if (!logoFile.isEmpty()) { %>
        <img src="../images/teams/<%= logoFile %>" alt="<%= team %>" style="width:18px;height:18px;vertical-align:middle;margin-right:2px;">
      <% } %>
      <strong><%= userName %></strong>님 환영합니다
    </span>
    <span> | </span>
    <a href="../logout.jsp">로그아웃</a>
  <% } else { %>
    <a href="#" onclick="openLoginModal(); return false;">로그인</a>
    <a href="../signup/signup.jsp">회원가입</a>
  <% } %>
</div>   
        </div>
    </div>
    
    <!-- 메인 헤더 (로고 및 검색) -->
    <header class="main-header">
        <div class="container">
            <div class="logo">
                <a href="../index.jsp">
                    <h1><i class="fas fa-baseball-ball"></i> HittoStore</h1>
                </a>
            </div>
        </div>
    </header>
    
    <!-- 고객센터 히어로 배너 -->
    <div class="cs-hero">
        <div class="cs-hero-content">
            <h1>HittoStore 고객센터</h1>
            <p>무엇을 도와드릴까요? 어떤 문의든 빠르고 친절하게 도와드리겠습니다.</p>
            <div class="cs-quick-links">
                <a href="#faq-section" class="quick-link-btn"><i class="fas fa-question-circle"></i> 자주 묻는 질문</a>
                <a href="inquiryForm.jsp" class="quick-link-btn"><i class="fas fa-paper-plane"></i> 1:1 문의하기</a>
                <a href="inquiryList.jsp" class="quick-link-btn"><i class="fas fa-list-alt"></i> 문의 내역보기</a>
            </div>
        </div>
    </div>
    
    <div class="container">
        <!-- 뒤로가기 버튼 -->
        <a href="../index.jsp" class="back-button">
            <i class="fas fa-chevron-left"></i> 홈으로 돌아가기
        </a>
        
        <!-- 페이지 헤더 -->
        <div class="cs-header">
            <h2>자주 묻는 질문 (FAQ)</h2>
            <p>HittoStore 이용 시 궁금한 점들을 카테고리별로 정리했습니다</p>
        </div>
        
        <!-- FAQ 컨텐츠 -->
        <div class="cs-content">
            <!-- FAQ 섹션 -->
            <div class="faq-section" id="faq-section" style="width: 100%;">
                <div class="faq-container">
                    <h3 class="faq-title"><i class="fas fa-question-circle"></i> 자주 묻는 질문 (FAQ)</h3>
                    <div class="faq-categories">
                        <div class="faq-category active" data-category="all">전체</div>
                        <div class="faq-category" data-category="order">주문/결제</div>
                        <div class="faq-category" data-category="delivery">배송</div>
                        <div class="faq-category" data-category="return">교환/반품</div>
                        <div class="faq-category" data-category="product">상품</div>
                        <div class="faq-category" data-category="member">회원</div>
                    </div>
                    <ul class="faq-list">
                        <li class="faq-item" data-category="delivery">
                            <div class="faq-question">
                                <div class="faq-question-text">배송은 얼마나 걸리나요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                            </div>
                            <div class="faq-answer">
                                주문하신 상품은 결제 확인 후 1-2일 내에 출고되며, 출고 후 평균 1-2일 내에 수령 가능합니다. 
                                단, 주말이나 공휴일에는 배송이 지연될 수 있습니다. 상품 수령까지 평균 2-3일 정도 소요됩니다.
                                <br><br>
                                배송 진행 상황은 <a href="../orderDelivery/orderDelivery.jsp">주문/배송 조회</a> 페이지에서 확인하실 수 있습니다.
                            </div>
                        </li>
                        <li class="faq-item" data-category="return">
                            <div class="faq-question">
                                <div class="faq-question-text">반품/교환은 어떻게 신청하나요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                            </div>
                            <div class="faq-answer">
                                상품 수령 후 7일 이내에 고객센터로 반품/교환 신청을 해주세요. 
                                제품 하자나 오배송의 경우 배송비는 HittoStore가 부담합니다. 
                                단순 변심의 경우 왕복 배송비는 고객님 부담입니다.
                                <br><br>
                                <b>반품/교환 절차</b>
                                <br>
                                1. 고객센터 문의 또는 마이페이지에서 반품/교환 신청
                                <br>
                                2. 담당자 확인 후 반품/교환 승인
                                <br>
                                3. 안내에 따라 상품 발송
                                <br>
                                4. 반품 상품 확인 후 환불 또는 교환품 발송
                            </div>
                        </li>
                        <li class="faq-item" data-category="product">
                            <div class="faq-question">
                                <div class="faq-question-text">야구 글러브 사이즈는 어떻게 선택하나요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                            </div>
                            <div class="faq-answer">
                                글러브 사이즈는 포지션과 손 크기에 따라 달라집니다. 
                                <br><br>
                                <b>포지션별 권장 사이즈</b>
                                <br>
                                - 투수: 11.5~12인치
                                <br>
                                - 내야수: 11.25~11.75인치
                                <br>
                                - 외야수: 12~13인치
                                <br>
                                - 포수: 32~34인치 미트
                                <br><br>
                                자세한 내용은 상품 페이지의 사이즈 가이드를 참고해주세요.
                            </div>
                        </li>
                        <li class="faq-item" data-category="member">
                            <div class="faq-question">
                                <div class="faq-question-text">회원가입시 어떤 혜택이 있나요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                            </div>
                            <div class="faq-answer">
                                회원가입 시 2,000원 적립금과 신규 회원 10% 할인 쿠폰을 드립니다. 
                                추가로 구매 금액의 2%가 적립되며, 생일 축하 쿠폰과 시즌별 특별 이벤트 참여 혜택도 있습니다.
                                <br><br>
                                <b>회원 등급별 혜택</b>
                                <br>
                                - 신규 회원: 가입 쿠폰, 첫 구매 10% 할인
                                <br>
                                - 일반 회원: 구매금액의 2% 적립
                                <br>
                                - 우수 회원: 구매금액의 3% 적립, 무료배송 쿠폰
                                <br>
                                - VIP 회원: 구매금액의 5% 적립, 무료배송, 할인 쿠폰
                            </div>
                        </li>
                        <li class="faq-item" data-category="product">
                            <div class="faq-question">
                                <div class="faq-question-text">야구 배트 선택 시 고려해야 할 점은 무엇인가요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                            </div>
                            <div class="faq-answer">
                                배트 선택 시 재질(알루미늄, 컴포지트, 목재), 길이, 무게, 그립감을 고려해야 합니다. 
                                선수의 체격과 타격 스타일에 맞는 배트를 선택하는 것이 중요합니다. 
                                초보자는 컴포지트나 경량 알루미늄 배트를, 경험자는 목재 배트를 추천합니다.
                            </div>
                        </li>
                        <li class="faq-item" data-category="order">
                            <div class="faq-question">
                                <div class="faq-question-text">주문 후 결제 방법을 변경할 수 있나요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                            </div>
                            <div class="faq-answer">
                                결제 완료 후에는 결제 방법 변경이 불가능합니다. 변경을 원하시면 기존 주문을 취소하신 후 다시 주문해주셔야 합니다. 주문 취소는 출고 전에만 가능하니 참고해 주세요.
                            </div>
                        </li>
                        <li class="faq-item" data-category="delivery">
                            <div class="faq-question">
                                <div class="faq-question-text">배송 조회는 어떻게 하나요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                            </div>
                            <div class="faq-answer">
                                배송 조회는 <a href="../orderDelivery/orderDelivery.jsp">주문/배송 조회</a> 메뉴에서 가능합니다. 로그인 후 주문 내역에서 배송 현황을 확인하실 수 있습니다. 배송이 시작되면 문자 메시지로도 운송장 번호를 안내해 드립니다.
                            </div>
                        </li>
                        <li class="faq-item" data-category="product">
                            <div class="faq-question">
                                <div class="faq-question-text">글러브 오일은 어떤 것을 사용해야 하나요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                            </div>
                            <div class="faq-answer">
                                글러브 오일은 천연 오일(밍크 오일, 니츠풋 오일)을 권장합니다. 사용 방법은 깨끗한 천에 오일을 적셔 글러브 전체에 얇게 발라주는 것이 좋습니다. 특히 포켓과 힌지 부분을 중점적으로 관리해주세요. 오일 사용 후에는 글러브를 24시간 정도 충분히 건조시켜야 합니다.
                            </div>
                        </li>
                        <li class="faq-item" data-category="order">
                            <div class="faq-question">
                                <div class="faq-question-text">무료배송 조건은 어떻게 되나요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                </div>
                            <div class="faq-answer">
                                5만원 이상 구매 시 무료배송이 적용됩니다. 5만원 미만 구매 시 배송비 3,000원이 추가됩니다. 
                                단, 제주도 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.
            </div>
                        </li>
                        <li class="faq-item" data-category="member">
                            <div class="faq-question">
                                <div class="faq-question-text">비밀번호를 잊어버렸어요. 어떻게 해야 하나요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                    </div>
                            <div class="faq-answer">
                                로그인 페이지에서 "비밀번호 찾기"를 클릭하신 후, 가입 시 등록한 이메일 주소를 입력해주세요. 
                                해당 이메일로 임시 비밀번호를 발송해드립니다. 임시 비밀번호로 로그인 후 새로운 비밀번호로 변경해주세요.
                            </div>
                        </li>
                        <li class="faq-item" data-category="product">
                            <div class="faq-question">
                                <div class="faq-question-text">야구 신발 사이즈는 어떻게 선택하나요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                            </div>
                            <div class="faq-answer">
                                야구 신발은 일반 운동화보다 0.5~1사이즈 작게 선택하는 것을 권장합니다. 
                                야구장의 흙과 잔디 환경에서 미끄러지지 않도록 하기 때문입니다. 
                                브랜드별로 사이즈가 다를 수 있으니 상품 페이지의 사이즈 가이드를 참고해주세요.
                            </div>
                        </li>
                        <li class="faq-item" data-category="return">
                            <div class="faq-question">
                                <div class="faq-question-text">교환/반품 시 배송비는 누가 부담하나요?</div>
                                <i class="fas fa-chevron-down faq-icon"></i>
                            </div>
                            <div class="faq-answer">
                                제품 하자나 오배송의 경우: HittoStore가 왕복 배송비를 부담합니다.
                                <br>
                                단순변심의 경우: 고객님이 왕복 배송비(6,000원)를 부담합니다.
                                <br><br>
                                단, 무료배송 상품의 경우 단순변심 반품 시에도 왕복 배송비가 발생합니다.
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
            
            <!-- 고객센터 정보 -->
            <div class="cs-info-section">
                <div class="cs-info">
                    <div class="cs-info-item">
                        <h3 class="cs-info-title">
                            <i class="fas fa-headset"></i> 고객센터 운영시간
                        </h3>
                        <div class="cs-info-content">
                            <strong>010-6410-0391</strong>
                            <p>평일: 오후 01:00 - 05:00</p>
                            <p>점심시간: 오후 12:00 - 13:00</p>
                            <p>주말 및 공휴일: 휴무</p>
                        </div>
                    </div>
                    
                    <div class="cs-info-item">
                        <h3 class="cs-info-title">
                            <i class="fas fa-truck"></i> 배송 안내
                        </h3>
                        <div class="cs-info-content">
                            <p>5만원 이상 구매 시 무료배송</p>
                            <p>CJ대한통운을 통해 배송됩니다.</p>
                            <p>오후 3시 이전 결제 완료 시 당일 출고됩니다.</p>
                            <p>배송은 영업일 기준 1-3일 소요됩니다.</p>
                        </div>
                    </div>
                    
                    <div class="cs-info-item">
                        <h3 class="cs-info-title">
                            <i class="fas fa-exchange-alt"></i> 교환/반품 안내
                        </h3>
                        <div class="cs-info-content">
                            <p>상품 수령 후 7일 이내 신청 가능합니다.</p>
                            <p>제품 하자/오배송: 무료 반품</p>
                            <p>단순변심: 왕복 배송비 고객 부담</p>
                            <p>교환/반품 시 고객센터로 먼저 연락주세요.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 로그인 모달 -->
    <%-- 모달을 삽입할 컨테이너 --%>
<div id="modal-container"></div>

<%-- 세션 정보를 JS 전역 변수로 노출 (공통 스크립트에서 사용) --%>
<script>
  window.sessionUserName = "<%= userName != null ? userName : "" %>";
  window.sessionUserId   = "<%= userId   != null ? userId   : "" %>";
  window.sessionTeam     = "<%= team     != null ? team     : "" %>";
</script>
<%-- 스크립트 로드 순서: 공통함수(common.js)에 open/closeModal, main.js에 openLoginModal 구현 --%>

<script src="js/wishlist-functions.js"></script>
<script src="../js/cart-functions.js"></script>
<script src="../js/common.js"></script>
<script src="../js/main.js"></script>
<script src="customerService.js"></script>
</body>
</html> 