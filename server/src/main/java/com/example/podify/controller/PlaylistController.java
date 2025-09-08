package com.example.podify.controller;

import com.example.podify.dto.PlaylistDTO;
import com.example.podify.dto.PodcastDTO;
import com.example.podify.services.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
@RequiredArgsConstructor
public class PlaylistController {

    private final PlaylistService playlistService;

    // Create a new playlist
    @PostMapping
    public ResponseEntity<PlaylistDTO> createPlaylist(@RequestBody String name) {
        System.out.println(name);
        PlaylistDTO playlist = playlistService.createPlaylist(name);
        return ResponseEntity.status(201).body(playlist);
    }

    // Delete a playlist
    @DeleteMapping("/{name}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable String name) {
        playlistService.removePlaylist(name);
        return ResponseEntity.noContent().build();
    }

    // Get all playlists of logged-in user
    @GetMapping
    public ResponseEntity<List<PlaylistDTO>> getAllPlaylists() {
        List<PlaylistDTO> playlists = playlistService.getAllPlaylists();
        return ResponseEntity.ok(playlists);
    }

    // Add a podcast to a playlist
    @PostMapping("/{name}")
    public ResponseEntity<Void> addPodcast(@PathVariable String name,
                                           @RequestBody String podcastId) {
        playlistService.addPodcast(podcastId.replaceAll("\"","").trim(), name);
        return ResponseEntity.ok().build();
    }

    // Get all podcasts in a playlist
    @GetMapping("/{name}")
    public ResponseEntity<List<PodcastDTO>> getAllPodcasts(@PathVariable String name) {
        try {
            List<PodcastDTO> podcasts = playlistService.getAllPodcast(name);
            return ResponseEntity.ok(podcasts);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Remove a podcast from a playlist
    @DeleteMapping("/{name}/podcast")
    public ResponseEntity<Void> removePodcast(@PathVariable String name,
                                              @RequestBody String podcastId) {
        playlistService.removePodcast(podcastId.replaceAll("\"","").trim(), name);
        return ResponseEntity.noContent().build();
    }
}
