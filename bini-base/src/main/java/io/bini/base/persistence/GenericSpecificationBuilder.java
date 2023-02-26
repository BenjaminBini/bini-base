package io.bini.base.persistence;

import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class GenericSpecificationBuilder<T> {
    private final List<SearchCriteria> criteriaList;

    public GenericSpecificationBuilder() {
        criteriaList = new ArrayList<>();
    }

    public void with(String key, String operation, Object value) {
        criteriaList.add(new SearchCriteria(key, operation, value));
    }

    public Specification<T> build() {
        if (criteriaList.size() == 0) {
            return null;
        }
        List<Specification<T>> specs = criteriaList.stream()
            .map(GenericSpecification<T>::new)
            .collect(Collectors.toList());
        Specification<T> result = specs.get(0);
        for (int i = 1; i < specs.size(); i++) {
            result = Specification.where(result)
                .and(specs.get(i));
        }
        return result;
    }
}
