package com.example.podify.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtUtil {
    @Value("${next.auth.secret}")
    private String SECRET;


    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(UUID id, String email) {
        long EXPIRATION = 1000L * 60 * 60 * 24 * 7;

        return Jwts.builder() // This builder lets you set the payload (data), headers, and signature.
                .setSubject(String.valueOf(id)) // subject to uniquely identify the user i.e. id
                .claim("email", email) // adds a custom claims into the JWT payload
                .setIssuedAt(new Date()) // token created
                .setExpiration(new Date(System.currentTimeMillis()+ EXPIRATION)) // token expired
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // signs the jwt with a secret key using HMAC SHA-256
                .compact();
    }

    public Claims validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getEmailFromToken(String token) {
        Claims claims = validateToken(token);
        return claims.get("email", String.class);
    }



}
