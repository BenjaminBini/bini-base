package io.bini.base.web.controller;

import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Getter
public class APIError extends APIResponse {
    private final List<String> errors;

    public APIError(HttpStatus status, String message, List<String> errors) {
        super(false, status, message);
        this.errors = errors;
    }

    public APIError(HttpStatus status, String message, String error) {
        super(false, status, message);
        this.errors = Collections.singletonList(error);
    }
    public static APIError notFound() {
        return new APIError(HttpStatus.NOT_FOUND, "Not found", "Entity not found");
    }
    public static APIError badRequest() {
        return new APIError(HttpStatus.BAD_REQUEST, "Bad request", "Request does not conform to what the server " +
            "expects");
    }
}
