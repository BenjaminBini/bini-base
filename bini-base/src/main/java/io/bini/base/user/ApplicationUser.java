package io.bini.base.user;

import io.bini.base.persistence.BaseEntity;
import io.bini.base.user.role.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
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
@Entity(name = "user_")
@EntityListeners(AuditingEntityListener.class)
public class ApplicationUser implements BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = true)
    @NotEmpty
    String username;

    @NotEmpty
    String firstName;

    @NotEmpty
    String lastName;

    @Email
    @Column(unique = true)
    @NotEmpty
    String email;

    @NotEmpty
    String password;

    String colorScheme;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "userRoles",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "roleId"))
    private Collection<Role> roles;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;
}
