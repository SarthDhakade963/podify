package com.example.podify.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class YoutubeVideoDTO {
    String id;
    String title;
    String description;
    String thumbnail;
    String channel;
}
