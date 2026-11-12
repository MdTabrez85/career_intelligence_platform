
package com.careerintelligence.service;

import com.careerintelligence.entity.Resume;
import com.careerintelligence.entity.User;
import com.careerintelligence.repository.ResumeRepository;
import com.careerintelligence.repository.UserRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final ResumeTextExtractor resumeTextExtractor;

    @Value("${app.resume.storage-dir}")
    private String storageDirectory;

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    public ResumeService(
            ResumeRepository resumeRepository,
            UserRepository userRepository,
            ResumeTextExtractor resumeTextExtractor) {

        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.resumeTextExtractor = resumeTextExtractor;
    }

    // Upload a resume and extract its text
    public Resume uploadResume(
            MultipartFile file,
            Authentication authentication) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select a resume file.");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException(
                    "Resume file size must not exceed 5 MB."
            );
        }

        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null || originalFilename.isBlank()) {
            throw new IllegalArgumentException("Invalid filename.");
        }

        // Extract and sanitize the filename
        String safeOriginalName = originalFilename.replace("\\", "/");

        safeOriginalName = safeOriginalName.substring(
                safeOriginalName.lastIndexOf("/") + 1
        );

        String extension = "";

        int dotIndex = safeOriginalName.lastIndexOf(".");

        if (dotIndex >= 0) {
            extension = safeOriginalName.substring(dotIndex).toLowerCase();
        }

        // Allow only PDF and DOCX
        if (!extension.equals(".pdf") && !extension.equals(".docx")) {
            throw new IllegalArgumentException(
                    "Only PDF and DOCX resumes are allowed."
            );
        }

        String contentType = file.getContentType();

        String expectedContentType = extension.equals(".pdf")
                ? "application/pdf"
                : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

        if (contentType == null ||
                !expectedContentType.equalsIgnoreCase(contentType)) {

            throw new IllegalArgumentException(
                    "The uploaded file type does not match its extension."
            );
        }

        // Find authenticated user
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found.")
                );

        // Generate unique filename
        String storedFilename = UUID.randomUUID() + extension;

        Path uploadDirectory = Paths.get(storageDirectory)
                .toAbsolutePath()
                .normalize();

        Files.createDirectories(uploadDirectory);

        Path destination = uploadDirectory
                .resolve(storedFilename)
                .normalize();

        if (!destination.getParent().equals(uploadDirectory)) {
            throw new IllegalArgumentException("Invalid file path.");
        }

        try {

            // Step 1: Save uploaded file
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destination);
            }

            // Step 2: Create resume metadata
            Resume resume = new Resume();

            resume.setUserId(user.getId());
            resume.setOriginalFilename(safeOriginalName);
            resume.setStoredFilename(storedFilename);
            resume.setContentType(contentType);
            resume.setFileSize(file.getSize());

            // Step 3: Extract resume text
            try {

                String extractedText = resumeTextExtractor.extractText(
                        destination,
                        safeOriginalName
                );

                if (extractedText == null || extractedText.isBlank()) {

                    resume.setParsingStatus("FAILED");

                    resume.setParsingError(
                            "No selectable text found in the resume. " +
                            "The file may be scanned or image-based."
                    );

                } else {

                    resume.setExtractedText(extractedText);
                    resume.setParsingStatus("COMPLETED");
                    resume.setParsingError(null);
                }

            } catch (IOException | RuntimeException exception) {

                // Keep the uploaded file even if extraction fails
                resume.setParsingStatus("FAILED");

                resume.setParsingError(
                        "Text extraction failed: " + exception.getMessage()
                );
            }

            // Step 4: Save metadata and extracted text in PostgreSQL
            return resumeRepository.save(resume);

        } catch (IOException | RuntimeException exception) {

            // Delete uploaded file if the overall upload operation fails
            Files.deleteIfExists(destination);

            throw exception;
        }
    }

    // Retrieve resumes belonging to the authenticated user
    public List<Resume> getMyResumes(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found.")
                );

        return resumeRepository
                .findAllByUserIdOrderByUploadedAtDesc(user.getId());
    }
    
    // Retrieve extracted text for a specific resume
    public Resume getResumeText(
            Long resumeId,
            Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found.")
                );

        Resume resume = resumeRepository
                .findByIdAndUserId(resumeId, user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Resume not found.")
                );

        if (!"COMPLETED".equalsIgnoreCase(resume.getParsingStatus())) {
            throw new IllegalArgumentException(
                    "Extracted text is not available for this resume."
            );
        }

        return resume;
    }

}