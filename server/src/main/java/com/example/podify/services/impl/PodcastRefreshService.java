package com.example.podify.services.impl;
import com.example.podify.model.Topic;
import com.example.podify.model.User;
import com.example.podify.repository.jpa.UserRepository;
import com.example.podify.services.Signable;
import com.example.podify.services.WatchHistoryService;
import com.example.podify.services.YouTubeService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PodcastRefreshService extends Signable {

    private final YouTubeService youTubeService;
    private final WatchHistoryService watchHistoryService;

    public PodcastRefreshService(UserRepository userRepository, YouTubeService youTubeService, WatchHistoryService watchHistoryService) {
        super(userRepository);
        this.youTubeService = youTubeService;
        this.watchHistoryService = watchHistoryService;
    }

    // Every day new podcasts are fetched
    @Scheduled(fixedRate = 1000 * 60 * 60 * 24)
    public void refreshPodcasts() {
        List<User> users = userRepository.findAllWithTopics(); // fetch all users

        for (User user : users) {
            List<Topic> topics = user.getTopics();
            for (Topic topic : topics) {
                youTubeService.fetchAndSavePodcasts(topic.getName());
            }
        }
    }
}

