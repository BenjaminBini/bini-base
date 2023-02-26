package io.bini.base.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity<PK>, PK> extends JpaRepository<T, PK>,
    JpaSpecificationExecutor<T> {

    void refresh(T entity);
}
