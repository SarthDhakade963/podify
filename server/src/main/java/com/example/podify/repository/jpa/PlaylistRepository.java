package com.example.podify.repository.jpa;

import com.example.podify.model.Playlist;
import com.example.podify.model.Podcast;
import com.example.podify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PlaylistRepository extends JpaRepository<Playlist, UUID> {
    Optional<Podcast> findByUser(User user);
    boolean existsByUserAndPodcastId(User user, String podcastId);
    void deleteByUserAndPodcastId(User user, String podcastId);
}
