package com.example.org_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.org_backend.entity.ChapterQA;

import java.util.List;

public interface ChapterQARepository extends JpaRepository<ChapterQA, String> {

    List<ChapterQA> findByOrgIdAndStatus(String orgId, String status);
}