package com.example.podify.mapper;

import com.example.podify.dto.PlaylistDTO;
import com.example.podify.model.Playlist;
import com.example.podify.model.PlaylistItem;
import org.springframework.stereotype.Component;

@Component
public class PlaylistMapper {
    public static Playlist toEntity(PlaylistDTO playlistDTO) {
        Playlist playlist = Playlist.builder()
                .id(playlistDTO.getId())
                .name(playlistDTO.getName())
                .user(UserMapper.toEntity(playlistDTO.getUser()))
                .build();

        if (playlistDTO.getPodcastIds() != null) {
            playlistDTO.getPodcastIds().forEach(pid -> {
                playlist.getItems().add(
                        PlaylistItem.builder()
                                .podcastId(pid)
                                .playlist(playlist)
                                .build()
                );
            });
        }
        return playlist;
    }

    public static PlaylistDTO toDTO(Playlist playlist) {
        return PlaylistDTO.builder()
                .id(playlist.getId())
                .name(playlist.getName())
                .user(UserMapper.toDTO(playlist.getUser()))
                .podcastIds(
                        playlist.getItems().stream()
                                .map(PlaylistItem::getPodcastId)
                                .toList()
                )
                .build();
    }

}
