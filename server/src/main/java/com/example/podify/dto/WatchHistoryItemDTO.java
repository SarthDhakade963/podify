package com.example.podify.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class WatchHistoryItemDTO {
    private UUID id;
    private String podcastId;
    private WatchHistoryDTO watchHistoryDTO;
    private long watchedAt;
    private boolean completed;
    private float progress;
}
