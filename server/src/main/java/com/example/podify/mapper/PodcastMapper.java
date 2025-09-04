package com.example.podify.mapper;

import com.example.podify.dto.PodcastDTO;
import com.example.podify.model.Podcast;
import jakarta.persistence.Column;
import org.springframework.stereotype.Component;

@Component
public class PodcastMapper {
    public static PodcastDTO toDTO(Podcast podcast) {
        return PodcastDTO.builder()
                .id(podcast.getId())
                .title(podcast.getTitle())
                .channel(podcast.getChannel())
                .duration(podcast.getDuration())
                .thumbnail(podcast.getThumbnail())
                .topicName(podcast.getTopicName())
                .description(podcast.getDescription())
                .videoUrl(podcast.getVideoUrl())
                .transcript(podcast.getTranscript())
                .build();
    }

    public static Podcast toEntity(PodcastDTO podcastDTO) {
        return Podcast.builder()
                .id(podcastDTO.getId())
                .title(podcastDTO.getTitle())
                .channel(podcastDTO.getChannel())
                .duration(podcastDTO.getDuration())
                .thumbnail(podcastDTO.getThumbnail())
                .topicName(podcastDTO.getTopicName())
                .description(podcastDTO.getDescription())
                .transcript(podcastDTO.getTranscript())
                .videoUrl(podcastDTO.getVideoUrl())
                .build();
    }
}
