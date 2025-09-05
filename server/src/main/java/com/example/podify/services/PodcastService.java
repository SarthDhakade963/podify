package com.example.podify.services;

import com.example.podify.dto.PodcastDTO;
import com.example.podify.model.Podcast;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface PodcastService {
    Map<String, List<PodcastDTO>> getPodcastsByTopics();

    Optional<PodcastDTO> getById(String id);

    PodcastDTO save(PodcastDTO podcastDTO);
}
