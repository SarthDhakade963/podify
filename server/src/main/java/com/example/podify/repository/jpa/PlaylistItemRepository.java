package com.example.podify.repository.jpa;

import com.example.podify.model.PlaylistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlaylistItemRepository extends JpaRepository<PlaylistItem, UUID> {
    Optional<PlaylistItem> findByPodcastIdAndPlaylist(String podcastId, UUID playlistId);

    void deleteByPodcastIdAndPlaylistId(String podcastId, UUID playlistId);
}
