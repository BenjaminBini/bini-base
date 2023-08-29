package io.bini.sample.player;

import io.bini.base.persistence.BaseEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerDTO implements BaseEntity<Long> {

    private Long id;

    private String name;

}
