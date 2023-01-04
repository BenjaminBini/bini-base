package io.bini.base.persistence;

import java.util.Collection;

public interface BaseSortedEntity<PK, T extends BaseEntity> extends BaseEntity<PK> {
    Long getIndex();

    void setIndex(Long index);

    Collection<T> getSiblings();
}
