package com.example.podify.services.impl;

import com.example.podify.dto.PodcastDTO;
import com.example.podify.mapper.PodcastMapper;
import com.example.podify.model.Podcast;
import com.example.podify.repository.mongo.PodcastRepository;
import com.example.podify.services.YouTubeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import com.google.gson.JsonObject;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class YouTubeServiceImpl implements YouTubeService {
    private final PodcastRepository podcastRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${youtube.api.key}")
    private String apiKey;

    private static final String YT_SEARCH_URL =
            "https://www.googleapis.com/youtube/v3/search?" +
                    "part=snippet" +
                    "&type=video" +
                    "&maxResults=5" +
                    "&q=%s podcast" +                // Search query with 'podcast'
                    "&videoCategoryId=22" +          // Filter to People & Blogs category
                    "&videoDuration=medium" +        // Avoid very short videos; medium = 4–20 min
                    "&order=relevance" +
                    "&key=%s";


    @Override
    public List<PodcastDTO> fetchAndSavePodcasts(String topicName) {
        String url = String.format(YT_SEARCH_URL, topicName, apiKey);
        Map res = restTemplate.getForObject(url, Map.class);

        if (res == null || !res.containsKey("items")) {
            System.err.println("No results found for topic: " + topicName);
            return List.of();
        }

        List<Map<String, Object>> items = (List<Map<String, Object>>) res.get("items");

        List<PodcastDTO> podcastDTOS = items.stream().map(item -> {
            try{
                Map<String, Object> idMap = (Map<String, Object>) item.get("id");
                String videoId = idMap != null ? (String) idMap.get("videoId") : null;

                Map<String, Object> snippet = (Map<String, Object>) item.get("snippet");

                if(snippet == null) {
                    return null;
                }

                String rawTitle = Objects.toString(snippet.get("title"), "untitled");
                String title = StringEscapeUtils.unescapeHtml4(rawTitle);
                String description = Objects.toString(snippet.get("description"), "");
                String channel = Objects.toString(snippet.get("channelTitle"), "");

                Map<String, Object> thumbnails = (Map<String, Object>) snippet.get("thumbnails");
                String thumbnail = extractThumbnailUrl(thumbnails);

                return PodcastDTO.builder()
                        .id(videoId)
                        .title(title)
                        .description(description)
                        .channel(channel)
                        .thumbnail(thumbnail)
                        .videoUrl("https://www.youtube.com/watch?v=" + videoId)
                        .topicName(topicName)
                        .build();

            } catch (Exception e) {
                System.err.println("Error parsing item: " + e.getMessage());
                return null;
            }
        }).filter(Objects::nonNull).toList();

        // Save only if podcast doesn't exist
        List<Podcast> newPodcasts = podcastDTOS.stream()
                .filter(p -> !podcastRepository.existsById(p.getId()))
                .map(PodcastMapper::toEntity)
                .toList();

        if (!newPodcasts.isEmpty()) {
            podcastRepository.saveAll(newPodcasts);
        }

        return podcastDTOS;
    }

    @SuppressWarnings("unchecked")
    private String extractThumbnailUrl(Map<String, Object> thumbnails) {
        if (thumbnails == null) return null;

        // Check in preferred order
        String[] keys = {"maxres", "standard", "high", "medium", "default"};

        for (String key : keys) {
            if (thumbnails.containsKey(key)) {
                Map<String, Object> thumbData = (Map<String, Object>) thumbnails.get(key);
                Object url = thumbData.get("url");
                if (url != null) return url.toString();
            }
        }

        return null; // fallback if no thumbnail exists
    }
}
