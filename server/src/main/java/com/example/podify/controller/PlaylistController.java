package com.example.podify.controller;

import com.example.podify.dto.PlaylistDTO;
import com.example.podify.dto.PlaylistItemDTO;
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
    public ResponseEntity<PlaylistDTO> createPlaylist(@RequestParam String name) {
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
    @PostMapping("/{name}/podcasts")
    public ResponseEntity<Void> addPodcast(@PathVariable String name,
                                           @RequestParam String podcastId) {
        playlistService.addPodcast(podcastId, name);
        return ResponseEntity.ok().build();
    }

    // Get all podcasts in a playlist
    @GetMapping("/{name}/podcasts")
    public ResponseEntity<List<PlaylistItemDTO>> getAllPodcasts(@PathVariable String name) {
        List<PlaylistItemDTO> podcasts = playlistService.getAllPodcast(name);
        return ResponseEntity.ok(podcasts);
    }

    // Remove a podcast from a playlist
    @DeleteMapping("/{name}/podcasts/{podcastId}")
    public ResponseEntity<Void> removePodcast(@PathVariable String name,
                                              @PathVariable String podcastId) {
        playlistService.removePodcast(podcastId, name);
        return ResponseEntity.noContent().build();
    }
}
