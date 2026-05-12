package com.example.org_backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@Service
public class LocalJwtService {

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiry-hours}")
    private int expiryHours;

    private SecretKey key() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Generate a signed HS256 JWT for email/password users.
     * Claims mirror Google id_token structure so the rest of the
     * app (UserController, ExamResultController) works identically.
     */
    public String generateToken(String userId, String email, String name, String picture) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .subject(userId)                              // stable user ID
                .issuer("eduflow-local")                      // identifies our token type
                .issuedAt(new Date(now))
                .expiration(new Date(now + (long) expiryHours * 3_600_000))
                .claims(Map.of(
                        "email",   email   != null ? email   : "",
                        "name",    name    != null ? name    : "",
                        "picture", picture != null ? picture : ""
                ))
                .signWith(key())
                .compact();
    }

    /** Quick check — is this one of our local tokens? */
    public boolean isLocalToken(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) return false;
            String body = new String(
                java.util.Base64.getUrlDecoder().decode(parts[1]),
                StandardCharsets.UTF_8
            );
            return body.contains("eduflow-local");
        } catch (Exception e) {
            return false;
        }
    }
}
