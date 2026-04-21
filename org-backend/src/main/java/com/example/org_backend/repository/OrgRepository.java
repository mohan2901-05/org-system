package com.example.org_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.org_backend.entity.ChapterQA;
import com.example.org_backend.entity.OrgInfo;

import java.util.List;

public interface OrgRepository extends JpaRepository<OrgInfo, String> {

    List<OrgInfo> findByOrgStatus(String orgStatus);
}