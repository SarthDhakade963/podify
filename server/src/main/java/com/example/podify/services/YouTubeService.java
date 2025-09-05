package com.example.podify.services;

import com.example.podify.dto.PodcastDTO;
import com.example.podify.dto.YoutubeVideoDTO;

import java.util.List;

public interface YouTubeService {
    List<PodcastDTO> fetchAndSavePodcasts(String topicName);
}
