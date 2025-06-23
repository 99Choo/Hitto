package model;

import java.sql.Timestamp;

public class BoardDTO {
    private int id;                 // 게시글 번호
    private String category;       // 게시판 카테고리 (ex. 자유, 공지)
    private String title;          // 제목
    private String content;        // 내용
    private String author;         // 작성자 아이디 (userId)
    private String writerName;     // 작성자 이름 (userName)
    private Timestamp regDate;     // 작성일시
    private int views;             // 조회수

    // 기본 생성자
    public BoardDTO() {}

    // 전체 필드를 받는 생성자
    public BoardDTO(int id, String category, String title, String content, String author, String writerName, Timestamp regDate, int views) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.content = content;
        this.author = author;
        this.writerName = writerName;
        this.regDate = regDate;
        this.views = views;
    }

    // Getter & Setter

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getWriterName() {
        return writerName;
    }

    public void setWriterName(String writerName) {
        this.writerName = writerName;
    }

    public Timestamp getRegDate() {
        return regDate;
    }

    public void setRegDate(Timestamp regDate) {
        this.regDate = regDate;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }
}
