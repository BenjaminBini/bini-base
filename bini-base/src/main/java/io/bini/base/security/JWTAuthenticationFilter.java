package io.bini.base.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static io.bini.base.security.SecurityConstraints.HEADER_STRING;
import static io.bini.base.security.SecurityConstraints.TOKEN_PREFIX;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final String JWT_SECRET;

    private final CustomUserDetailService customUserDetailService;

    public JWTAuthenticationFilter(String jwtSecret, CustomUserDetailService customUserDetailService) {
        this.JWT_SECRET = jwtSecret;
        this.customUserDetailService = customUserDetailService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String username = extractUserFromToken(request); //request.getHeader("username");
        if (username != null && !username.isEmpty()) {
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            UserDetails userDetails = customUserDetailService.loadUserByUsername(username);
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);
        }
        filterChain.doFilter(request, response);
    }

    private String extractUserFromToken(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);

        if (token != null) {
            // parse the token.
            try {
                String username = JWT.require(Algorithm.HMAC512(JWT_SECRET.getBytes()))
                        .build()
                        .verify(token.replace(TOKEN_PREFIX, ""))
                        .getSubject();
                if (username != null && !username.isEmpty()) {
                    return username;
                }
                return null;
            } catch (Exception ex) {
                return null;
            }
        }
        return null;

    }
}
