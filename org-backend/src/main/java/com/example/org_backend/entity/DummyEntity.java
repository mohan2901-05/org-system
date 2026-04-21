package com.example.org_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class DummyEntity {

    @Id
    private String id;
}