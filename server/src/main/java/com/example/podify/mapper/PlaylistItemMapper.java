package com.example.podify.mapper;

import com.example.podify.dto.PlaylistDTO;
import com.example.podify.dto.PlaylistItemDTO;
import com.example.podify.model.Playlist;
import com.example.podify.model.PlaylistItem;
import com.example.podify.model.User;

public class PlaylistItemMapper {
    public static PlaylistItemDTO toDTO(PlaylistItem playlistItem) {
        return PlaylistItemDTO.builder()
                .podcastId(playlistItem.getPodcastId())
                .playlistDTO(PlaylistMapper.toDTO(playlistItem.getPlaylist()))
                .build();
    }

    private static PlaylistItem toEntity(PlaylistItemDTO playlistItemDTO) {
        return PlaylistItem.builder()
                .playlist(PlaylistMapper.toEntity(playlistItemDTO.getPlaylistDTO()))
                .podcastId(playlistItemDTO.getPodcastId())
                .build();
    }
}
