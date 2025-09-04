package com.example.podify.services.impl;

import com.example.podify.dto.PodcastDTO;
import com.example.podify.mapper.PodcastMapper;
import com.example.podify.model.Podcast;
import com.example.podify.model.Topic;
import com.example.podify.model.User;
import com.example.podify.repository.mongo.PodcastRepository;
import com.example.podify.repository.jpa.UserRepository;
import com.example.podify.services.PodcastService;
import com.example.podify.services.Signable;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PodcastServiceImpl extends Signable implements PodcastService {
    private final PodcastRepository podcastRepository;

    public PodcastServiceImpl(UserRepository userRepository, PodcastRepository podcastRepository) {
        super(userRepository);
        this.podcastRepository = podcastRepository;
    }

    @Override
    public Map<String, List<PodcastDTO>> getPodcastsByTopics() {
        User user = getLoggedInUser();
        List<Topic> topics = user.getTopics();

        Map<String, List<PodcastDTO>> res = new LinkedHashMap<>();
        for(Topic topic : topics) {
            List<Podcast> list = podcastRepository.findTop3ByTopicNameOrderByCreatedAtDesc(topic.getName());
            res.put(topic.getName(), list.stream().map(PodcastMapper::toDTO).limit(3).toList());
        }
        return res;
    }

    @Override
    public Optional<PodcastDTO> getById(String id) {
        return podcastRepository.findById(id).map(PodcastMapper::toDTO);
    }

    @Override
    public PodcastDTO save(PodcastDTO podcastDTO) {
        Podcast podcast = podcastRepository.save(PodcastMapper.toEntity(podcastDTO));
        return PodcastMapper.toDTO(podcast);
    }
}
