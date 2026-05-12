package com.example.org_backend.service;

import com.example.org_backend.entity.ExamResult;
import com.example.org_backend.repository.ExamResultRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ExamResultService {

    private final ExamResultRepository resultRepo;

    public ExamResultService(ExamResultRepository resultRepo) {
        this.resultRepo = resultRepo;
    }

    public ExamResult saveResult(String userId, Map<String, Object> body) {
        ExamResult r = new ExamResult();
        r.setPkResultId(UUID.randomUUID().toString());
        r.setFkUserId(userId);
        r.setFkOrgId(str(body, "fkOrgId"));
        r.setFkClassId(str(body, "fkClassId"));
        r.setFkSubjectId(str(body, "fkSubjectId"));
        r.setFkChapterId(str(body, "fkChapterId"));
        r.setOrgName(str(body, "orgName"));
        r.setClassName(str(body, "className"));
        r.setSubjectName(str(body, "subjectName"));
        r.setChapterName(str(body, "chapterName"));
        r.setTotalQuestions(intVal(body, "totalQuestions"));
        r.setScore(intVal(body, "score"));
        r.setPercentage(doubleVal(body, "percentage"));
        r.setResultDetails(str(body, "resultDetails"));
        r.setTakenAt(LocalDateTime.now());
        return resultRepo.save(r);
    }

    public List<ExamResult> getResultsByUser(String userId) {
        return resultRepo.findByFkUserIdOrderByTakenAtDesc(userId);
    }

    public ExamResult getResultById(String resultId) {
        return resultRepo.findById(resultId).orElse(null);
    }

    // ── helpers ───────────────────────────────────────────────
    private String str(Map<String, Object> m, String k) {
        Object v = m.get(k);
        return v != null ? v.toString() : "";
    }
    private int intVal(Map<String, Object> m, String k) {
        Object v = m.get(k);
        if (v == null) return 0;
        try { return Integer.parseInt(v.toString()); } catch (Exception e) { return 0; }
    }
    private double doubleVal(Map<String, Object> m, String k) {
        Object v = m.get(k);
        if (v == null) return 0.0;
        try { return Double.parseDouble(v.toString()); } catch (Exception e) { return 0.0; }
    }
}
