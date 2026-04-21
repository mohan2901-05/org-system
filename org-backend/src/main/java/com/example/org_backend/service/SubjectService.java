package com.example.org_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.org_backend.entity.SubjectInfo;
import com.example.org_backend.repository.SubjectRepository;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public List<SubjectInfo> getSubjectsByClassId(String classId) {
        return subjectRepository.findByFkClassIdAndStatus(classId, "A");
    }
}