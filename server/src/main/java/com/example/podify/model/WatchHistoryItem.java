package com.example.podify.model;

import com.example.podify.model.superclass.Auditable;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "watch_history_item", uniqueConstraints = @UniqueConstraint(columnNames = {"watch_history_id", "podcast_id"}))
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class WatchHistoryItem extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "watch_history_id")
    @ToString.Exclude
    private WatchHistory watchHistory;

    private Long watchedAt = System.currentTimeMillis();

    @Builder.Default
    private float progress = 0;

    private boolean completed;

    private String podcastId;
}
