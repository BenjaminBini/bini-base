package io.bini.base.web.controller;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class APIResponse {
    private final boolean success;

    private final HttpStatus status;

    private final String message;

    public APIResponse(boolean success, HttpStatus status, String message) {
        this.success = success;
        this.status = status;
        this.message = message;
    }
}
