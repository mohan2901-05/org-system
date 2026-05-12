package com.example.org_backend.controller;

import com.example.org_backend.entity.ExamResult;
import com.example.org_backend.service.ExamResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/exam")
public class ExamResultController {

    private final ExamResultService resultService;

    public ExamResultController(ExamResultService resultService) {
        this.resultService = resultService;
    }

    /**
     * POST /exam/result
     * Saves one exam attempt for the authenticated user.
     * Body: { fkOrgId, fkClassId, fkSubjectId, fkChapterId,
     *         orgName, className, subjectName, chapterName,
     *         totalQuestions, score, percentage, resultDetails }
     */
    @PostMapping("/result")
    public ResponseEntity<ExamResult> saveResult(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody Map<String, Object> body) {

        String userId = jwt.getSubject();
        ExamResult saved = resultService.saveResult(userId, body);
        return ResponseEntity.ok(saved);
    }

    /**
     * GET /exam/results
     * Returns all past exam results for the authenticated user, newest first.
     */
    @GetMapping("/results")
    public ResponseEntity<List<ExamResult>> getMyResults(
            @AuthenticationPrincipal Jwt jwt) {

        List<ExamResult> results = resultService.getResultsByUser(jwt.getSubject());
        return ResponseEntity.ok(results);
    }

    /**
     * GET /exam/results/{id}
     * Returns a specific result with full question-by-question breakdown.
     */
    @GetMapping("/results/{id}")
    public ResponseEntity<ExamResult> getResultDetail(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String id) {

        ExamResult result = resultService.getResultById(id);
        if (result == null || !result.getFkUserId().equals(jwt.getSubject())) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }
}
