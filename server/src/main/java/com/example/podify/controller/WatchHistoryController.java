package com.example.podify.controller;

import com.example.podify.dto.PodcastDTO;
import com.example.podify.dto.WatchHistoryItemDTO;
import com.example.podify.services.WatchHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watch-history")
@RequiredArgsConstructor
public class WatchHistoryController {

    private final WatchHistoryService watchHistoryService;

    @PostMapping("/{topicName}")
    public ResponseEntity<String> saveOrUpdateWatchHistory(
            @PathVariable("topicName") String topicName,
            @RequestBody WatchHistoryItemDTO watchHistoryItemDTO) {
        watchHistoryService.saveOrUpdateWatchHistory(watchHistoryItemDTO, topicName);
        return ResponseEntity.ok("Watch history saved/updated successfully.");
    }

    @GetMapping("/{topicName}")
    public ResponseEntity<List<PodcastDTO>> getAllWatchHistoryByTopic(@PathVariable("topicName") String topicName) {
        List<PodcastDTO> podcastDTOList = watchHistoryService.getAllHistoryByTopic(topicName);
        return ResponseEntity.ok(podcastDTOList);
    }

    @GetMapping("/{topicName}/incomplete")
    public ResponseEntity<List<PodcastDTO>> getIncompleteHistory(@PathVariable("topicName") String topicName) {
        List<PodcastDTO> incomplete = watchHistoryService.getIncompleteHistoryByTopic(topicName);
        return ResponseEntity.ok(incomplete);
    }

    @GetMapping("/{topicName}/completed")
    public ResponseEntity<List<PodcastDTO>> getCompletedHistory(@PathVariable("topicName") String topicName) {
        List<PodcastDTO> completed = watchHistoryService.getCompletedHistoryByTopic(topicName);
        return ResponseEntity.ok(completed);
    }

    @GetMapping("/{topicName}/next")
    public ResponseEntity<PodcastDTO> getNextRecommendedPodcast(@PathVariable("topicName") String topicName) {
        PodcastDTO nextPodcast = watchHistoryService.getNextRecommendedPodcast(topicName);
        if (nextPodcast != null) {
            return ResponseEntity.ok(nextPodcast);
        } else {
            return ResponseEntity.noContent().build(); // or return first completed podcast if you prefer
        }
    }
}

