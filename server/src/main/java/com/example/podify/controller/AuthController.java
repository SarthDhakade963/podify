package com.example.podify.controller;

import com.example.podify.dto.AuthDTO.AuthResponseDTO;
import com.example.podify.dto.AuthDTO.LoginRequestDTO;
import com.example.podify.dto.AuthDTO.OAuthLoginRequestDTO;
import com.example.podify.dto.UserDTO;
import com.example.podify.mapper.UserMapper;
import com.example.podify.security.JwtUtil;
import com.example.podify.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Value("${base.url}")
    private String baseUrl;

    private final AuthService authService;

    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginReq) {

        System.out.println("Login Request : " + loginReq);

        return authService.validateCredentials(loginReq).map(userDTO -> {
            String token = jwtUtil.generateToken(userDTO.getId(), userDTO.getEmail());

            ResponseCookie jwtCookie = ResponseCookie.from("accessToken", token)
                    .httpOnly(true)
                    .secure(true)
                    .sameSite("Strict")
                    .maxAge(3600)
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .body(UserMapper.toAuthResponse(userDTO, token));
        }).orElse(
                ResponseEntity.status(401).body(new AuthResponseDTO(null, null, null, "Invalid Credentials"))
        );
    }

    @PostMapping("/oauth-login")
    public ResponseEntity<AuthResponseDTO> oAuthLogin(@Valid @RequestBody OAuthLoginRequestDTO oAuthLoginReq) {
        UserDTO user = authService.findByEmail(oAuthLoginReq.getEmail())
                .orElseGet(() ->
                        authService.createOAuthUser(oAuthLoginReq)
                                .map(ResponseEntity::ok)
                                .orElse(ResponseEntity.notFound().build()).getBody());

        if(user == null)
            return ResponseEntity.status(500).body(new AuthResponseDTO(null, null, null, "Unable to create or retrieve oAuth user"));

        // Generate spring jwt
        String token = jwtUtil.generateToken(user.getId(), oAuthLoginReq.getEmail());

        return ResponseEntity.ok(UserMapper.toAuthResponse(user, token));
    }

}
