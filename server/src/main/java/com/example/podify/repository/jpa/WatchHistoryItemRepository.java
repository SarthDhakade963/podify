package com.example.podify.repository.jpa;


import com.example.podify.model.WatchHistory;
import com.example.podify.model.WatchHistoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WatchHistoryItemRepository extends JpaRepository<WatchHistoryItem, UUID> {
    // Fetch all items belonging to a specific watch history
    List<WatchHistoryItem> findByWatchHistoryId(UUID watchHistoryId);

    // Fetch a specific item by its watch history and podcast ID
    WatchHistoryItem findAllByWatchHistoryIdAndPodcastId(UUID watchHistoryId, String podcastId);

    // Fetch the most recently completed podcast in a topic
    List<WatchHistoryItem> findAllByWatchHistoryAndCompletedTrueOrderByWatchedAtDesc(WatchHistory watchHistory);

    // Fetch the most recently incomplete podcast in a topic
    List<WatchHistoryItem> findAllByWatchHistoryAndCompletedFalseOrderByWatchedAtDesc(WatchHistory watchHistory);

}
