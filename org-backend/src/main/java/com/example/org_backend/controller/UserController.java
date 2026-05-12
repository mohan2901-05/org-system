package com.example.org_backend.controller;

import com.example.org_backend.entity.UserInfo;
import com.example.org_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * POST /user/sync
     * Called once after Google login to register/update the user in our DB.
     * Idempotent — safe to call on every login.
     */
    @PostMapping("/sync")
    public ResponseEntity<UserInfo> syncUser(@AuthenticationPrincipal Jwt jwt) {
        UserInfo user = userService.syncUser(jwt);
        return ResponseEntity.ok(user);
    }

    /**
     * GET /user/me
     * Returns the current user's profile (for the frontend).
     */
    @GetMapping("/me")
    public ResponseEntity<UserInfo> me(@AuthenticationPrincipal Jwt jwt) {
        UserInfo user = userService.syncUser(jwt);
        return ResponseEntity.ok(user);
    }
}
