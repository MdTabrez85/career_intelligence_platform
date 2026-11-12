
package com.careerintelligence.service;

import java.util.Map;

import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class AiServiceClient {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public AiServiceClient(
            RestClient.Builder restClientBuilder,
            ObjectMapper objectMapper,
            @Value("${ai.service.base-url}") String baseUrl) {

        this.restClient = restClientBuilder
                .baseUrl(baseUrl)
                .build();

        this.objectMapper = objectMapper;
    }

    public Map<String, Object> extractSkills(Map<String, Object> request) {
        return post("/api/skills/extract", request);
    }

    public Map<String, Object> matchJobRole(Map<String, Object> request) {
        return post("/api/jobs/match", request);
    }

    public Map<String, Object> analyzeSkillGaps(Map<String, Object> request) {
        return post("/api/skills/gap-analysis", request);
    }

    public Map<String, Object> generateRoadmap(Map<String, Object> request) {
        return post("/api/roadmap/generate", request);
    }

    private Map<String, Object> post(
            String endpoint,
            Map<String, Object> request) {

        try {
            byte[] jsonBody = objectMapper.writeValueAsBytes(request);

            System.out.println("AI CLIENT DEBUG: Sending to " + endpoint);
            System.out.println("AI CLIENT DEBUG: JSON body = "
                    + new String(jsonBody, java.nio.charset.StandardCharsets.UTF_8));

            return restClient.post()
                    .uri(endpoint)
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .body(jsonBody)
                    .retrieve()
                    .body(new ParameterizedTypeReference<Map<String, Object>>() {});

        } catch (JacksonException error) {
            throw new RuntimeException("Failed to convert AI request to JSON", error);
        }
    }
}
