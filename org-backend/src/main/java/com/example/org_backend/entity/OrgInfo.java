package com.example.org_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "org_info")
public class OrgInfo {

    @Id
    @Column(name = "pk_org_id")
    private String pkOrgId;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "org_email")
    private String orgEmail;

    @Column(name = "org_password")
    private String orgPassword;

    @Column(name = "org_updated_by")
    private String orgUpdatedBy;

    @Column(name = "org_updated_on")
    private String orgUpdatedOn;

    @Column(name = "org_status")
    private String orgStatus;

    // Getters & Setters

    public String getPkOrgId() { return pkOrgId; }
    public void setPkOrgId(String pkOrgId) { this.pkOrgId = pkOrgId; }

    public String getOrgName() { return orgName; }
    public void setOrgName(String orgName) { this.orgName = orgName; }

    public String getOrgEmail() { return orgEmail; }
    public void setOrgEmail(String orgEmail) { this.orgEmail = orgEmail; }

    public String getOrgPassword() { return orgPassword; }
    public void setOrgPassword(String orgPassword) { this.orgPassword = orgPassword; }

    public String getOrgUpdatedBy() { return orgUpdatedBy; }
    public void setOrgUpdatedBy(String orgUpdatedBy) { this.orgUpdatedBy = orgUpdatedBy; }

    public String getOrgUpdatedOn() { return orgUpdatedOn; }
    public void setOrgUpdatedOn(String orgUpdatedOn) { this.orgUpdatedOn = orgUpdatedOn; }

    public String getOrgStatus() { return orgStatus; }
    public void setOrgStatus(String orgStatus) { this.orgStatus = orgStatus; }
}