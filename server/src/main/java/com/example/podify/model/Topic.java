package com.example.podify.model;

import com.example.podify.model.superclass.Auditable;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Table (name= "topics")
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Topic extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    private User user;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    @ToString.Exclude
    private Topic topic;
}
