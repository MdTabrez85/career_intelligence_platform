package com.careerintelligence.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class RoleBasedTestController {

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public String studentAccess() {

        return "Student access granted";
    }

    @GetMapping("/recruiter")
    @PreAuthorize("hasRole('RECRUITER')")
    public String recruiterAccess() {

        return "Recruiter access granted";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {

        return "Admin access granted";
    }
    @GetMapping("/me")
    public String currentUser(
            org.springframework.security.core.Authentication authentication) {

        return authentication.getName()
                + " | "
                + authentication.getAuthorities();
    }
}