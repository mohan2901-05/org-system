package com.example.org_backend.repository;

import com.example.org_backend.entity.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExamResultRepository extends JpaRepository<ExamResult, String> {
    /** All results for one user, newest first */
    List<ExamResult> findByFkUserIdOrderByTakenAtDesc(String fkUserId);
}
