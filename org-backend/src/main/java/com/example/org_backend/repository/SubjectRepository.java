package com.example.org_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.org_backend.entity.SubjectInfo;

public interface SubjectRepository extends JpaRepository<SubjectInfo, String> {

    List<SubjectInfo> findByFkClassIdAndStatus(String fkClassId, String status);
}