package com.example.podify.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class PodcastDTO {
    private String id; // yt video id
    private String title;
    private String thumbnail;
    private String channel;
    private String topicName; // name of the topic
    private String description;
    private String videoUrl;
}
