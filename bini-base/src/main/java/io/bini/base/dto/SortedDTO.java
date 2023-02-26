package io.bini.base.dto;

import io.bini.base.persistence.BaseEntity;

public interface SortedDTO<PK> extends BaseEntity<PK> {
    Long getIndex();

    void setIndex(Long index);

}
