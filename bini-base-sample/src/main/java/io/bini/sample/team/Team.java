package io.bini.sample.team;

import io.bini.base.persistence.BaseEntity;
import io.bini.base.user.ApplicationUser;
import io.bini.sample.player.Player;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Collection;

@Getter
@Setter
@Entity(name = "team")
@EntityListeners(AuditingEntityListener.class)
public class Team implements BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String label;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private ApplicationUser owner;

    @OneToMany(mappedBy = "team")
    private Collection<Player> players;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;
}
