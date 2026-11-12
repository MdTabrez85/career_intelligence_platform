package com.careerintelligence.config;

import com.careerintelligence.security.JwtAuthenticationFilter;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpStatus;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
         CorsConfigurationSource corsConfigurationSource() {
         CorsConfiguration configuration = new CorsConfiguration();

                 configuration.setAllowedOrigins(
                        List.of("http://localhost:5173")
                 );

                configuration.setAllowedMethods(
                        List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                        )
                );

                configuration.setAllowedHeaders(
                        List.of("*")
                );

                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

                 source.registerCorsConfiguration("/**", configuration);

                return source;
        }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

                // Disable CSRF because we are building a REST API
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Disable browser-based authentication
                .formLogin(form -> form.disable())

                .httpBasic(basic -> basic.disable())

                // JWT authentication is stateless
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // Authorization rules
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                        org.springframework.http.HttpMethod.OPTIONS,
                        "/**"
                         )
                        .permitAll()
                        
                        // Public endpoints
                        .requestMatchers(
                        "/api/auth/register",
                        "/api/auth/login",
                        "/api/health",
                        "/error")
                        .permitAll()

                        // Everything else requires authentication
                        .anyRequest().authenticated()
                )

                // Return 401 when authentication is missing
                .exceptionHandling(exception -> exception

                        .authenticationEntryPoint(
                                new HttpStatusEntryPoint(
                                        HttpStatus.UNAUTHORIZED
                                )
                        )
                )

                // JWT filter runs before Spring's authentication filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();

    }
}