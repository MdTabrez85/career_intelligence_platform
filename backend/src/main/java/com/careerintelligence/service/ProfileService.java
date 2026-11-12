package com.careerintelligence.service;

import com.careerintelligence.entity.Profile;
import com.careerintelligence.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public Optional<Profile> getProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId);
    }

    public Profile createProfile(Long userId, Profile profile) {

        if (profileRepository.findByUserId(userId).isPresent()) {
            throw new IllegalStateException(
                    "Profile already exists for this user."
            );
        }

        profile.setUserId(userId);

        return profileRepository.save(profile);
    }

    public Profile updateProfile(Long userId, Profile updatedProfile) {

        Profile existingProfile = profileRepository
                .findByUserId(userId)
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Profile not found for this user."
                        )
                );

        existingProfile.setPhone(updatedProfile.getPhone());
        existingProfile.setLocation(updatedProfile.getLocation());
        existingProfile.setLinkedinUrl(updatedProfile.getLinkedinUrl());
        existingProfile.setGithubUrl(updatedProfile.getGithubUrl());
        existingProfile.setTargetRole(updatedProfile.getTargetRole());
        existingProfile.setPreferredDomain(
                updatedProfile.getPreferredDomain()
        );
        existingProfile.setPreferredLocation(
                updatedProfile.getPreferredLocation()
        );
        existingProfile.setExpectedSalary(
                updatedProfile.getExpectedSalary()
        );
        existingProfile.setBio(updatedProfile.getBio());

        return profileRepository.save(existingProfile);
    }
}