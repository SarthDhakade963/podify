package com.example.podify.services;

import com.example.podify.dto.TopicDTO;

import java.util.List;
import java.util.UUID;

public interface TopicService {
    void saveTopic(TopicDTO topicDTO);

    List<TopicDTO> getTopics();

    TopicDTO updateTopic(UUID id, TopicDTO topicDTO);

    void deleteTopic(UUID id);
}
