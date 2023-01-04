package io.bini.base.persistence;

public interface BaseEntity<PK> {

    /**
     * The primary key of the entity
     * @return The primary key of the entity
     */
    PK getId();
}
