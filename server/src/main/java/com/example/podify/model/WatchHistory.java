package com.example.podify.model;

import com.example.podify.model.superclass.Auditable;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "watch_history")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class WatchHistory extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String podcastId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;

    private Long watchedAt = System.currentTimeMillis();
}
