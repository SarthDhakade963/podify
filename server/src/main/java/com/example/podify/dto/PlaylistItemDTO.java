package com.example.podify.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class PlaylistItemDTO {
    private UUID id;
    private String podcastId;
    private PlaylistDTO playlistDTO;
}
