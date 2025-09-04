package com.example.podify.mapper;

import com.example.podify.dto.TopicDTO;
import com.example.podify.model.Topic;
import org.springframework.stereotype.Component;

@Component
public class TopicMapper {
    public static TopicDTO toDTO(Topic topic) {
        return TopicDTO.builder()
                .id(topic.getId())
                .name(topic.getName())
                .description(topic.getDescription())
                .build();
    }

    public static Topic toEntity(TopicDTO topicDTO) {
        return Topic.builder()
                .id(topicDTO.getId())
                .name(topicDTO.getName())
                .description(topicDTO.getDescription())
                .build();
    }
}
