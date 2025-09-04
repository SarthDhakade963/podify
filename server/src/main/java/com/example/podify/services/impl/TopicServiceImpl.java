package com.example.podify.services.impl;

import com.example.podify.dto.TopicDTO;
import com.example.podify.mapper.TopicMapper;
import com.example.podify.model.Topic;
import com.example.podify.model.User;
import com.example.podify.repository.jpa.TopicRepository;
import com.example.podify.repository.jpa.UserRepository;
import com.example.podify.services.Signable;
import com.example.podify.services.TopicService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TopicServiceImpl extends Signable implements TopicService {

    private final TopicRepository topicRepository;

    public TopicServiceImpl(UserRepository userRepository, TopicRepository topicRepository) {
        super(userRepository);
        this.topicRepository = topicRepository;
    }

    @Override
    public void saveTopic(TopicDTO topicDTO) {
        User user = getLoggedInUser();
        Topic topic = TopicMapper.toEntity(topicDTO);
        topic.setUser(user);
        topicRepository.save(topic);
    }

    @Override
    public List<TopicDTO> getTopics() {
        User user = getLoggedInUser();
        List<Topic> topics = user.getTopics();
        return topics.stream().map(TopicMapper::toDTO).toList();
    }

    @Override
    public TopicDTO updateTopic(UUID id, TopicDTO topicDTO) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Topic not found"));

        topic.setName(topicDTO.getName());
        topic.setDescription(topicDTO.getDescription());

        topicRepository.save(topic);

        return TopicMapper.toDTO(topic);
    }

    @Override
    public void deleteTopic(UUID id) {
        topicRepository.deleteById(id);
    }
}
