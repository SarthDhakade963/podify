package com.example.podify.dto.AuthDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class AuthResponseDTO {
    public UUID id;
    public String email;
    public String accessToken;
    public String error;
}
