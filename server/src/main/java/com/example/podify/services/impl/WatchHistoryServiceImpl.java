package com.example.podify.services.impl;

import com.example.podify.dto.PodcastDTO;
import com.example.podify.dto.WatchHistoryDTO;
import com.example.podify.dto.WatchHistoryItemDTO;
import com.example.podify.mapper.PodcastMapper;
import com.example.podify.mapper.WatchHistoryMapper;
import com.example.podify.model.Podcast;
import com.example.podify.model.User;
import com.example.podify.model.WatchHistory;
import com.example.podify.model.WatchHistoryItem;
import com.example.podify.repository.jpa.UserRepository;
import com.example.podify.repository.jpa.WatchHistoryItemRepository;
import com.example.podify.repository.jpa.WatchHistoryRepository;
import com.example.podify.repository.mongo.PodcastRepository;
import com.example.podify.services.PodcastService;
import com.example.podify.services.Signable;
import com.example.podify.services.WatchHistoryService;
import com.example.podify.services.YouTubeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class WatchHistoryServiceImpl extends Signable implements WatchHistoryService {
    private final WatchHistoryRepository watchHistoryRepository;

    private final WatchHistoryItemRepository watchHistoryItemRepository;

    private final PodcastRepository podcastRepository;

    private final YouTubeService youTubeService;

    public WatchHistoryServiceImpl(UserRepository userRepository, WatchHistoryRepository watchHistoryRepository, WatchHistoryItemRepository watchHistoryItemRepository, PodcastRepository podcastRepository, YouTubeService youTubeService) {
        super(userRepository);
        this.watchHistoryRepository = watchHistoryRepository;
        this.watchHistoryItemRepository = watchHistoryItemRepository;
        this.podcastRepository = podcastRepository;
        this.youTubeService = youTubeService;
    }

    private WatchHistory createNewWatchHistoryEntity(String topicName) {
        User user = getLoggedInUser();

        WatchHistory watchHistory = WatchHistory.builder()
                .watchHistoryItems(new ArrayList<>())
                .topicName(topicName)
                .user(user)
                .build();

        return watchHistoryRepository.save(watchHistory);
    }

    @Transactional
    @Override
    public void saveOrUpdateWatchHistory(WatchHistoryItemDTO watchHistoryItemDTO, String topicName) {
        User user = getLoggedInUser();

        WatchHistory watchHistory = watchHistoryRepository.findByUserAndTopicName(user, topicName)
                                    .orElseGet(() -> createNewWatchHistoryEntity(topicName));

        WatchHistoryItem watchHistoryItem = watchHistory.getWatchHistoryItems().stream()
                .filter(item -> item.getPodcastId().equals(watchHistoryItemDTO.getPodcastId()))
                .findFirst()
                .orElse(null);

        if (watchHistoryItem != null && !watchHistoryItem.isCompleted()) {
            // Update existing item
            watchHistoryItem.setProgress(watchHistoryItemDTO.getProgress());
            watchHistoryItem.setWatchedAt(watchHistoryItemDTO.getWatchedAt());
            watchHistoryItem.setCompleted(watchHistoryItemDTO.getProgress() >= 95);
        } else {
            // Create new item
            watchHistoryItem = WatchHistoryItem.builder()
                    .podcastId(watchHistoryItemDTO.getPodcastId().replaceAll("\"","").trim())
                    .watchedAt(watchHistoryItemDTO.getWatchedAt())
                    .progress(watchHistoryItemDTO.getProgress())
                    .completed(watchHistoryItemDTO.getProgress() >= 95)
                    .watchHistory(watchHistory)
                    .build();
            watchHistory.getWatchHistoryItems().add(watchHistoryItem);
        }

        watchHistoryRepository.save(watchHistory);
    }

    @Override
    public List<PodcastDTO> getAllHistoryByTopic(String topicName) {
        User user = getLoggedInUser();

        WatchHistory watchHistory = watchHistoryRepository.findByUserAndTopicName(user, topicName).orElseGet(() ->
                createNewWatchHistoryEntity(topicName)
        );

        List<WatchHistoryItem> watchHistoryItems = watchHistoryItemRepository.findByWatchHistoryId(watchHistory.getId());

        List<String> podcastIds = watchHistoryItems.stream()
                .map(WatchHistoryItem::getPodcastId)
                .toList();

        List<Podcast> getAllPodcasts = podcastRepository.findAllById(podcastIds);

        return getAllPodcasts.stream().map(PodcastMapper::toDTO).toList();

    }

    @Override
    public List<PodcastDTO> getIncompleteHistoryByTopic(String topicName) {
        User user = getLoggedInUser();

        WatchHistory watchHistory = watchHistoryRepository.findByUserAndTopicName(user, topicName).orElseGet(() ->
                createNewWatchHistoryEntity(topicName)
        );

        List<WatchHistoryItem> watchHistoryItems = watchHistoryItemRepository.findAllByWatchHistoryAndCompletedFalseOrderByWatchedAtDesc(watchHistory);

        List<String> podcastIds = watchHistoryItems.stream()
                .map(WatchHistoryItem::getPodcastId)
                .toList();

        List<Podcast> getAllPodcasts = podcastRepository.findAllById(podcastIds);

        return getAllPodcasts.stream().map(PodcastMapper::toDTO).toList();
    }

    @Override
    public List<PodcastDTO> getCompletedHistoryByTopic(String topicName) {
        User user = getLoggedInUser();

        WatchHistory watchHistory = watchHistoryRepository.findByUserAndTopicName(user, topicName)
                                    .orElseGet(() -> createNewWatchHistoryEntity(topicName));

        List<WatchHistoryItem> watchHistoryItems = watchHistoryItemRepository.findAllByWatchHistoryAndCompletedTrueOrderByWatchedAtDesc(watchHistory);

        List<String> podcastIds = watchHistoryItems.stream()
                .map(WatchHistoryItem::getPodcastId)
                .toList();

        List<Podcast> getAllPodcasts = podcastRepository.findAllById(podcastIds);

        return getAllPodcasts.stream().map(PodcastMapper::toDTO).toList();
    }

    @Override
    public PodcastDTO getNextRecommendedPodcast(String topicName) {
        User user = getLoggedInUser();

        WatchHistory watchHistory = watchHistoryRepository.findByUserAndTopicName(user, topicName)
                .orElseGet(() -> createNewWatchHistoryEntity(topicName));

        // Fetch all incomplete items
        List<WatchHistoryItem> incompleteItems =
                watchHistoryItemRepository.findAllByWatchHistoryAndCompletedFalseOrderByWatchedAtDesc(watchHistory);

        if (incompleteItems.isEmpty()) {
            // All podcasts completed, return null or first completed
            youTubeService.fetchAndSavePodcasts(topicName);
        }

        // Smart prioritization: pick partially watched first (highest progress), then unwatched (lowest watchedAt)
        // First: descending progress
        // Second: ascending watchedAt (older first)
        WatchHistoryItem nextItem = incompleteItems.stream().min((a, b) -> {
                    // First: descending progress
                    int progressCompare = Float.compare(b.getProgress(), a.getProgress());
                    if (progressCompare != 0) return progressCompare;

                    // Second: ascending watchedAt (older first)
                    return Long.compare(a.getWatchedAt(), b.getWatchedAt());
                }).get();

        String nextPodcastId = nextItem.getPodcastId();
        return podcastRepository.findById(nextPodcastId)
                .map(PodcastMapper::toDTO)
                .orElse(null);
    }


}
