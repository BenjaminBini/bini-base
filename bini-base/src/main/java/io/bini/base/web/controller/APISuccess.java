package io.bini.base.web.controller;

import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

@Getter
public class APISuccess extends APIResponse {
    private final Object data;

    private final long count;
    private final int pagesCount;
    private final int activePage;
    private final int delta;

    public APISuccess(Object data) {
        super(true, HttpStatus.OK, "Success");
        this.data = data;
        this.count = 1;
        this.pagesCount = 1;
        this.activePage = 0;
        this.delta = 1;
    }

    public APISuccess(Object data, Page<?> page) {
        super(true, HttpStatus.OK, "Success");
        this.data = data;
        this.pagesCount = page.getTotalPages();
        this.count = page.getTotalElements();
        this.activePage = page.getNumber();
        this.delta = page.getSize();
    }
}
