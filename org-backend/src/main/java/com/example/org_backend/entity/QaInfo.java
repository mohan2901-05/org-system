package com.example.org_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "qa_info")
public class QaInfo {

    @Id
    @Column(name = "pk_qa_id")
    private String pkQaId;

    @Column(name = "question")
    private String question;

    @Column(name = "answer")
    private String answer;

    @Column(name = "fk_chapter_id")
    private String fkChapterId;

    @Column(name = "fk_subject_id")
    private String fkSubjectId;

    @Column(name = "fk_class_id")
    private String fkClassId;

    @Column(name = "fk_org_id")
    private String fkOrgId;

    @Column(name = "status")
    private String status;

    // ✅ ADD GETTERS + SETTERS (VERY IMPORTANT)

    public String getPkQaId() { return pkQaId; }
    public void setPkQaId(String pkQaId) { this.pkQaId = pkQaId; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public String getFkChapterId() { return fkChapterId; }
    public void setFkChapterId(String fkChapterId) { this.fkChapterId = fkChapterId; }

    public String getFkSubjectId() { return fkSubjectId; }
    public void setFkSubjectId(String fkSubjectId) { this.fkSubjectId = fkSubjectId; }

    public String getFkClassId() { return fkClassId; }
    public void setFkClassId(String fkClassId) { this.fkClassId = fkClassId; }

    public String getFkOrgId() { return fkOrgId; }
    public void setFkOrgId(String fkOrgId) { this.fkOrgId = fkOrgId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}