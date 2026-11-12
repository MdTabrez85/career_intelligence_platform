
package com.careerintelligence.controller;

import com.careerintelligence.entity.Resume;
import com.careerintelligence.service.ResumeService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    // Upload Resume
    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        try {
            Resume resume = resumeService.uploadResume(
                    file,
                    authentication
            );

            Map<String, Object> response = new HashMap<>();

            response.put("message", "Resume uploaded successfully!");
            response.put("id", resume.getId());
            response.put("originalFilename", resume.getOriginalFilename());
            response.put("fileSize", resume.getFileSize());
            response.put("uploadedAt", resume.getUploadedAt());
            response.put("parsingStatus", resume.getParsingStatus());

            String extractedText = resume.getExtractedText();

            response.put(
                    "extractedTextLength",
                    extractedText == null ? 0 : extractedText.length()
            );

            response.put("parsingError", resume.getParsingError());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (IllegalArgumentException exception) {

            Map<String, String> error = new HashMap<>();
            error.put("message", exception.getMessage());

            return ResponseEntity.badRequest().body(error);

        } catch (IOException exception) {

            Map<String, String> error = new HashMap<>();
            error.put("message", "Unable to store the uploaded resume.");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);
        }
    }

    // Get all resumes belonging to logged-in user
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getMyResumes(
            Authentication authentication) {

        List<Resume> resumes = resumeService.getMyResumes(authentication);

        List<Map<String, Object>> response = resumes.stream()
                .map(resume -> {

                    Map<String, Object> item = new HashMap<>();

                    item.put("id", resume.getId());
                    item.put("originalFilename", resume.getOriginalFilename());
                    item.put("contentType", resume.getContentType());
                    item.put("fileSize", resume.getFileSize());
                    item.put("uploadedAt", resume.getUploadedAt());

                    item.put("parsingStatus", resume.getParsingStatus());

                    String extractedText = resume.getExtractedText();

                    item.put(
                            "extractedTextLength",
                            extractedText == null ? 0 : extractedText.length()
                    );

                    item.put("parsingError", resume.getParsingError());

                    return item;
                })
                .toList();

        return ResponseEntity.ok(response);
    }

    
    // Preview extracted resume text
    @GetMapping("/{id}/text")
    public ResponseEntity<?> getResumeText(
            @PathVariable Long id,
            Authentication authentication) {

        try {
            Resume resume = resumeService.getResumeText(
                    id,
                    authentication
            );

            Map<String, Object> response = new HashMap<>();

            response.put("id", resume.getId());
            response.put("originalFilename", resume.getOriginalFilename());
            response.put("extractedText", resume.getExtractedText());

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException exception) {

            Map<String, String> error = new HashMap<>();

            error.put("message", exception.getMessage());

            return ResponseEntity.badRequest().body(error);
        }
    }

}