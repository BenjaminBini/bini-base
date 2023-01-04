package io.bini.base.persistence;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.*;

public class GenericSpecification<T> implements Specification<T> {

    private final SearchCriteria criteria;

    public GenericSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate
            (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

        if (criteria.getOperation().equalsIgnoreCase(">")) {
            return builder.greaterThanOrEqualTo(
                    root.get(criteria.getKey()), criteria.getValue().toString());
        } else if (criteria.getOperation().equalsIgnoreCase("<")) {
            return builder.lessThanOrEqualTo(
                    root.get(criteria.getKey()), criteria.getValue().toString());
        } else if (criteria.getOperation().equalsIgnoreCase(":")) {
            if (criteria.getKey().contains(".")) {
                String[] splitKey = criteria.getKey().split("\\.");
                Join<Object, Object> owner = root.join(splitKey[0]);
                Path<Object> path = owner.get(splitKey[1]);
                return path.in(criteria.getValue());
            }
            if (root.get(criteria.getKey()).getJavaType() == String.class) {
                return builder.like(
                        root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
            } else {
                return builder.equal(root.get(criteria.getKey()), criteria.getValue());
            }
        }
        return null;
    }
}
