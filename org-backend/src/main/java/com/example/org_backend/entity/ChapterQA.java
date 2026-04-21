package com.example.org_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "chapter_qa")
public class ChapterQA {

    @Id
    @Column(name = "pk_id")
    private String pkId;

    @Column(name = "chapter_name")
    private String chapterName;

    @Column(name = "question")
    private String question;

    @Column(name = "answer")
    private String answer;

    @Column(name = "status")
    private String status;

    @Column(name = "org_id")   // ✅ VERY IMPORTANT
    private String orgId;

    // Getters & Setters

    public String getPkId() { return pkId; }
    public void setPkId(String pkId) { this.pkId = pkId; }

    public String getChapterName() { return chapterName; }
    public void setChapterName(String chapterName) { this.chapterName = chapterName; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getOrgId() { return orgId; }
    public void setOrgId(String orgId) { this.orgId = orgId; }
}