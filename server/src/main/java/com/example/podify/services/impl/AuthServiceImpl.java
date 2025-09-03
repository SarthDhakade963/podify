package com.example.podify.services.impl;

import com.example.podify.dto.AuthDTO.LoginRequestDTO;
import com.example.podify.dto.AuthDTO.OAuthLoginRequestDTO;
import com.example.podify.dto.UserDTO;
import com.example.podify.mapper.UserMapper;
import com.example.podify.model.User;
import com.example.podify.repository.UserRepository;
import com.example.podify.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void save(UserDTO userDTO) {
        User user = UserMapper.toEntity(userDTO);
        userRepository.save(user);
    }

    @Override
    public Optional<UserDTO> findByEmail(String email) {
        return userRepository.findByEmail(email).map(UserMapper::toDTO);
    }

    @Transactional
    @Override
    public Optional<UserDTO> createOAuthUser(OAuthLoginRequestDTO oAuthUser) {
        User user = User.builder()
                .email(oAuthUser.getEmail())
                .password(null) // no password for oAuth
                .build();

        User savedUser = userRepository.save(user);

        return Optional.of(UserMapper.toDTO(savedUser));
    }

    @Transactional
    @Override
    public Optional<UserDTO> validateCredentials(LoginRequestDTO credUser) {
        Optional<User> userOpt = userRepository.findByEmail(credUser.email);
        if(userOpt.isPresent()) {
            User user = userOpt.get();
            if(user.getPassword() != null && passwordEncoder.matches(credUser.password, user.getPassword())) {
                return Optional.of(UserMapper.toDTO(user));
            } else {
                return Optional.empty();
            }
        } else {
            User newUser = new User();
            newUser.setEmail(credUser.getEmail());
            newUser.setPassword(passwordEncoder.encode(credUser.getPassword()));
            userRepository.save(newUser);
            return Optional.of(UserMapper.toDTO(newUser));
        }
    }
}
