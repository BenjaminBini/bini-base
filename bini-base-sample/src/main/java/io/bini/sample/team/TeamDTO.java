package io.bini.sample.team;

import io.bini.base.persistence.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TeamDTO implements BaseEntity<Long> {

    private Long id;

    private String label;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

}