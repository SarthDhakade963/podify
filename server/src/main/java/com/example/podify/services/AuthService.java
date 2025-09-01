package com.example.podify.services;

import com.example.podify.dto.AuthDTO.LoginRequestDTO;
import com.example.podify.dto.AuthDTO.OAuthLoginRequestDTO;
import com.example.podify.dto.UserDTO;

import java.util.Optional;

public interface AuthService {
    public void save(UserDTO user);

    Optional<UserDTO> findByEmail(String email);

    public Optional<UserDTO> createOAuthUser(OAuthLoginRequestDTO oAuthUser);

    public Optional<UserDTO> validateCredentials(LoginRequestDTO credUser);
}
