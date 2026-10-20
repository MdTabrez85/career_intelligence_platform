package com.careerintelligence.service;

import com.careerintelligence.entity.Role;
import com.careerintelligence.dto.LoginRequest;
import com.careerintelligence.dto.LoginResponse;
import com.careerintelligence.dto.RegisterRequest;
import com.careerintelligence.dto.UserResponse;
import com.careerintelligence.entity.User;
import com.careerintelligence.repository.UserRepository;
import com.careerintelligence.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public UserResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
                    "User already exists with email: " + request.getEmail()
            );
        }

        String hashedPassword =
                passwordEncoder.encode(request.getPassword());

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(hashedPassword);
        user.setRole(Role.STUDENT);

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getCreatedAt()
        );
    }
        
    public LoginResponse login(LoginRequest request) {

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() ->
                            new RuntimeException("Invalid email or password")
                    );

            if (!passwordEncoder.matches(
                    request.getPassword(),
                    user.getPassword()
            )) {
                throw new RuntimeException("Invalid email or password");
            }

            String token = jwtService.generateToken(
                    user.getEmail(),
                    user.getRole().name()
            );

            return new LoginResponse(
                    token,
                    user.getName(),
                    user.getEmail(),
                    user.getRole().name()
            );
                
    }
}