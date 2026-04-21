package com.example.org_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.org_backend.entity.ClassInfo;

public interface ClassRepository extends JpaRepository<ClassInfo, String> {

    List<ClassInfo> findByFkOrgIdAndStatus(String fkOrgId, String status);
}