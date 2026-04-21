package com.example.org_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.org_backend.dto.QuestionDTO;
import com.example.org_backend.service.QaService;

@RestController
@CrossOrigin(origins = "*")
public class QaController {

    @Autowired
    private QaService service;

    @GetMapping("/qa-by-chapter")
    public List<QuestionDTO> getQuestions(@RequestParam String chapterId) {
        return service.getQuestionsByChapter(chapterId);
    }
}