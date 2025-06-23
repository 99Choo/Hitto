// ✅ 모달 열기 함수
function openLoginModal() {
  console.log("🟢 openLoginModal() 실행됨");

  fetch('/JSLIM/HittoWeb/components/login-modal.jsp')
    .then(res => {
      console.log("📥 login-modal.jsp 응답 상태:", res.status);
      return res.text();
    })
    .then(html => {
      console.log("📦 받아온 HTML:", html);

      const modalContainer = document.getElementById('login-modal-container');
      if (!modalContainer) {
        console.error("❌ #login-modal-container 요소 없음!");
        return;
      }

      modalContainer.innerHTML = html;

      const overlay = modalContainer.querySelector('.login-modal-overlay');
      if (overlay) {
        overlay.classList.add('show'); // ✅ 보이게 하기
        console.log("🎉 .login-modal-overlay 에 .show 클래스 추가됨!");
      } else {
        console.warn("❌ .login-modal-overlay 요소 없음");
      }

      console.log("✅ 모달 HTML 삽입 완료");
      initLoginModalEvents(); // 모달 내부 이벤트 바인딩
    })
    .catch(err => {
      console.error("❌ fetch 에러 발생:", err);
    });
}

// ✅ 모달 내부 이벤트 바인딩
function initLoginModalEvents() {
  console.log("🛠️ initLoginModalEvents() 실행됨");

  const loginForm = document.getElementById('loginForm');
  const errorMsg = document.getElementById('login-error-message');

  if (!loginForm) {
    console.warn("⚠️ loginForm 요소 없음");
    return;
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("📨 로그인 폼 제출됨");

    const userId = document.getElementById('user-id').value.trim();
    const password = document.getElementById('user-password').value.trim();

    if (!userId || !password) {
      errorMsg.textContent = "아이디와 비밀번호를 모두 입력해주세요.";
      errorMsg.style.display = 'block';
      return;
    }

    fetch('/JSLIM/HittoWeb/loginProc.jsp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `userId=${encodeURIComponent(userId)}&password=${encodeURIComponent(password)}`
    })
      .then(res => res.text())
      .then(result => {
        console.log("🔍 로그인 결과:", result);

        if (result.trim() === "success") {
          alert("로그인되었습니다.");
          window.location.href = "/JSLIM/HittoWeb/index.jsp";
        } else if (result.trim() === "wrong-password") {
          alert("비밀번호가 틀렸습니다.");
        } else if (result.trim() === "not-found") {
          alert("존재하지 않는 아이디입니다.");
        } else if (result.trim() === "empty") {
          alert("아이디 또는 비밀번호를 입력해주세요.");
        } else {
          alert("로그인 중 오류가 발생했습니다.");
        }
      })
      .catch(err => {
        console.error("❌ 로그인 요청 에러:", err);
      });
  });

  // 닫기 버튼
  const closeBtn = document.getElementById('close-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const overlay = document.querySelector('.login-modal-overlay');
      if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
          const modalContainer = document.getElementById('login-modal-container');
          if (modalContainer) {
            modalContainer.innerHTML = "";
          }
        }, 300); // CSS transition 시간 후 제거
        console.log("🔒 모달 닫힘");
      }
    });
  } else {
    console.warn("⚠️ 닫기 버튼 없음");
  }
}
