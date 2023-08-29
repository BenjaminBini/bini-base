package io.bini.base.web.controller;

import io.bini.base.exception.ExistingRelationshipException;
import io.bini.base.persistence.BaseEntity;
import io.bini.base.persistence.GenericSpecificationBuilder;
import io.bini.base.service.BaseService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.Data;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.*;

@Data
public abstract class BaseController<T extends BaseEntity<PK>, DTO extends BaseEntity<PK>, PK> {

    protected final BaseService<T, DTO, PK> service;

    public BaseController(BaseService<T, DTO, PK> service) {
        this.service = service;
    }

    protected APIResponse list(Map<String, String> searchParams, int page, int delta) {
        Pageable pageable = PageRequest.of(page, delta);
        GenericSpecificationBuilder<T> builder = getBuilderFromQueryParams(searchParams);
        Pair<Collection<DTO>, Page<T>> serviceResponse = service.list(builder.build(), pageable);
        return new APISuccess(serviceResponse.getFirst(), serviceResponse.getSecond());
    }

    protected APIResponse list(Map<String, String> searchParams) {
        Pageable pageable = PageRequest.of(0, 2_000);
        GenericSpecificationBuilder<T> builder = getBuilderFromQueryParams(searchParams);
        Pair<Collection<DTO>, Page<T>> serviceResponse = service.list(builder.build(), pageable);
        return new APISuccess(serviceResponse.getFirst(), serviceResponse.getSecond());
    }

    private GenericSpecificationBuilder<T> getBuilderFromQueryParams(Map<String, String> searchParams) {
        GenericSpecificationBuilder<T> builder = new GenericSpecificationBuilder<>();
        searchParams.forEach((key, value) -> {
            if (!key.equals("page") && !key.equals("delta")) {
                builder.with(key, ":", value);
            }
        });
        return builder;
    }

    protected APIResponse get(PK id) {
        return this.service.get(id)
                .<APIResponse>map(APISuccess::new)
                .orElse(APIError.notFound());
    }

    protected APIResponse save(DTO dto) {
        return new APISuccess(this.service.save(dto));
    }

    protected APIResponse update(DTO dto) {
        Optional<DTO> existingEntity = this.service.get(dto.getId());
        if (existingEntity.isEmpty()) {
            return APIError.badRequest();
        }
        copyNonNullProperties(dto, existingEntity.get());
        return new APISuccess(this.service.save(existingEntity.get()));
    }

    protected ResponseEntity<DTO> delete(PK id) throws ExistingRelationshipException {
        try {
            this.service.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    protected ResponseEntity<DTO> delete(Iterable<PK> ids) throws ExistingRelationshipException {
        try {
            this.service.delete(ids);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    private void copyNonNullProperties(Object src, Object target) {
        BeanUtils.copyProperties(src, target, getNullPropertyNames(src));
        removeEmptyForeignKeyObjects(target);
    }

    private void removeEmptyForeignKeyObjects(Object object) {
        final BeanWrapper targetEntity = new BeanWrapperImpl(object);
        java.beans.PropertyDescriptor[] pds = targetEntity.getPropertyDescriptors();
        for (java.beans.PropertyDescriptor pd : pds) {
            if (BaseEntity.class.isAssignableFrom(pd.getPropertyType())) {
                BaseEntity<?> entity = (BaseEntity<?>) targetEntity.getPropertyValue(pd.getName());
                if (entity != null && entity.getId() == null) {
                    targetEntity.setPropertyValue(pd.getName(), null);
                }
            }
        }
    }

    private String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    @ExceptionHandler({ExistingRelationshipException.class})
    public ResponseEntity<Object> handleRelationshipException(
            ExistingRelationshipException ex, WebRequest request) {
        APIError apiError =
                new APIError(HttpStatus.BAD_REQUEST, "existing-relationship", "existing-relationship");
        return new ResponseEntity<>(
                apiError, new HttpHeaders(), apiError.getStatus());
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolation(
            ConstraintViolationException ex, WebRequest request) {
        List<String> errors = new ArrayList<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            errors.add(violation.getRootBeanClass().getName() + " " +
                    violation.getPropertyPath() + ": " + violation.getMessage());
        }

        APIError apiError =
                new APIError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
        return new ResponseEntity<>(
                apiError, new HttpHeaders(), apiError.getStatus());
    }
}
