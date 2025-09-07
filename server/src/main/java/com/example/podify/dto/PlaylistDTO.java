package com.example.podify.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class PlaylistDTO {
    private UUID id;
    private String name;
    private UserDTO user;
    private List<String> podcastIds;
}
