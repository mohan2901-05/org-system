package com.example.org_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.org_backend.entity.OrgInfo;
import com.example.org_backend.service.OrgService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/org")
public class OrgController {

    @Autowired
    private OrgService service;

    @GetMapping
    public List<OrgInfo> getAllOrgs(){
        return service.getActiveOrgs();
    }
}