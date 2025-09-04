package com.example.podify.repository.mongo;

import com.example.podify.model.Podcast;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.List;

@EnableMongoRepositories
public interface PodcastRepository extends MongoRepository<Podcast, String> {

    // fetch first N podcast for a topic
    List<Podcast> findTop3ByTopicNameOrderByCreatedAtDesc(String topicName);

    // fetch by multiple topics
    List<Podcast> findByTopicNameIn(List<String> topicNames);
}
