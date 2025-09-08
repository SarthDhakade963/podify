package com.example.podify.services.impl;

import com.example.podify.dto.PlaylistDTO;
import com.example.podify.dto.PodcastDTO;
import com.example.podify.mapper.PlaylistMapper;
import com.example.podify.mapper.PodcastMapper;
import com.example.podify.model.Playlist;
import com.example.podify.model.PlaylistItem;
import com.example.podify.model.User;
import com.example.podify.repository.jpa.PlaylistItemRepository;
import com.example.podify.repository.jpa.PlaylistRepository;
import com.example.podify.repository.jpa.UserRepository;
import com.example.podify.repository.mongo.PodcastRepository;
import com.example.podify.services.PlaylistService;
import com.example.podify.services.Signable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlaylistServiceImpl extends Signable implements PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final PodcastRepository podcastRepository;
    private final PlaylistItemRepository playlistItemRepository;
    public PlaylistServiceImpl(UserRepository userRepository, PlaylistRepository playlistRepository, PodcastRepository podcastRepository, PlaylistItemRepository playlistItemRepository) {
        super(userRepository);
        this.playlistRepository = playlistRepository;
        this.podcastRepository = podcastRepository;
        this.playlistItemRepository = playlistItemRepository;
    }

    @Override
    public PlaylistDTO createPlaylist(String name) {
        User user = getLoggedInUser();

        if (playlistRepository.existsByUserAndName(user, name)) {
            throw new RuntimeException("Playlist with this name already exists");
        }

        Playlist playlist = Playlist.builder()
                            .name(name.replaceAll("\"","").trim())
                            .user(user)
                            .items(new ArrayList<>())
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
        playlistItemRepository.deleteByPodcastIdAndPlaylist_Id(podcastId, playlist.getId());
    }

    PlaylistItem playlistItem;
    @Override
    public List<PodcastDTO> getAllPodcast(String playlistName) {
        User  user = getLoggedInUser();
        Playlist playlist = playlistRepository.findByUserAndName(user, playlistName).orElseThrow(() -> new RuntimeException("No playlist found"));

        List<PodcastDTO> podcastDTOList = new ArrayList<>();

        for (PlaylistItem playlistItem : playlist.getItems()) {
            if (podcastRepository.existsById(playlistItem.getPodcastId())) {
                PodcastDTO podcastDTO = podcastRepository.findById(playlistItem.getPodcastId())
                        .map(PodcastMapper::toDTO)
                        .orElseThrow(() -> new RuntimeException("Podcast for a given Playlist not found"));
                podcastDTOList.add(podcastDTO);
            }
        }

        return podcastDTOList.stream().toList();
    }
}
