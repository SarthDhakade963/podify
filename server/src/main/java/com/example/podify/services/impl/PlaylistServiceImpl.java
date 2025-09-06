package com.example.podify.services.impl;

import com.example.podify.dto.PlaylistDTO;
import com.example.podify.dto.PlaylistItemDTO;
import com.example.podify.dto.UserDTO;
import com.example.podify.mapper.PlaylistItemMapper;
import com.example.podify.mapper.PlaylistMapper;
import com.example.podify.mapper.UserMapper;
import com.example.podify.model.Playlist;
import com.example.podify.model.PlaylistItem;
import com.example.podify.model.User;
import com.example.podify.repository.jpa.PlaylistItemRepository;
import com.example.podify.repository.jpa.PlaylistRepository;
import com.example.podify.repository.jpa.UserRepository;
import com.example.podify.services.PlaylistService;
import com.example.podify.services.Signable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service

public class PlaylistServiceImpl extends Signable implements PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final PlaylistItemRepository playlistItemRepository;
    public PlaylistServiceImpl(UserRepository userRepository, PlaylistRepository playlistRepository, PlaylistItemRepository playlistItemRepository) {
        super(userRepository);
        this.playlistRepository = playlistRepository;
        this.playlistItemRepository = playlistItemRepository;
    }

    @Override
    public PlaylistDTO createPlaylist(String name) {
        User user = getLoggedInUser();

        if (playlistRepository.existsByUserAndName(user, name)) {
            throw new RuntimeException("Playlist with this name already exists");
        }

        Playlist playlist = Playlist.builder()
                            .name(name)
                            .user(user)
                            .build();

        playlistRepository.save(playlist);

        return PlaylistMapper.toDTO(playlist);
    }

    @Override
    public void removePlaylist(String name) {
        User user = getLoggedInUser();
        playlistRepository.deleteByUserAndName(user, name);
    }

    @Override
    public List<PlaylistDTO> getAllPlaylists() {
        User user = getLoggedInUser();
        return user.getPlaylists().stream().map(PlaylistMapper::toDTO).toList();
    }

    // Playlist Item Service
    @Transactional
    @Override
    public void addPodcast(String podcastId, String name) {
        User user = getLoggedInUser();
        Playlist playlist = playlistRepository.findByUserAndName(user, name).orElseThrow(() -> new RuntimeException("Playlist not found"));

        boolean exists = playlist.getItems().stream()
                .anyMatch(item -> item.getPodcastId().equals(podcastId));

        if (exists) return; // or throw exception if you prefer

        PlaylistItem playlistItem = PlaylistItem.builder()
                .playlist(playlist)
                .podcastId(podcastId)
                .build();

        playlistItemRepository.save(playlistItem);
    }

    @Transactional
    @Override
    public void removePodcast(String podcastId, String name) {
        User user = getLoggedInUser();
        Playlist playlist = playlistRepository.findByUserAndName(user, name).orElseThrow(() -> new RuntimeException("No Playlist found"));
        playlistItemRepository.deleteByPodcastIdAndPlaylistId(podcastId, playlist.getId());
    }

    @Override
    public List<PlaylistItemDTO> getAllPodcast(String playlistName) {
        User  user = getLoggedInUser();
        Playlist playlist = playlistRepository.findByUserAndName(user, playlistName).orElseThrow(() -> new RuntimeException("No playlist found"));
        return playlist.getItems().stream().map(PlaylistItemMapper::toDTO).toList();
    }
}
