package com.example.org_backend.repository;

import com.example.org_backend.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserInfo, String> {
    Optional<UserInfo> findByUserEmail(String userEmail);
}
