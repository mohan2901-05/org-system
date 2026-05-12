package com.example.org_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "exam_result")
public class ExamResult {

    @Id
    @Column(name = "pk_result_id")
    private String pkResultId;

    @Column(name = "fk_user_id")
    private String fkUserId;

    @Column(name = "fk_org_id")
    private String fkOrgId;

    @Column(name = "fk_class_id")
    private String fkClassId;

    @Column(name = "fk_subject_id")
    private String fkSubjectId;

    @Column(name = "fk_chapter_id")
    private String fkChapterId;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "class_name")
    private String className;

    @Column(name = "subject_name")
    private String subjectName;

    @Column(name = "chapter_name")
    private String chapterName;

    @Column(name = "total_questions")
    private int totalQuestions;

    @Column(name = "score")
    private int score;

    @Column(name = "percentage")
    private double percentage;

    /** JSON string — full per-question breakdown */
    @Column(name = "result_details", columnDefinition = "LONGTEXT")
    private String resultDetails;

    @Column(name = "taken_at")
    private LocalDateTime takenAt;

    // ── Getters & Setters ──────────────────────────────────────
    public String getPkResultId()               { return pkResultId; }
    public void   setPkResultId(String v)       { this.pkResultId = v; }

    public String getFkUserId()                 { return fkUserId; }
    public void   setFkUserId(String v)         { this.fkUserId = v; }

    public String getFkOrgId()                  { return fkOrgId; }
    public void   setFkOrgId(String v)          { this.fkOrgId = v; }

    public String getFkClassId()                { return fkClassId; }
    public void   setFkClassId(String v)        { this.fkClassId = v; }

    public String getFkSubjectId()              { return fkSubjectId; }
    public void   setFkSubjectId(String v)      { this.fkSubjectId = v; }

    public String getFkChapterId()              { return fkChapterId; }
    public void   setFkChapterId(String v)      { this.fkChapterId = v; }

    public String getOrgName()                  { return orgName; }
    public void   setOrgName(String v)          { this.orgName = v; }

    public String getClassName()                { return className; }
    public void   setClassName(String v)        { this.className = v; }

    public String getSubjectName()              { return subjectName; }
    public void   setSubjectName(String v)      { this.subjectName = v; }

    public String getChapterName()              { return chapterName; }
    public void   setChapterName(String v)      { this.chapterName = v; }

    public int    getTotalQuestions()           { return totalQuestions; }
    public void   setTotalQuestions(int v)      { this.totalQuestions = v; }

    public int    getScore()                    { return score; }
    public void   setScore(int v)               { this.score = v; }

    public double getPercentage()               { return percentage; }
    public void   setPercentage(double v)       { this.percentage = v; }

    public String getResultDetails()            { return resultDetails; }
    public void   setResultDetails(String v)    { this.resultDetails = v; }

    public LocalDateTime getTakenAt()           { return takenAt; }
    public void          setTakenAt(LocalDateTime v) { this.takenAt = v; }
}
