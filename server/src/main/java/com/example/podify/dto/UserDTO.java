package com.example.podify.dto;

import com.example.podify.dto.AuthDTO.AuthResponseDTO;
import lombok.*;
import org.springframework.http.ResponseEntity;

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
