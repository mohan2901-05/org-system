package com.example.org_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.org_backend.entity.SubjectInfo;
import com.example.org_backend.service.SubjectService;

@RestController
@CrossOrigin(origins = "*")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @GetMapping("/subject")
    public List<SubjectInfo> getSubjects(@RequestParam String classId) {
        return subjectService.getSubjectsByClassId(classId);
    }
}