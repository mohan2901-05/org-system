package com.example.org_backend.service;

import com.example.org_backend.entity.UserInfo;
import com.example.org_backend.repository.UserRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    /**
     * Upsert: create user on first login, update last_login on every subsequent login.
     * The Google JWT 'sub' claim is used as the stable user ID.
     */
    public UserInfo syncUser(Jwt jwt) {
        String userId = jwt.getSubject();                          // e.g. "107321..."
        String email  = jwt.getClaimAsString("email");
        String name   = jwt.getClaimAsString("name");
        String pic    = jwt.getClaimAsString("picture");

        return userRepo.findById(userId)
            .map(existing -> {
                existing.setUserName(name);
                existing.setUserPicture(pic);
                existing.setUserLastLogin(LocalDateTime.now());
                return userRepo.save(existing);
            })
            .orElseGet(() -> {
                UserInfo newUser = new UserInfo();
                newUser.setPkUserId(userId);
                newUser.setUserEmail(email != null ? email : "");
                newUser.setUserName(name != null ? name : "");
                newUser.setUserPicture(pic != null ? pic : "");
                newUser.setUserCreatedAt(LocalDateTime.now());
                newUser.setUserLastLogin(LocalDateTime.now());
                return userRepo.save(newUser);
            });
    }
}
