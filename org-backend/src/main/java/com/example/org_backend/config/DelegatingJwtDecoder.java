package com.example.org_backend.config;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * Delegates JWT decoding to the right decoder based on the 'iss' claim.
 *
 * - "eduflow-local"                  → HS256 local decoder
 * - "https://accounts.google.com"    → Google JWKS decoder (default)
 *
 * No external call is made for local tokens — they are verified instantly
 * with the shared HS256 secret.
 */
public class DelegatingJwtDecoder implements JwtDecoder {

    private final JwtDecoder googleDecoder;
    private final JwtDecoder localDecoder;

    public DelegatingJwtDecoder(JwtDecoder googleDecoder, SecretKey localKey) {
        this.googleDecoder = googleDecoder;
        this.localDecoder  = NimbusJwtDecoder.withSecretKey(localKey).build();
    }

    @Override
    public Jwt decode(String token) throws JwtException {
        if (isLocalToken(token)) {
            return localDecoder.decode(token);
        }
        return googleDecoder.decode(token);
    }

    /** Peek at the JWT body (without verification) to check the issuer. */
    private boolean isLocalToken(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) return false;
            String body = new String(
                    Base64.getUrlDecoder().decode(parts[1]),
                    StandardCharsets.UTF_8
            );
            return body.contains("eduflow-local");
        } catch (Exception e) {
            return false;
        }
    }
}
