package com.example.podify.model;

import com.example.podify.model.superclass.Auditable;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "watch_history",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "topic_name"}),
        indexes = {
        @Index(name = "idx_user_id", columnList = "user_id"),
        @Index(name = "idx_topic_name", columnList = "topicName")
})
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class WatchHistory extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;

    private String topicName;

    private int watchCount;      // Total number of times user interacted with this topic

    private float averageProgress; // Average progress for this topic

    private long lastWatchedAt; // Timestamp of the last watched podcast

    private int completedCount;   // Number of times podcasts completed

    @OneToMany(mappedBy = "watchHistory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WatchHistoryItem> watchHistoryItems = new ArrayList<>();
}
