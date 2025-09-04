package com.example.podify.dto;

import com.example.podify.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class PlaylistDTO {
    private UUID id;
    private String podcastId; // refer Mongo podcast
    private UserDTO user;
}
