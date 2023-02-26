package io.bini.sample;

import io.bini.base.web.controller.APIResponse;
import io.bini.base.web.controller.APISuccess;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/hello")
@PreAuthorize("hasAuthority('ADMIN')")
public class HelloWorldController {

    @GetMapping
    @PreAuthorize("permitAll()")
    protected APIResponse helloAnonymous(Map<String, String> searchParams) {
        return new APISuccess<>("success anonymous");
    }

    @GetMapping("/admin")
    protected APIResponse helloAdmin(Map<String, String> searchParams) {
        return new APISuccess<>("success admin");
    }

}
