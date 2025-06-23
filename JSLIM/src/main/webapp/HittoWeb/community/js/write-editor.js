// Quill 에디터 툴바 옵션 (네이버 블로그 스타일과 유사하게)
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['link', 'image', 'video'],
  ['clean']
];

const quill = new Quill('#editor', {
  modules: { toolbar: toolbarOptions },
  theme: 'snow'
});

// 폼 제출 시 에디터 내용 textarea에 복사 + 내용 비었는지 체크
// 등록하기 동작은 건드리지 않음

document.querySelector('form').addEventListener('submit', function(e) {
  const html = quill.root.innerHTML.trim();
  // Quill 내용이 비었으면 제출 막고 alert
  if (html === '<p><br></p>' || html === '') {
    alert('내용을 입력해주세요!');
    e.preventDefault();
    return false;
  }
  document.getElementById('content').value = html;
}); 