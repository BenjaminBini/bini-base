package io.bini.base.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    private final CustomUserDetailService customUserDetailService;

    @Value("${jwt.public.key}")
    RSAPublicKey key;

    @Value("${jwt.private.key}")
    RSAPrivateKey priv;

    private final AuthenticationConfiguration authenticationConfiguration;

    public SecurityConfiguration(CustomUserDetailService customUserDetailService, AuthenticationConfiguration authenticationConfiguration) {
        this.customUserDetailService = customUserDetailService;
        this.authenticationConfiguration = authenticationConfiguration;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.cors()
                .and().authorizeHttpRequests((authorize) ->
                        authorize.requestMatchers("/anonymous").permitAll()
                                .anyRequest().authenticated()
                )
                .csrf((csrf) -> csrf.ignoringRequestMatchers("/**"))
                .addFilterBefore(new JWTAuthenticationFilter(priv.toString(), customUserDetailService), AuthorizationFilter.class)
                .addFilterBefore(new JWTLoginFilter(priv.toString(), authenticationConfiguration.getAuthenticationManager()), AuthorizationFilter.class)
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();

    }
}
