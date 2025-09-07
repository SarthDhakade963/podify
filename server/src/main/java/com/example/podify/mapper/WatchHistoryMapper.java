package com.example.podify.mapper;

import com.example.podify.dto.WatchHistoryDTO;
import com.example.podify.model.WatchHistory;
import org.springframework.stereotype.Component;

@Component
public class WatchHistoryMapper {
    public static WatchHistory toEntity(WatchHistoryDTO watchHistoryDTO) {
        return WatchHistory.builder()
                .id(watchHistoryDTO.getId())
                .user(UserMapper.toEntity(watchHistoryDTO.getUser()))
                .topicName(watchHistoryDTO.getTopicName())
                .watchHistoryItems(watchHistoryDTO.getWatchHistoryItemDTOS().stream().map(WatchHistoryItemMapper::toEntity).toList())
                .build();
    }

    public static WatchHistoryDTO toDTO(WatchHistory watchHistory) {
        return WatchHistoryDTO.builder()
                .id(watchHistory.getId())
                .user(UserMapper.toDTO(watchHistory.getUser()))
                .topicName(watchHistory.getTopicName())
                .watchHistoryItemDTOS(watchHistory.getWatchHistoryItems().stream().map(WatchHistoryItemMapper::toDTO).toList())
                .build();
    }
}
