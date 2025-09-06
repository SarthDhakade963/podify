package com.example.podify.repository.jpa;

import com.example.podify.model.Playlist;
import com.example.podify.model.Podcast;
import com.example.podify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, UUID> {

    boolean existsByUserAndName(User user, String name);

    void deleteByUserAndName(User user, String name);

    Optional<Playlist> findByUserAndName(User user, String name);
}
