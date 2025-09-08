package com.example.podify.model;


import com.example.podify.model.superclass.Auditable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.UUID;

@Document(collection = "podcasts")
@CompoundIndexes({
        @CompoundIndex(name = "topicName_idx", def = "{'topicName': 1}")
})
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Podcast extends Auditable {
    @Id
    private String id; // Youtube Video ID

    private String title;

    private String thumbnail;

    private String channel;

    private String duration;

    private String topicName;

    private String description;

    private String videoUrl;

    private String transcript;

    private Instant lastFetchedAt;
}
