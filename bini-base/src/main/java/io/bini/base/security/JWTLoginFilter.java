package io.bini.base.security;

import com.auth0.jwt.JWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static io.bini.base.security.SecurityConstraints.EXPIRATION_TIME;
import static io.bini.base.security.SecurityConstraints.TOKEN_PREFIX;

public class JWTLoginFilter extends UsernamePasswordAuthenticationFilter {

    private final String JWT_SECRET;
    private final AuthenticationManager authenticationManager;

    public JWTLoginFilter(String jwtSecret, AuthenticationManager authenticationManager) {
        this.JWT_SECRET = jwtSecret;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) {

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password,
                        new ArrayList<>()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        String token = JWT.create()
                .withSubject(((CustomUserDetailService.CustomUserDetails) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(JWT_SECRET.getBytes()));
        res.getWriter().write(TOKEN_PREFIX + token);
        res.getWriter().flush();
    }
}
