document.addEventListener('DOMContentLoaded', function () {
  const categoryBtns = document.querySelectorAll('.category-btn');
  const searchForm = document.querySelector('.search-form form');
  const POSTS_PER_PAGE = 10;
  let currentPage = 1;
  let currentCategory = 'free'; // 기본 카테고리

  // 👉 카테고리 버튼 클릭 이벤트
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentCategory = btn.dataset.category || 'free';
      currentPage = 1;
      updateBoardList(currentCategory, currentPage);
    });
  });

  // 🔍 검색 이벤트
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const type = searchForm.querySelector('select[name="search-type"]').value;
      const keyword = searchForm.querySelector('input[name="keyword"]').value.trim();

      if (keyword.length === 0) {
        alert("검색어를 입력해주세요.");
        return;
      }

      fetch(`/HittoWeb/api/searchBoard.jsp?type=${type}&keyword=${encodeURIComponent(keyword)}`)
        .then(res => res.json())
        .then(data => renderBoardTable(data))
        .catch(err => console.error("검색 실패", err));
    });
  }

  // 📄 게시글 목록 가져오기
  function updateBoardList(category, page) {
    fetch(`/HittoWeb/api/getBoardList.jsp?category=${category}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        renderBoardTable(data);
        currentPage = page;
      })
      .catch(err => console.error("목록 불러오기 실패", err));
  }

  // 🧱 게시글 테이블 렌더링
  function renderBoardTable(data) {
    const tbody = document.querySelector('.board-table tbody');
    tbody.innerHTML = '';

    if ((!data.notices || data.notices.length === 0) && (!data.posts || data.posts.length === 0)) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px 0;">게시글이 없습니다.</td></tr>`;
      return;
    }

    if (data.notices) {
      data.notices.forEach(post => {
        const row = createPostRow(post, true);
        tbody.appendChild(row);
      });
    }

    if (data.posts) {
      data.posts.forEach(post => {
        const row = createPostRow(post, false);
        tbody.appendChild(row);
      });
    }
  }

  // 🧱 게시글 행 생성
  function createPostRow(post, isNotice) {
    const tr = document.createElement('tr');
    if (isNotice) tr.classList.add('notice');

    const formattedDate = new Date(post.regDate).toLocaleDateString();

    tr.innerHTML = `
      <td>${post.id}</td>
      <td><a href="/HittoWeb/community/view.jsp?id=${post.id}">${post.title}</a></td>
      <td>${post.writerName}</td>
      <td>${post.category}</td>
      <td>${formattedDate}</td>
      <td>${post.views}</td>
    `;
    return tr;
  }

  // 첫 로딩 시 게시글 목록 출력
  updateBoardList(currentCategory, currentPage);
});
