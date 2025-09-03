package com.example.podify.services;

import com.example.podify.dto.AuthDTO.LoginRequestDTO;
import com.example.podify.dto.AuthDTO.OAuthLoginRequestDTO;
import com.example.podify.dto.UserDTO;

import java.util.Optional;

public interface AuthService {
    void save(UserDTO user);

    Optional<UserDTO> findByEmail(String email);

    Optional<UserDTO> createOAuthUser(OAuthLoginRequestDTO oAuthUser);

    Optional<UserDTO> validateCredentials(LoginRequestDTO credUser);
}
