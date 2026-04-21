package com.example.org_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.org_backend.entity.ChapterQA;
import com.example.org_backend.repository.ChapterQARepository;

import java.util.List;

@Service
public class ChapterQAService {

    @Autowired
    private ChapterQARepository repo;

    public void save(ChapterQA qa){
        repo.save(qa);
    }

    public List<ChapterQA> getByOrg(String orgId){
        return repo.findByOrgIdAndStatus(orgId, "A");
    }

    public void delete(String id){
        repo.deleteById(id);
    }

    public void update(ChapterQA qa){
        repo.save(qa);
    }
}