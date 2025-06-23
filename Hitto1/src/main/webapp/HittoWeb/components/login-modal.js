document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMsg = document.getElementById('login-error-message');

  if (!loginForm) return;

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userId = document.getElementById('user-id').value.trim();
    const password = document.getElementById('user-password').value.trim();

    if (!userId || !password) {
      errorMsg.textContent = "아이디와 비밀번호를 모두 입력해주세요.";
      return;
    }

    fetch('loginProc.jsp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `userId=${encodeURIComponent(userId)}&password=${encodeURIComponent(password)}`
    })
    .then(res => res.text())
    .then(result => {
      console.log("👉 서버 응답:", result);

      if (result.trim() === "success") {
        alert("로그인되었습니다.");
        window.location.href = "index.jsp";
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
      console.error("❌ fetch 오류:", err);
    });
  });

  // ✅ 모달 닫기 버튼 동작
  const closeBtn = document.getElementById('close-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const overlay = document.querySelector('.login-modal-overlay');
      if (overlay) overlay.style.display = 'none';
    });
  }
});
