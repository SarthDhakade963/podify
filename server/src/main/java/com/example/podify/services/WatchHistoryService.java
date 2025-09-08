package com.example.podify.services;

import com.example.podify.dto.PodcastDTO;
import com.example.podify.dto.TopicRecommendationDTO;
import com.example.podify.dto.WatchHistoryItemDTO;

import java.util.List;

public interface WatchHistoryService {

    void saveOrUpdateWatchHistory(WatchHistoryItemDTO watchHistoryItemDTO, String topicName);

    List<PodcastDTO> getAllHistoryByTopic(String topicName);

    List<PodcastDTO> getIncompleteHistoryByTopic(String topicName);

    List<PodcastDTO> getCompletedHistoryByTopic(String topicName);

    PodcastDTO getNextRecommendedPodcast(String topicName);

    List<TopicRecommendationDTO> getTopTopics(int limit);
}
