package com.example.podify.controller;

import com.example.podify.dto.TopicDTO;
import com.example.podify.services.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/topic")
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;

    @PostMapping
    private ResponseEntity<String> saveTopics(@RequestBody List<TopicDTO> topicDTOS) {
        for(TopicDTO topicDTO : topicDTOS) {
            topicService.saveTopic(topicDTO);
        }
        return ResponseEntity.status(200).body("Topic saved successfully");
    }

    @GetMapping
    private ResponseEntity<List<TopicDTO>> getTopics() {
        return ResponseEntity.ok(topicService.getTopics());
    }

    @PatchMapping("/{id}")
    private ResponseEntity<TopicDTO> updateTopic(@PathVariable UUID id, @RequestBody TopicDTO topicDTO) {
        return ResponseEntity.ok(topicService.updateTopic(id, topicDTO));
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> deleteTopic(@PathVariable UUID id) {

        topicService.deleteTopic(id);

        return ResponseEntity.noContent().build();
    }
}
