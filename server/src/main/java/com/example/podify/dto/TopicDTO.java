package com.example.podify.dto;

import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class TopicDTO {
    private UUID id;
    private String name;
    private String description;
}
