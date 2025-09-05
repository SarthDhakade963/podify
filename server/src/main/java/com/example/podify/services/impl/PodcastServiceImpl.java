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
import com.example.podify.services.YouTubeService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PodcastServiceImpl extends Signable implements PodcastService {
    private final PodcastRepository podcastRepository;
    private final YouTubeService youTubeService;

    public PodcastServiceImpl(UserRepository userRepository, PodcastRepository podcastRepository, YouTubeService youTubeService) {
        super(userRepository);
        this.podcastRepository = podcastRepository;
        this.youTubeService = youTubeService;
    }

    @Override
    public Map<String, List<PodcastDTO>> getPodcastsByTopics() {
        User user = getLoggedInUser();

        // Get user-selected topics from PostgreSQL
        List<Topic> topics = user.getTopics();

        Map<String, List<PodcastDTO>> res = new LinkedHashMap<>();

        for(Topic topic : topics) {
            String topicName = topic.getName();

            // fetch top 3 from MongoDB
            List<Podcast> list = podcastRepository.findTop3ByTopicNameOrderByCreatedAtDesc(topicName);

            // if podcast aren't in db
            if (list.isEmpty()) {
                // then fetched from yt
                List<PodcastDTO> fetched = youTubeService.fetchAndSavePodcasts(topicName);

                res.put(topicName, fetched);
            } else {
                // if it is in DB then send that
                List<PodcastDTO> dtos = list.stream().map(PodcastMapper::toDTO).toList();
                res.put(topicName, dtos);
            }
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
