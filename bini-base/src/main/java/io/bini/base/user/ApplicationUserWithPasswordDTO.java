package io.bini.base.user;

import io.bini.base.persistence.BaseEntity;
import io.bini.base.user.role.RoleDTO;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Collection;

@Getter
@Setter
public class ApplicationUserWithPasswordDTO implements BaseEntity<Long> {

    Long id;

    String username;

    String email;

    String firstName;

    String lastName;

    String password;

    String colorScheme;

    Collection<RoleDTO> roles;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;
}
