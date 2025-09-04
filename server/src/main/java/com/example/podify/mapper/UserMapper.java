package com.example.podify.mapper;

import com.example.podify.dto.AuthDTO.AuthResponseDTO;
import com.example.podify.dto.AuthDTO.OAuthLoginRequestDTO;
import com.example.podify.dto.UserDTO;
import com.example.podify.model.User;
import jakarta.persistence.Column;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public static AuthResponseDTO toAuthResponse(UserDTO user, String token) {
        return new AuthResponseDTO(
                user.getId(),
                user.getEmail(),
                token,
                null
        );
    }

    public static UserDTO toDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public static User toEntity(UserDTO userDTO) {
        return User.builder()
                .id(userDTO.getId())
                .email(userDTO.getEmail())
                .role(userDTO.getRole())
                .build();
    }
}
