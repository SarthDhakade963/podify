package com.example.podify.services.impl;

import com.example.podify.dto.WatchHistoryDTO;
import com.example.podify.repository.jpa.UserRepository;
import com.example.podify.repository.jpa.WatchHistoryRepository;
import com.example.podify.services.Signable;
import com.example.podify.services.WatchHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchHistoryServiceImpl extends Signable implements WatchHistoryService {
    private final WatchHistoryRepository watchHistoryRepository;

    public WatchHistoryServiceImpl(UserRepository userRepository, WatchHistoryRepository watchHistoryRepository) {
        super(userRepository);
        this.watchHistoryRepository = watchHistoryRepository;
    }

    @Override
    public WatchHistoryDTO save(String podcastId) {
        return null;
    }

    @Override
    public List<WatchHistoryDTO> list() {
        return List.of();
    }
}
