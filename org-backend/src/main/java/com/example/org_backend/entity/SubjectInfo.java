package com.example.org_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "subject_info")
public class SubjectInfo {

    @Id
    @Column(name = "pk_subject_id")
    private String pkSubjectId;

    @Column(name = "subject_name")
    private String subjectName;

    // 🔥 IMPORTANT FIX
    @Column(name = "fk_class_id")
    private String fkClassId;

    @Column(name = "status")
    private String status;

    // GETTERS & SETTERS

    public String getPkSubjectId() {
        return pkSubjectId;
    }

    public void setPkSubjectId(String pkSubjectId) {
        this.pkSubjectId = pkSubjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getFkClassId() {
        return fkClassId;
    }

    public void setFkClassId(String fkClassId) {
        this.fkClassId = fkClassId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}