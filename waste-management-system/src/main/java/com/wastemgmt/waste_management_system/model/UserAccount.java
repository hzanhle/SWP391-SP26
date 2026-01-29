package com.wastemgmt.waste_management_system.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "USER_ACCOUNT")
@Data
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String fullName;
    private String email;

    @Column(name = "passwordHash") // Khớp với SQL của bạn
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // Đảm bảo Enum Role có: CITIZEN, COLLECTOR, OPERATOR, ADMIN

    private boolean isActive = true;
    private LocalDateTime createdAt = LocalDateTime.now();
}

