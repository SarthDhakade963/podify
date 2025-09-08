package com.example.podify.services;

import com.example.podify.dto.PodcastDTO;
import com.example.podify.dto.WatchHistoryDTO;
import com.example.podify.dto.WatchHistoryItemDTO;
import com.example.podify.model.User;
import com.example.podify.model.WatchHistory;

import java.util.List;
import java.util.UUID;

public interface WatchHistoryService {

    void saveOrUpdateWatchHistory(WatchHistoryItemDTO watchHistoryItemDTO, String topicName);

    List<PodcastDTO> getAllHistoryByTopic(String topicName);

    List<PodcastDTO> getIncompleteHistoryByTopic(String topicName);

    List<PodcastDTO> getCompletedHistoryByTopic(String topicName);

    PodcastDTO getNextRecommendedPodcast(String topicName);
}
