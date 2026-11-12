
package com.careerintelligence.controller;

import com.careerintelligence.entity.Profile;
import com.careerintelligence.entity.User;
import com.careerintelligence.repository.UserRepository;
import com.careerintelligence.service.ProfileService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final UserRepository userRepository;

    public ProfileController(
            ProfileService profileService,
            UserRepository userRepository) {
        this.profileService = profileService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> getMyProfile(
            Authentication authentication) {

        Optional<User> userOptional =
                userRepository.findByEmail(authentication.getName());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found.");
        }

        Long userId = userOptional.get().getId();

        Optional<Profile> profile =
                profileService.getProfileByUserId(userId);

        if (profile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profile not found.");
        }

        return ResponseEntity.ok(profile.get());
    }

    @PostMapping
    public ResponseEntity<?> createProfile(
            @RequestBody Profile profile,
            Authentication authentication) {

        Optional<User> userOptional =
                userRepository.findByEmail(authentication.getName());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found.");
        }

        Long userId = userOptional.get().getId();

        try {
            Profile createdProfile =
                    profileService.createProfile(userId, profile);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(createdProfile);

        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(
            @RequestBody Profile profile,
            Authentication authentication) {

        Optional<User> userOptional =
                userRepository.findByEmail(authentication.getName());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found.");
        }

        Long userId = userOptional.get().getId();

        try {
            Profile updatedProfile =
                    profileService.updateProfile(userId, profile);

            return ResponseEntity.ok(updatedProfile);

        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}
