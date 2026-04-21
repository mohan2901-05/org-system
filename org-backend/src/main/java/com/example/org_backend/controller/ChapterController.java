package com.example.org_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.org_backend.entity.ChapterInfo;
import com.example.org_backend.service.ChapterService;

@RestController
@CrossOrigin(origins = "*")
public class ChapterController {

    @Autowired
    private ChapterService chapterService;

    @GetMapping("/chapter")
    public List<ChapterInfo> getChapters(@RequestParam String subjectId) {
        return chapterService.getChapters(subjectId);
    }
}