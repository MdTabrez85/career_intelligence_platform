package com.careerintelligence.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.careerintelligence.service.AiServiceClient;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiServiceClient aiServiceClient;

    public AiController(AiServiceClient aiServiceClient) {
        this.aiServiceClient = aiServiceClient;
    }

   @PostMapping("/skills/extract")
    public ResponseEntity<Map<String, Object>> extractSkills(
            @RequestBody Map<String, Object> request) {

        System.out.println("AI DEBUG: Incoming request = " + request);

        return ResponseEntity.ok(
                aiServiceClient.extractSkills(request)
        );
    }

    @PostMapping("/jobs/match")
    public ResponseEntity<Map<String, Object>> matchJobRole(
            @RequestBody Map<String, Object> request) {

        return ResponseEntity.ok(
                aiServiceClient.matchJobRole(request)
        );
    }

    @PostMapping("/skills/gap-analysis")
    public ResponseEntity<Map<String, Object>> analyzeSkillGaps(
            @RequestBody Map<String, Object> request) {

        return ResponseEntity.ok(
                aiServiceClient.analyzeSkillGaps(request)
        );
    }

    @PostMapping("/roadmap/generate")
    public ResponseEntity<Map<String, Object>> generateRoadmap(
            @RequestBody Map<String, Object> request) {

        return ResponseEntity.ok(
                aiServiceClient.generateRoadmap(request)
        );
    }
}