package com.example.podify.mapper;

import com.example.podify.dto.PlaylistDTO;
import com.example.podify.model.Playlist;
import org.springframework.stereotype.Component;

@Component
public class PlaylistMapper {
    public Playlist toEntity(PlaylistDTO playlistDTO) {
        return Playlist.builder()
                .id(playlistDTO.getId())
                .podcastId(playlistDTO.getPodcastId())
                .user(UserMapper.toEntity(playlistDTO.getUser()))
                .build();
    }

    public PlaylistDTO toEntity(Playlist playlist) {
        return PlaylistDTO.builder()
                .id(playlist.getId())
                .podcastId(playlist.getPodcastId())
                .user(UserMapper.toDTO(playlist.getUser()))
                .build();
    }

}
