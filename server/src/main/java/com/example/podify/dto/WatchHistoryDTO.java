package com.example.podify.dto;

import com.example.podify.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.AliasFor;

import java.util.UUID;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class WatchHistoryDTO {
    private UUID id;
    private String podcastId;
    private UserDTO user;
    private long watchedAt;
}
