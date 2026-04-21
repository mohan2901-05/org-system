package com.example.org_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "class_info")
public class ClassInfo {

    @Id
    @Column(name = "pk_class_id")
    private String pkClassId;

    @Column(name = "class_name")
    private String className;

    // 🔥 IMPORTANT FIX
    @Column(name = "fk_org_id")
    private String fkOrgId;

    @Column(name = "status")
    private String status;

    // GETTERS & SETTERS

    public String getPkClassId() {
        return pkClassId;
    }

    public void setPkClassId(String pkClassId) {
        this.pkClassId = pkClassId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getFkOrgId() {
        return fkOrgId;
    }

    public void setFkOrgId(String fkOrgId) {
        this.fkOrgId = fkOrgId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}