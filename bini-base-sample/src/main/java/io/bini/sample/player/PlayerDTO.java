package io.bini.sample.player;

import io.bini.base.persistence.BaseEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerDTO implements BaseEntity<Long> {

    private Long id;

    private String name;

    private PlayerTeamDTO team;

    @Getter
    @Setter
    public static class PlayerTeamDTO {
        private Long id;
    }

}
