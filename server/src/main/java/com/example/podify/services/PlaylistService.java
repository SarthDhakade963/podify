package com.example.podify.services;

import com.example.podify.dto.PlaylistDTO;
import com.example.podify.dto.PlaylistItemDTO;
import com.example.podify.dto.PodcastDTO;

import java.util.List;

public interface PlaylistService {
    PlaylistDTO createPlaylist(String name);

    void removePlaylist(String name);

    List<PlaylistDTO> getAllPlaylists();

    void addPodcast(String podcastId, String playlistName);

    void removePodcast(String podcastId, String playlistName);

    List<PodcastDTO> getAllPodcast(String playlistName);
}
