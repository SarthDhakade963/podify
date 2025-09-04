package com.example.podify.repository.jpa;

import com.example.podify.model.Topic;
import com.example.podify.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TopicRepository extends JpaRepository<Topic, UUID> {
    Optional<Topic> findByName(String name);

    Optional<List<Topic>> findByUser(User user);
}
