package com.example.podify.services;

import com.example.podify.dto.WatchHistoryDTO;

import java.util.List;

public interface WatchHistoryService {
    WatchHistoryDTO save(String podcastId);

    List<WatchHistoryDTO> list();
}
