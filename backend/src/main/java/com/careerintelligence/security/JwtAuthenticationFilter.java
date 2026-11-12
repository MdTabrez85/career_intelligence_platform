package com.careerintelligence.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authorizationHeader =
                request.getHeader("Authorization");


        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring(7);

        try {

    if (jwtService.isTokenValid(token)) {

        System.out.println("JWT DEBUG: Token is VALID");

        String email = jwtService.extractEmail(token);
        String role = jwtService.extractRole(token);

        System.out.println("JWT DEBUG: Email = " + email);
        System.out.println("JWT DEBUG: Role = " + role);

        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority("ROLE_" + role);

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        List.of(authority)
                );

        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);

        System.out.println("JWT DEBUG: Authentication set successfully");

    } else {

        System.out.println("JWT DEBUG: Token is INVALID");

    }

        } catch (Exception e) {

            System.out.println("JWT DEBUG: " + e.getClass().getSimpleName()
                    + " - " + e.getMessage());

            SecurityContextHolder.clearContext();
        }
        filterChain.doFilter(request, response);

    }
}