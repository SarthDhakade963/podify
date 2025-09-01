package com.example.podify.model;

import com.example.podify.model.superclass.Auditable;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends Auditable {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password; // nullable if oAuth only

    private String role = "USER";
}
