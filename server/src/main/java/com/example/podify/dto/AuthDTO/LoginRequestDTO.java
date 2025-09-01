package com.example.podify.dto.AuthDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequestDTO {
    @Email
    @NotBlank
    public String email;

    @NotBlank
    public String password;
}
