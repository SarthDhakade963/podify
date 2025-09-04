package com.example.podify.repository.jpa;

import com.example.podify.model.User;
import com.example.podify.model.WatchHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface WatchHistoryRepository extends JpaRepository<WatchHistory, UUID> {
    Optional<WatchHistory> findByUserOrderByWatchedAtDesc(User user);
}
