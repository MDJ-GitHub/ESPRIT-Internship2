package tn.esprit.espritinternship2back.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class Config {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll())  // Allow all requests
                .csrf(csrf -> csrf.disable())   // Explicitly disable CSRF
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.disable())); // Optional: Disable frame options if using H2 console
        return http.build();
    }
}

