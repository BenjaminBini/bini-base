package io.bini.sample.team;

import io.bini.base.persistence.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Collection;

@Getter
@Setter
public class TeamDTO implements BaseEntity<Long> {

    private Long id;

    private String label;

    private TeamOwnerDTO owner;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    private Collection<TeamPlayerDTO> players;

    @Getter
    @Setter
    public static class TeamOwnerDTO {
        private Long id;
        private String username;
    }

    @Getter
    @Setter
    public static class TeamPlayerDTO {
        private Long id;
        private String name;
    }
}
