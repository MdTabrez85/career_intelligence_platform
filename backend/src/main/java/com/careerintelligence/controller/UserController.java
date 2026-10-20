package com.careerintelligence.controller;

import com.careerintelligence.dto.UserResponse;
import com.careerintelligence.entity.User;
import com.careerintelligence.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {

        return userService.getAllUsers()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public UserResponse getUserById(@PathVariable Long id) {

        User user = userService.getUserById(id);

        return convertToResponse(user);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(@RequestBody User user) {

        User createdUser = userService.createUser(user);

        return convertToResponse(createdUser);
    }

    private UserResponse convertToResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}