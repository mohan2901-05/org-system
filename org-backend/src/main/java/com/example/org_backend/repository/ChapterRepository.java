package com.example.org_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.org_backend.entity.ChapterInfo;

public interface ChapterRepository extends JpaRepository<ChapterInfo, String> {

    List<ChapterInfo> findByFkSubjectIdAndStatus(String fkSubjectId, String status);
}