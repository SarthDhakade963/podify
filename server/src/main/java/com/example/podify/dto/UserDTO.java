package com.example.podify.dto;

import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class UserDTO {
    private UUID id;
    private String email;
    private String role;
    private String accessToken;
}
