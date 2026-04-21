package com.example.org_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.org_backend.entity.ClassInfo;
import com.example.org_backend.service.ClassService;

@RestController
@CrossOrigin(origins = "*")
public class ClassController {

    @Autowired
    private ClassService classService;

    @GetMapping("/class")
    public List<ClassInfo> getClasses(@RequestParam String orgId) {
        return classService.getClassesByOrgId(orgId);
    }
}