package com.example.podify.mapper;

import com.example.podify.dto.WatchHistoryItemDTO;
import com.example.podify.model.WatchHistoryItem;
import org.springframework.stereotype.Component;

@Component
public class WatchHistoryItemMapper {
    public static WatchHistoryItem toEntity(WatchHistoryItemDTO watchHistoryItemDTO) {
        return WatchHistoryItem.builder()
                        .id(watchHistoryItemDTO.getId())
                        .watchHistory(WatchHistoryMapper.toEntity(watchHistoryItemDTO.getWatchHistoryDTO()))
                        .watchedAt(watchHistoryItemDTO.getWatchedAt())
                        .completed(watchHistoryItemDTO.isCompleted())
                        .podcastId(watchHistoryItemDTO.getPodcastId())
                        .progress(watchHistoryItemDTO.getProgress())
                        .build();
    }

    public static WatchHistoryItemDTO toDTO(WatchHistoryItem watchHistoryItem) {
        return WatchHistoryItemDTO.builder()
                .id(watchHistoryItem.getId())
                .podcastId(watchHistoryItem.getPodcastId())
                .completed(watchHistoryItem.isCompleted())
                .watchedAt(watchHistoryItem.getWatchedAt())
                .progress(watchHistoryItem.getProgress())
                .watchHistoryDTO(WatchHistoryMapper.toDTO(watchHistoryItem.getWatchHistory()))
                .build();
    }
}
