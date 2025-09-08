package com.example.podify.repository.mongo;

import com.example.podify.model.Podcast;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.time.Instant;
import java.util.List;

@EnableMongoRepositories
public interface PodcastRepository extends MongoRepository<Podcast, String> {

    // fetch first N podcast for a topic
    List<Podcast> findTop3ByTopicNameOrderByCreatedAtDesc(String topicName);

    // Get podcasts updated after a cutoff time
    List<Podcast> findByTopicNameAndLastFetchedAtAfterOrderByLastFetchedAtDesc(String topicName, Instant cutoff);

}
