package com.example.podify.mapper;

import com.example.podify.dto.WatchHistoryDTO;
import com.example.podify.model.WatchHistory;
import org.springframework.stereotype.Component;

@Component
public class WatchHistoryMapper {
    public WatchHistory toEntity(WatchHistoryDTO watchHistoryDTO) {
        return WatchHistory.builder()
                .id(watchHistoryDTO.getId())
                .podcastId(watchHistoryDTO.getPodcastId())
                .watchedAt(watchHistoryDTO.getWatchedAt())
                .user(UserMapper.toEntity(watchHistoryDTO.getUser()))
                .build();
    }

    public WatchHistoryDTO toDTO(WatchHistory watchHistory) {
        return WatchHistoryDTO.builder()
                .id(watchHistory.getId())
                .podcastId(watchHistory.getPodcastId())
                .watchedAt(watchHistory.getWatchedAt())
                .user(UserMapper.toDTO(watchHistory.getUser()))
                .build();
    }
}
