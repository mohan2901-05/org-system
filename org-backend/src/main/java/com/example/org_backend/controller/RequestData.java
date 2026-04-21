package com.example.org_backend.controller;

import com.example.org_backend.entity.OrgInfo;

public class RequestData {

    private OrgInfo organization;

    public OrgInfo getOrganization() {
        return organization;
    }

    public void setOrganization(OrgInfo organization) {
        this.organization = organization;
    }
}