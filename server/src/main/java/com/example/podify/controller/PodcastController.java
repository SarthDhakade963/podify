package com.example.podify.controller;

import com.example.podify.dto.PodcastDTO;
import com.example.podify.services.PodcastService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/podcasts")
@RequiredArgsConstructor
public class PodcastController {
    private final PodcastService podcastService;

    @GetMapping()
    public ResponseEntity<Map<String, List<PodcastDTO>>> getPodcastByTopics() {
        return ResponseEntity.ok(podcastService.getPodcastsByTopics());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PodcastDTO> getById(@PathVariable String id) {
        return podcastService.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PodcastDTO> savePodcast(@RequestBody PodcastDTO podcastDTO) {
        return ResponseEntity.ok(podcastService.save(podcastDTO));
    }
}
