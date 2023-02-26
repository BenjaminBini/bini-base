package io.bini.base.web.controller;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
public class APISuccess<T> extends APIResponse {
    private final T data;

    public APISuccess(T data) {
        super(true, HttpStatus.OK, "Success");
        this.data = data;
    }
}
