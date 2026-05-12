package com.example.org_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_info")
public class UserInfo {

    @Id
    @Column(name = "pk_user_id")
    private String pkUserId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_picture")
    private String userPicture;

    /** BCrypt hash — null for Google-only users */
    @Column(name = "password_hash")
    private String passwordHash;

    /** "google" | "local" */
    @Column(name = "auth_provider")
    private String authProvider;

    @Column(name = "user_created_at")
    private LocalDateTime userCreatedAt;

    @Column(name = "user_last_login")
    private LocalDateTime userLastLogin;

    // ── Getters & Setters ──────────────────────────────────────
    public String getPkUserId()                            { return pkUserId; }
    public void   setPkUserId(String v)                    { this.pkUserId = v; }

    public String getUserName()                            { return userName; }
    public void   setUserName(String v)                    { this.userName = v; }

    public String getUserEmail()                           { return userEmail; }
    public void   setUserEmail(String v)                   { this.userEmail = v; }

    public String getUserPicture()                         { return userPicture; }
    public void   setUserPicture(String v)                 { this.userPicture = v; }

    public String getPasswordHash()                        { return passwordHash; }
    public void   setPasswordHash(String v)                { this.passwordHash = v; }

    public String getAuthProvider()                        { return authProvider; }
    public void   setAuthProvider(String v)                { this.authProvider = v; }

    public LocalDateTime getUserCreatedAt()                { return userCreatedAt; }
    public void          setUserCreatedAt(LocalDateTime v) { this.userCreatedAt = v; }

    public LocalDateTime getUserLastLogin()                { return userLastLogin; }
    public void          setUserLastLogin(LocalDateTime v) { this.userLastLogin = v; }
}
