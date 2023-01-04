package io.bini.base.web.controller;

import io.bini.base.dto.SortedDTO;
import io.bini.base.persistence.BaseSortedEntity;
import io.bini.base.service.BaseSortedService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Collection;

public class BaseSortedController<T extends BaseSortedEntity<PK, T>, DTO extends SortedDTO<PK>, PK> extends BaseController<T,
    DTO, PK> {
    private final BaseSortedService<T, DTO, PK> baseSortedService;

    public BaseSortedController(BaseSortedService<T, DTO, PK> service) {
        super(service);
        this.baseSortedService = service;
    }

    @PostMapping("/update-index/{id}/{newIndex}")
    public Collection<DTO> updateEntityIndex(@PathVariable(name = "id") PK id, @PathVariable(name = "newIndex") Long newIndex) {
        return this.baseSortedService.updateEntityIndex(id, newIndex);
    }
}
