package com.example.org_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.org_backend.entity.OrgInfo;
import com.example.org_backend.repository.OrgRepository;

import java.util.List;

@Service
public class OrgService {

    @Autowired
    private OrgRepository repo;

    // ✅ THIS METHOD MUST EXIST
    public List<OrgInfo> getActiveOrgs(){
        return repo.findByOrgStatus("A");
    }
}