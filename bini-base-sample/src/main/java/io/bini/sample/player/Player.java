package io.bini.sample.player;

import io.bini.base.persistence.BaseEntity;
import io.bini.base.user.ApplicationUser;
import io.bini.sample.team.Team;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity(name = "player")
public class Player implements BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "teamId", nullable = false)
    private Team team;

    @OneToOne
    @JoinColumn(name = "userId")
    private ApplicationUser user;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;
}
