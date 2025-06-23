package model;

import java.sql.Timestamp;

public class CommentDTO {
    private int id;
    private int boardId;
    private String writer;       // 작성자 ID
    private String writerName;   // 작성자 이름
    private String content;      // 댓글 내용
    private Timestamp createdAt; // 작성 시각
    private Integer parentId; // 대댓글용 부모 댓글 id, null이면 일반 댓글

    // 기본 생성자
    public CommentDTO() {}

    // 전체 생성자 (필요 시 사용)
    public CommentDTO(int id, int boardId, String writer, String writerName, String content, Timestamp createdAt, Integer parentId) {
        this.id = id;
        this.boardId = boardId;
        this.writer = writer;
        this.writerName = writerName;
        this.content = content;
        this.createdAt = createdAt;
        this.parentId = parentId;
    }

    // Getter/Setter
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBoardId() {
        return boardId;
    }

    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getWriterName() {
        return writerName;
    }

    public void setWriterName(String writerName) {
        this.writerName = writerName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }
}
