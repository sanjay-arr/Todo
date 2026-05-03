package com.example.demo.Security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig{

    @Bean
    public PasswordEncoder passwordEncoder() throws Exception{
        return new BCryptPasswordEncoder();
    }

    @Bean 
    public SecurityFilterChain filterChain(HttpSecurity http,JwtFilter jwtFilter) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable)
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .authorizeHttpRequests((auth)->auth
        .requestMatchers("/auth/**").permitAll()
        .anyRequest().authenticated()
    ).addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);
    return http.build();
    }

    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
        configuration.setAllowedOrigins(java.util.List.of(
            "http://localhost:3000", 
            "http://localhost:5173", 
            "https://todo-kappa-nine-79.vercel.app"
        ));
        configuration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(java.util.List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

