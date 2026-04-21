package com.example.org_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import com.example.org_backend.entity.ChapterQA;
import com.example.org_backend.service.ChapterQAService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/qa")
public class ChapterQAController {

    @Autowired
    private ChapterQAService service;

    @PostMapping
    public Map<String, String> save(@RequestBody ChapterQA qa){
        service.save(qa);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Saved");
        return res;
    }

    // ✅ UPDATED
    @GetMapping
    public List<ChapterQA> getAll(@RequestParam String orgId){
        return service.getByOrg(orgId);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable String id){
        service.delete(id);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Deleted");
        return res;
    }

    @PutMapping
    public Map<String, String> update(@RequestBody ChapterQA qa){
        service.update(qa);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Updated");
        return res;
    }
}