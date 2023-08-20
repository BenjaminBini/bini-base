package io.bini.base.security;

import com.auth0.jwt.JWT;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.interfaces.RSAPrivateKey;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static io.bini.base.security.SecurityConstraints.EXPIRATION_TIME;

@RestController
public class HelloController {


    @Value("${jwt.private.key}")
    RSAPrivateKey priv;

    @GetMapping("/hello")
    public String hello(Authentication authentication) {
        return "Hello, " + authentication.getName() + "!";
    }

    @GetMapping("/helloadmin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String helloAdmin(Authentication authentication) {
        return "This is only for admins!";
    }

    @GetMapping("/anonymous")
    @PreAuthorize("permitAll()")
    @PermitAll()
    public String anonymous(Authentication authentication) {
        return "Hello, anonymous!";
    }

    @GetMapping("/jwt")
    public String jwt() {
        return JWT.create()
                .withSubject("tututu")
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(priv.toString().getBytes()));
    }
}
