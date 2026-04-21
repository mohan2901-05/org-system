package com.example.org_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "chapter_info")
public class ChapterInfo {

    @Id
    private String pkChapterId;
    private String chapterName;
    private String fkSubjectId;
    private String status;

    public String getPkChapterId() {
        return pkChapterId;
    }

    public void setPkChapterId(String pkChapterId) {
        this.pkChapterId = pkChapterId;
    }

    public String getChapterName() {
        return chapterName;
    }

    public void setChapterName(String chapterName) {
        this.chapterName = chapterName;
    }

    public String getFkSubjectId() {
        return fkSubjectId;
    }

    public void setFkSubjectId(String fkSubjectId) {
        this.fkSubjectId = fkSubjectId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}