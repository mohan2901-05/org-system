package com.example.org_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.org_backend.entity.ClassInfo;
import com.example.org_backend.repository.ClassRepository;

@Service
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    public List<ClassInfo> getClassesByOrgId(String orgId) {
        return classRepository.findByFkOrgIdAndStatus(orgId, "A");
    }
}