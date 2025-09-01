package com.example.podify.services;

import com.example.podify.model.User;
import com.example.podify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

@RequiredArgsConstructor
public abstract class Signable {
    protected final UserRepository userRepository;

    protected User getLoggedInUser() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User does not exists"));
    }
}
