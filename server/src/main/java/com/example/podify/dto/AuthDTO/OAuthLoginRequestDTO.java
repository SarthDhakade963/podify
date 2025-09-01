package com.example.podify.dto.AuthDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OAuthLoginRequestDTO {
    @Email
    private String email;

    @NotBlank
    private String provider;

    @NotBlank
    private String providerId;
}
