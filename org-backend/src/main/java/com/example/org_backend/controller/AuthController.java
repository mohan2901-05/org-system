package com.example.org_backend.controller;

import com.example.org_backend.entity.UserInfo;
import com.example.org_backend.repository.UserRepository;
import com.example.org_backend.service.LocalJwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final LocalJwtService jwtService;

    public AuthController(UserRepository userRepo,
                          PasswordEncoder passwordEncoder,
                          LocalJwtService jwtService) {
        this.userRepo        = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService      = jwtService;
    }

    // ──────────────────────────────────────────────────────────
    // POST /auth/register
    // Body: { name, email, password }
    // ──────────────────────────────────────────────────────────
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String name     = body.getOrDefault("name", "").trim();
        String email    = body.getOrDefault("email", "").trim().toLowerCase();
        String password = body.getOrDefault("password", "");

        // Basic validation
        if (email.isEmpty() || password.isEmpty() || name.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name, email, and password are required."));
        }
        if (password.length() < 6) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password must be at least 6 characters."));
        }

        // Check email uniqueness
        if (userRepo.findByUserEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "An account with this email already exists."));
        }

        // Create user
        UserInfo user = new UserInfo();
        user.setPkUserId("local_" + email);   // stable ID for local accounts
        user.setUserName(name);
        user.setUserEmail(email);
        user.setUserPicture("");
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setAuthProvider("local");
        user.setUserCreatedAt(LocalDateTime.now());
        user.setUserLastLogin(LocalDateTime.now());
        userRepo.save(user);

        String token = jwtService.generateToken(user.getPkUserId(), email, name, "");
        return ResponseEntity.ok(Map.of(
                "token", token,
                "name",  name,
                "email", email
        ));
    }

    // ──────────────────────────────────────────────────────────
    // POST /auth/login
    // Body: { email, password }
    // ──────────────────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email    = body.getOrDefault("email", "").trim().toLowerCase();
        String password = body.getOrDefault("password", "");

        if (email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required."));
        }

        Optional<UserInfo> opt = userRepo.findByUserEmail(email);
        if (opt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password."));
        }

        UserInfo user = opt.get();

        // Block Google-only accounts from password login
        if (!"local".equals(user.getAuthProvider())) {
            return ResponseEntity.status(401).body(
                Map.of("error", "This email is registered with Google. Please use 'Continue with Google'.")
            );
        }

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password."));
        }

        // Update last login
        user.setUserLastLogin(LocalDateTime.now());
        userRepo.save(user);

        String token = jwtService.generateToken(
            user.getPkUserId(), user.getUserEmail(), user.getUserName(), user.getUserPicture()
        );
        return ResponseEntity.ok(Map.of(
                "token", token,
                "name",  user.getUserName(),
                "email", user.getUserEmail()
        ));
    }
}
