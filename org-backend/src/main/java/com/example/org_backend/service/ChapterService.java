package com.example.org_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.org_backend.entity.ChapterInfo;
import com.example.org_backend.repository.ChapterRepository;

@Service
public class ChapterService {

    @Autowired
    private ChapterRepository chapterRepository;

    public List<ChapterInfo> getChapters(String subjectId) {
        return chapterRepository.findByFkSubjectIdAndStatus(subjectId, "A");
    }
}